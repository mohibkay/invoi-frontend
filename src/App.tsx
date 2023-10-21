/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import "./App.css";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/utils/spinner";
import InvoiceTable from "./components/InvoiceTable";

const apiEndPoint = import.meta.env.VITE_BACKEND_BASE_URL;

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [invoiceDataArray, setInvoiceDataArray] = useState<Invoice[] | []>([]);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loading = isLoading ? <Spinner /> : "";
  const hasData = !!Object.entries(invoiceDataArray).length;

  const handleFileInput = async (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;
    const filename = file?.name;
    const filenameWithoutExtension: string = filename?.replace(/\.\w+$/, "");
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
      setInvoiceNo(filenameWithoutExtension);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div>
      <h1 className='text-5xl mb-12'>Invoi</h1>
      <form
        encType='multipart/form-data'
        className='flex space-x-2 w-full mx-auto max-w-sm items-center gap-1.5 mb-8'
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
        <Button disabled={isLoading} type='submit'>
          Extract
        </Button>
      </form>

      <>{loading}</>

      {hasData && (
        <InvoiceTable
          invoiceDataArray={invoiceDataArray}
          invoiceNo={invoiceNo}
        />
      )}
    </div>
  );
}

export default App;
