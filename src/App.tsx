/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import "./App.css";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import Spinner from "@/components/utils/spinner";
import InvoiceTable from "./components/InvoiceTable";

const apiEndPoint = import.meta.env.VITE_BACKEND_BASE_URL;

function App() {
  const [invoiceDataArray, setInvoiceDataArray] = useState<Invoice[] | []>([]);
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

  const handleFileInput = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    const filename = file?.name;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", filename);
    try {
      setIsLoading(true);
      const response = await axios.post(apiEndPoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { data } = response;
      setInvoiceDataArray([...invoiceDataArray, data.data]);
    } catch (error) {
      console.error(error);
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
        />
        <>{uploadMore}</>
      </form>

      <>{loading}</>

      {hasData && <InvoiceTable invoiceDataArray={invoiceDataArray} />}
    </div>
  );
}

export default App;
