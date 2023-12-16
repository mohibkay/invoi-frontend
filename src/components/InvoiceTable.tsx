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
    <Table>
      <TableHeader className='bg-white'>
        <TableRow className='sticky top-0'>
          {HEADERS.map((header) => (
            <TableHead
              key={header}
              className='sticky top-0 text-center font-medium text-lg'
            >
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
