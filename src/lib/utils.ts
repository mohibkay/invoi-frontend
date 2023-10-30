import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import xlsx from "json-as-xlsx";
import * as XLSX from "xlsx";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateInvoiceFilename(uniqueIdentifier: string) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const uniqueIdentifierHyphenated = replaceSpaceWithHyphen(uniqueIdentifier);
  return uniqueIdentifier
    ? `${year}${month}${day}-${uniqueIdentifierHyphenated}`
    : `${year}${month}${day}`;
}

function formatDate(dateString: string) {
  const [month, day, year] = dateString.split("/");
  const formattedMonth = month.padStart(2, "0");
  const formattedDay = day.padStart(2, "0");
  return `${formattedDay}${formattedMonth}${year}`;
}

function generateUniqueInvoiceFilename(
  uniqueIdentifier: string,
  dateString: string
) {
  const uniqueIdentifierHyphenated = replaceSpaceWithHyphen(uniqueIdentifier);
  return `${formatDate(dateString)}-${uniqueIdentifierHyphenated}`;
}

function replaceSpaceWithHyphen(inputString: string) {
  return inputString.replace(/\s+/g, "-");
}

const CATEGORY = "Welfare Expenses--Food";
const CURRENCY = "Indian rupee";
const REIMBURSEMENT = "Reimbursement";

export const downloadInvoice = (invoiceData: Invoice) => {
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

  const { vendor, amount, date } = invoiceData;
  const indentifier = `${vendor}-${amount}`;
  const uniqueIdentifier = generateUniqueInvoiceFilename(indentifier, date);
  const settings = {
    fileName: `Invoice_${uniqueIdentifier}`,
  };
  xlsx(data, settings);
};

export const generateExcelFilesForInvoices = (invoiceDataArray: Invoice[]) => {
  invoiceDataArray.forEach((invoiceData) => {
    downloadInvoice(invoiceData);
  });
};

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

type ExportToCSVType = Invoice[] | WellnessExpense[];

export const exportToCSV = (arrayofinvoices: ExportToCSVType) => {
  const ws = XLSX.utils.json_to_sheet(arrayofinvoices);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  const identifier = generateInvoiceFilename("");
  const fileName = `Invoice_${identifier}`;
  saveAs(data, fileName + fileExtension);
};

export const downloadExcelForWellnessExpense = (
  invoiceDataArray: Invoice[]
) => {
  const wellnessExpenseData = invoiceDataArray.map((invoiceData) => {
    const platformFee = parseInt(invoiceData.platformFee);
    const description =
      platformFee == 2
        ? "Zomato"
        : platformFee === 3 || platformFee === 5 || platformFee === 8
        ? "Swiggy"
        : "";
    return {
      Description: description,
      "Spent At": invoiceData.vendor,
      Category: CATEGORY,
      Currency: CURRENCY,
      City: "",
      "Txn Amount": parseFloat(
        invoiceData.amount.replace("₹", "").replace(",", "")
      ),
      Wallet: REIMBURSEMENT,
      "Date(YYYY-MM-DD)": invoiceData.date.split("/").reverse().join("-"),
      "Invoice Number": invoiceData.invoiceNumber,
      "Invoice Date": invoiceData.date.split("/").reverse().join("-"),
      Client: "",
    };
  });
  return exportToCSV(wellnessExpenseData);
};

export async function generateAndZipInvoices(arrayofinvoices: Invoice[]) {
  const zip = new JSZip();
  for (const invoiceData of arrayofinvoices) {
    const ws = XLSX.utils.json_to_sheet([invoiceData]);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    const { vendor, amount, date } = invoiceData;
    const indentifier = `${vendor}-${amount}`;
    const uniqueIdentifier = generateUniqueInvoiceFilename(indentifier, date);

    zip.file(`Invoice_${uniqueIdentifier}${fileExtension}`, excelBuffer, {
      binary: true,
    });
  }
  const identifier = generateInvoiceFilename("");
  const fileName = `Invoice_${identifier}`;
  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, `${fileName}.zip`);
}
