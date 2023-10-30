import { Button } from "./ui/button";
import { useState } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { Icons } from "./utils/Icons";
import { generateInvoiceFilename } from "@/lib/utils";

type ActionButtonsProps = {
  invoiceDataArray: Invoice[];
  documentUrls: string[];
  downloadExcel: () => void;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({
  documentUrls,
  downloadExcel,
  invoiceDataArray,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadZipBtn = isDownloading ? "Downloading zip" : "Download zip";

  const downloadAndZipUrls = async () => {
    setIsDownloading(true);
    const zip = new JSZip();

    try {
      let i = 0;
      for (const url of documentUrls) {
        const response = await fetch(url);
        const blob = await response.blob();
        const serialNumber = String(i + 1).padStart(3, "0");
        const fileExtension = url.substring(url.lastIndexOf(".") + 1);
        const identifier =
          invoiceDataArray[i].invoiceNumber || invoiceDataArray[i].vendor;
        const filename = `${serialNumber}-${identifier}.${fileExtension}`;
        zip.file(filename, blob);
        i++;
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
    <div className='flex justify-center items-center mt-4'>
      <Button disabled={isDownloading} onClick={downloadAndZipUrls}>
        {isDownloading && <Icons.spinner />}
        <span>{downloadZipBtn}</span>
      </Button>
      <Button onClick={downloadExcel} variant='outline' className='ml-4'>
        Download excel
      </Button>
    </div>
  );
};

export default ActionButtons;
