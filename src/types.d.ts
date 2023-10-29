type Invoice = {
  id: string;
  vendor: string;
  invoiceNumber: string;
  date: string;
  amount: string;
};

type WellnessExpense = {
  Description: string;
  "Spent At": string;
  Category: string;
  Currency: string;
  City: string;
  "Txn Amount": number;
  Wallet: string;
  "Date(YYYY-MM-DD)": string;
  "Invoice Number": string;
  "Invoice Date": string;
  Client: string;
};

interface InvoiceListProp {
  invoiceDataArray: Invoice[];
}
