import axios, { AxiosError } from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import Spinner from "@/components/utils/spinner";
import InvoiceTable from "@/components/InvoiceTable";
import ActionButtons from "@/components/ActionButtons";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@/components/ui/toast";
import {
  downloadGeneralExcel,
  downloadExcelForWellnessExpense,
} from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { useGetUser } from "@/api/user";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/userSlice";
import { useLocation } from "react-router-dom";
import { ROUTES } from "@/lib/routes";

const apiEndPoint = import.meta.env.VITE_BACKEND_BASE_URL;

function Dashboard() {
  const { toast } = useToast();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isWelfarePage = location.pathname === ROUTES.WELFARE;
  const [invoiceDataArray, setInvoiceDataArray] = useState<Invoice[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data: user, refetch } = useGetUser();

  console.log("dashboard rendering");

  useEffect(() => {
    if (user?.email) {
      dispatch(setUser(user));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (invoiceDataArray) {
      refetch();
    }
  }, [invoiceDataArray, refetch]);

  const loading = isLoading ? <Spinner /> : "";
  const hasData = !!Object.entries(invoiceDataArray).length;

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target as HTMLInputElement;
    if (!files || !files.length) return;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append(files[i].name, files[i]);
    }
    try {
      setIsLoading(true);
      const response = await axios.post(apiEndPoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { data } = response;
      setInvoiceDataArray([...invoiceDataArray, ...data.results]);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        toast({
          variant: "destructive",
          title: error.response?.data?.error,
          description: error.message,
          action: (
            <ToastAction onClick={triggerFileSelect} altText='Try again'>
              Try again
            </ToastAction>
          ),
        });
        return error.message;
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const downloadExcel = () => {
    isWelfarePage
      ? downloadExcelForWellnessExpense(invoiceDataArray)
      : downloadGeneralExcel(invoiceDataArray);
  };

  return (
    <>
      <Navbar />
      <main>
        <form
          encType='multipart/form-data'
          className='grid space-x-2 w-full mx-auto max-w-sm items-center gap-1.5 mb-8 mt-12'
          onSubmit={handleSubmit}
        >
          <Input
            id='file'
            name='file'
            type='file'
            accept='.pdf, .jpeg, .jpg, .png'
            className='mx-auto'
            disabled={isLoading}
            ref={fileInputRef}
            onChange={handleFileInput}
            multiple
          />
        </form>

        <>{loading}</>
        {hasData && (
          <>
            <InvoiceTable invoiceDataArray={invoiceDataArray} />
            <ActionButtons
              invoiceDataArray={invoiceDataArray}
              downloadExcel={downloadExcel}
            />
          </>
        )}
        <Toaster />
      </main>
    </>
  );
}

export default Dashboard;
