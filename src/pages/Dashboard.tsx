import { useState } from "react";

import InvoiceTable from "@/components/InvoiceTable";
import ActionButtons from "@/components/ActionButtons";
import { Toaster } from "@/components/ui/toaster";
import { downloadGeneralExcel } from "@/lib/utils";
import UploadComponent from "@/components/DragAndDropUpload";

function Dashboard() {
  const [invoiceDataArray, setInvoiceDataArray] = useState<Invoice[] | []>([]);
  const [documentUrls, setDocumentUrls] = useState<string[]>([]);

  const hasData = !!Object.entries(invoiceDataArray).length;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1 className='text-5xl mb-8'>Invoi</h1>
      <UploadComponent
        invoiceDataArray={invoiceDataArray}
        documentUrls={documentUrls}
        handleSubmit={handleSubmit}
        setInvoiceDataArray={setInvoiceDataArray}
        setDocumentUrls={setDocumentUrls}
      />

      {hasData && (
        <>
          <InvoiceTable invoiceDataArray={invoiceDataArray} />
          <ActionButtons
            invoiceDataArray={invoiceDataArray}
            documentUrls={documentUrls}
            downloadExcel={() => downloadGeneralExcel(invoiceDataArray)}
          />
        </>
      )}
      <Toaster />
    </div>
  );
}

export default Dashboard;
