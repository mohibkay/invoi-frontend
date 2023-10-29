import axios from "axios";
import { ChangeEvent, useRef, useState } from "react";

import Spinner from "@/components/utils/spinner";
import InvoiceTable from "@/components/InvoiceTable";
import ActionButtons from "@/components/ActionButtons";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@/components/ui/toast";
import { downloadExcelForWellnessExpense } from "@/lib/utils";

const apiEndPoint = import.meta.env.VITE_BACKEND_BASE_URL;

const initialInvoiceData = [
  {
    id: "df1b72ab-91c0-45f5-a0a6-781543b69404",
    amount: "1015.00",
    date: "26/10/2023",
    invoiceNumber: " 157289444997597",
    vendor: "Periyannasamy",
  },
  {
    id: "6c138a5d-3b2c-49e9-a7fe-c23bbaf98e43",
    amount: "175",
    date: "01/09/2019",
    invoiceNumber: "2019-09/C/144176297",
    vendor: "Swiggy",
  },
  {
    id: "a9835da6-74af-4f56-8839-a24e7247ed78",
    amount: "82.74",
    date: "28/04/2023",
    invoiceNumber: "0002195042800008",
    vendor: "Swiggy",
  },
  {
    id: "2e8c5dae-5e1d-426d-8811-f2035ddb74df",
    amount: "₹179.65",
    date: "07/04/2023",
    invoiceNumber: "4792771283",
    vendor: "Giridhar",
  },
];

function WellFareExpenses() {
  const { toast } = useToast();
  const [invoiceDataArray, setInvoiceDataArray] = useState<Invoice[] | []>([
    ...initialInvoiceData,
  ]);
  const [documentUrls, setDocumentUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      setDocumentUrls([...documentUrls, ...data.documentUrls]);
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
            documentUrls={documentUrls}
            downloadExcel={() =>
              downloadExcelForWellnessExpense(invoiceDataArray)
            }
          />
        </>
      )}

      <Toaster />
    </div>
  );
}

export default WellFareExpenses;
