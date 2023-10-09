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
import { Button } from "./components/ui/button";

const apiEndPoint = import.meta.env.VITE_BACKEND_BASE_URL;
type Invoice = {
  invoiceNumber: string;
  date: string;
  amount: string;
};
const defaultInvoice = {
  invoiceNumber: "",
  date: "",
  amount: "",
};

function App() {
  const [invoiceData, setInvoiceData] = useState<Invoice>(defaultInvoice);
  const [isLoading, setIsLoading] = useState(false);

  const loading = isLoading ? "Loading..." : "";
  const showData = Boolean(invoiceData?.invoiceNumber);

  const handleFileInput = async (event: any) => {
    setInvoiceData(defaultInvoice);

    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    try {
      setIsLoading(true);
      const response = await axios.post(apiEndPoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { data } = response;
      setInvoiceData(data);
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
          { label: "Date", value: "date" },
          { label: "Amount", value: "amount" },
        ],
        content: [
          {
            invoice: invoiceData.invoiceNumber,
            date: invoiceData.date,
            amount: invoiceData.amount,
          },
        ],
      },
    ];
    const settings = {
      fileName: invoiceData.invoiceNumber,
    };
    xlsx(data, settings);
  };

  return (
    <div>
      <h1 className='text-5xl mb-12'>Invoi</h1>
      <div className='grid w-full mx-auto max-w-sm items-center gap-1.5'>
        <Input
          id='file'
          type='file'
          accept='.pdf'
          className='mx-auto'
          disabled={isLoading}
          onChange={handleFileInput}
        />
      </div>
      <p>{loading}</p>

      {showData && (
        <Table className='mt-20'>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Invoice Number</TableHead>
              <TableHead className='text-center'>Date</TableHead>
              <TableHead className='text-center'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>
                {invoiceData?.invoiceNumber}
              </TableCell>
              <TableCell>{invoiceData?.date}</TableCell>
              <TableCell>{invoiceData?.amount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {showData && (
        <Button className='mt-8' onClick={downloadSheet}>
          Download Invoice in xlsx
        </Button>
      )}
    </div>
  );
}

export default App;
