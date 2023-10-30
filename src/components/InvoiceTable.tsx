import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const HEADERS = ["Invoice Number", "Vendor", "Date", "Amount"];

interface Props {
  invoiceDataArray: Invoice[];
}

const InvoiceTable = ({ invoiceDataArray }: Props) => {
  return (
    <Table className='mt-12 max-w-5xl mx-auto'>
      <TableHeader>
        <TableRow>
          {HEADERS.map((header) => (
            <TableHead key={header} className='text-center'>
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      {invoiceDataArray.map((invoiceData) => (
        <TableBody key={invoiceData.id}>
          <TableRow>
            <TableCell className='font-medium'>
              {invoiceData?.invoiceNumber || "Not Found"}
            </TableCell>
            <TableCell className='capitalize'>
              {invoiceData?.vendor || "Not Found"}
            </TableCell>
            <TableCell>{invoiceData?.date || "Not Found"}</TableCell>
            <TableCell>{invoiceData?.amount || "Not Found"}</TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
};

export default InvoiceTable;
