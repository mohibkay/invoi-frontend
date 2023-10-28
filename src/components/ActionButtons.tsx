import { Button } from "./ui/button";
import { exportToCSV, generateInvoiceFilename } from "../lib/utils";
import { useState } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import JSZip from "jszip";

type ActionButtonsProps = {
  invoiceDataArray: Invoice[];
  documentUrls: string[];
};

const ActionButtons: React.FC<ActionButtonsProps> = ({
  invoiceDataArray,
  documentUrls,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadAndZipUrls = async () => {
    setIsDownloading(true);
    const zip = new JSZip();

    try {
      for (const url of documentUrls) {
        const response = await axios.get(url);
        const filename = url.substring(url.lastIndexOf("/") + 1);
        zip.file(filename, response.data);
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `Invoice_${generateInvoiceFilename("")}`);
    } catch (error) {
      console.error("Error while downloading files:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className='mt-4'>
      <Button disabled={isDownloading} onClick={downloadAndZipUrls}>
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
