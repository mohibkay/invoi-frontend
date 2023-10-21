/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import xlsx from "json-as-xlsx";

import "./App.css";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/utils/spinner";
import { generateInvoiceFilename } from "./lib/utils";

const apiEndPoint = import.meta.env.VITE_BACKEND_BASE_URL;
type Invoice = {
  vendor: string;
  invoiceNumber: string;
  date: string;
  amount: string;
};
const defaultInvoice = {
  invoiceNumber: "",
  date: "",
  amount: "",
  vendor: "",
};

function App() {
  const [invoiceData, setInvoiceData] = useState<Invoice>(defaultInvoice);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loading = isLoading ? <Spinner /> : "";
  const hasData = Object.values(invoiceData).some((value) => Boolean(value));

  const handleFileInput = async (event: any) => {
    setInvoiceData(defaultInvoice);

    const file = event.target.files[0];
    const filename = file.name;
    const filenameWithoutExtension = filename.replace(/\.\w+$/, "");

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
      setInvoiceData(data.data);
      setInvoiceNo(filenameWithoutExtension);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSheet = () => {
    const data = [
      {
        sheet: "Invoice",
        columns: [
          { label: "Invoice", value: "invoice" },
          { label: "Vendor", value: "vendor" },
          { label: "Date", value: "date" },
          { label: "Amount", value: "amount" },
        ],
        content: [
          {
            invoice: invoiceData.invoiceNumber,
            vendor: invoiceData.vendor,
            date: invoiceData.date,
            amount: invoiceData.amount,
          },
        ],
      },
    ];
    const settings = {
      fileName: generateInvoiceFilename(invoiceData.invoiceNumber),
    };
    xlsx(data, settings);
  };

  return (
    <div>
      <h1 className='text-5xl mb-12'>Invoi</h1>
      <form
        encType='multipart/form-data'
        className='grid w-full mx-auto max-w-sm items-center gap-1.5 mb-8'
      >
        <Input
          id='file'
          name='file'
          type='file'
          accept='.pdf, .jpeg, .jpg, .png'
          className='mx-auto'
          disabled={isLoading}
          onChange={handleFileInput}
        />
      </form>

      <>{loading}</>

      {hasData && (
        <Table className='mt-12'>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Invoice Number</TableHead>
              <TableHead className='text-center'>Vendor</TableHead>
              <TableHead className='text-center'>Date</TableHead>
              <TableHead className='text-center'>Amount</TableHead>
              <TableHead className='text-center'>Download in excel</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>
                {invoiceData?.invoiceNumber || invoiceNo}
              </TableCell>
              <TableCell className='capitalize'>
                {invoiceData?.vendor}
              </TableCell>
              <TableCell>{invoiceData?.date}</TableCell>
              <TableCell>{invoiceData?.amount}</TableCell>
              <TableCell>
                <Button variant='link' onClick={downloadSheet}>
                  <img src='excel.svg' className='h-6' alt='excel icon' />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default App;
