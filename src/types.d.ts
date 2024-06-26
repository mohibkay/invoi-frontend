type UserResponse = {
  user: UserTypes;
};
type UserTypes = {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  googleId: string;
  credits: number;
  subscriptionType: "FREE" | "PAID";
};

type Invoice = {
  id: string;
  vendor: string;
  invoiceNumber: string;
  date: string;
  amount: string;
  platformFee: string;
  documentUrl: Url;
};

type GeneralInvoice = Omit<Invoice, id | platformFee>;

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
