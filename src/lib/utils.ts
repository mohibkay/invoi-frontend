import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import xlsx from "json-as-xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateInvoiceFilename(uniqueIdentifier: string) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const filename = `${year}${month}${day}-${uniqueIdentifier}-Invoice`;
  return filename;
}

export const downloadSheet = (invoiceData: Invoice) => {
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
