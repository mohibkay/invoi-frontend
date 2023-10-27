/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import "./App.css";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import Spinner from "@/components/utils/spinner";
import InvoiceTable from "./components/InvoiceTable";

const test = [
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

const apiEndPoint = import.meta.env.VITE_BACKEND_BASE_URL;

function App() {
  const [invoiceDataArray, setInvoiceDataArray] = useState<Invoice[] | []>(
    test
  );
  console.log("🐬 ~ App ~ invoiceDataArray:", invoiceDataArray);
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
    const { files } = event.target;
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
          multiple
        />
        <>{uploadMore}</>
      </form>

      <>{loading}</>

      {hasData && <InvoiceTable invoiceDataArray={invoiceDataArray} />}
    </div>
  );
}

export default App;
