import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import Spinner from "@/components/utils/spinner";
import InvoiceTable from "@/components/InvoiceTable";
import ActionButtons from "@/components/ActionButtons";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@/components/ui/toast";
import { downloadGeneralExcel } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { useGetUser } from "@/api/user";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/userSlice";

const apiEndPoint = import.meta.env.VITE_BACKEND_BASE_URL;

function Dashboard() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [invoiceDataArray, setInvoiceDataArray] = useState<Invoice[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data: user, refetch } = useGetUser();

  useEffect(() => {
    refetch();
    if (user?.email) {
      dispatch(setUser(user));
    }
  }, [dispatch, invoiceDataArray, refetch, user]);

  const loading = isLoading ? <Spinner /> : "";
  const hasData = !!Object.entries(invoiceDataArray).length;
  const uploadMore =
    hasData && !loading ? (
      <span className='text-primary'>Upload more 👆</span>
    ) : (
      ""
    );

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
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "There was a problem with your request",
          description: error.message,
          action: (
            <ToastAction onClick={triggerFileSelect} altText='Try again'>
              Try again
            </ToastAction>
          ),
        });
        return error.message;
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

  return (
    <div>
      <Navbar />
      <h1 className='text-5xl mb-12'>Invoi</h1>
      <form
        encType='multipart/form-data'
        className='grid space-x-2 w-full mx-auto max-w-sm items-center gap-1.5 mb-8'
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
        <>{uploadMore}</>
      </form>

      <>{loading}</>

      {hasData && (
        <>
          <InvoiceTable invoiceDataArray={invoiceDataArray} />
          <ActionButtons
            invoiceDataArray={invoiceDataArray}
            downloadExcel={() => downloadGeneralExcel(invoiceDataArray)}
          />
        </>
      )}
      <Toaster />
    </div>
  );
}

export default Dashboard;
