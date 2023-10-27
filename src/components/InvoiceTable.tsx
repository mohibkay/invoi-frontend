import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { downloadInvoice, generateExcelFilesForInvoices } from "@/lib/utils";

const HEADERS = [
  "Invoice Number",
  "Vendor",
  "Date",
  "Amount",
  "Download in excel",
];

interface Props {
  invoiceDataArray: Invoice[];
}

const InvoiceTable = ({ invoiceDataArray }: Props) => {
  return (
    <div>
      <Table className='mt-12'>
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
                {invoiceData?.vendor}
              </TableCell>
              <TableCell>{invoiceData?.date}</TableCell>
              <TableCell>{invoiceData?.amount}</TableCell>
              <TableCell>
                <Button
                  variant='link'
                  onClick={() => downloadInvoice(invoiceData)}
                >
                  <img src='excel.svg' className='h-6' alt='excel icon' />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
      <Button onClick={() => generateExcelFilesForInvoices(invoiceDataArray)}>
        Download All in zip
      </Button>
    </div>
  );
};

export default InvoiceTable;
