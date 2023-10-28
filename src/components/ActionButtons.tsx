import { Button } from "./ui/button";
import { exportToCSV, generateAndZipInvoices } from "../lib/utils";

const ActionButtons: React.FC<InvoiceListProp> = ({ invoiceDataArray }) => {
  return (
    <div className='mt-4'>
      <Button onClick={() => generateAndZipInvoices(invoiceDataArray)}>
        Download All in zip
      </Button>
      <Button
        onClick={() => exportToCSV(invoiceDataArray)}
        variant='outline'
        className='ml-4'
      >
        Download All in one excel
      </Button>
    </div>
  );
};

export default ActionButtons;
