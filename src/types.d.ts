type Invoice = {
  id: string;
  vendor: string;
  invoiceNumber: string;
  date: string;
  amount: string;
};

interface InvoiceList {
  invoiceDataArray: Invoice[];
}
