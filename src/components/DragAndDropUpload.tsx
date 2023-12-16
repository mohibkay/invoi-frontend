import Spinner from "@/components/utils/spinner";
import axios from "axios";
import { cn, truncateFileName } from "@/lib/utils";
import { UploadCloud, DownloadCloud } from "lucide-react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
const apiEndPoint = import.meta.env.VITE_BACKEND_BASE_URL;
const fileTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setInvoiceDataArray: Dispatch<SetStateAction<[] | Invoice[]>>;
  invoiceDataArray: Invoice[];
};
export default function UploadComponent({
  handleSubmit,
  invoiceDataArray,
  setInvoiceDataArray,
}: Props) {
  const { toast } = useToast();
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [fileQueue, setFileQueue] = useState<File[]>([]);
  const [fileDropError, setFileDropError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onDragOver = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => setDragOver(false);

  const queueFilesToProcessLater = (files: FileList) => {
    setFileQueue((prevQueue) => [...prevQueue, ...Array.from(files)]);
  };

  const onDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragOver(false);
    const { files } = event.dataTransfer;
    if (!files || !files.length) return;

    const selectedFiles = Array.from(files);

    if (selectedFiles.some((file) => !fileTypes.includes(file.type))) {
      return setFileDropError("Please provide pdf or image files only!");
    }

    setFileDropError("");
    if (isLoading) {
      queueFilesToProcessLater(files);
      return;
    }
    uploadFilesAndGetData(files);
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target as HTMLInputElement;
    if (!files || !files.length) return;
    const selectedFiles = Array.from(files);

    if (selectedFiles.some((file) => !fileTypes.includes(file.type))) {
      return setFileDropError("Please provide pdf or image files only!");
    }

    uploadFilesAndGetData(files);
  };

  const uploadFilesAndGetData = useCallback(
    async (files: FileList) => {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append(files[i].name, files[i]);
      }
      try {
        setIsLoading(true);
        setFileQueue([]);
        const response = await axios.post(apiEndPoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const { data } = response;
        setInvoiceDataArray([...invoiceDataArray, ...data.results]);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          toast({
            variant: "destructive",
            title: "There was a problem with your request",
            description: error.message,
            action: (
              <ToastAction onClick={triggerFileSelect} altText='Try again'>
                Try again
              </ToastAction>
            ),
          });
          return error.message;
        }
      } finally {
        setIsLoading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [invoiceDataArray, setInvoiceDataArray, toast]
  );

  useEffect(() => {
    if (!isLoading && fileQueue.length) {
      const dataTransfer = new DataTransfer();
      fileQueue.forEach((file) => dataTransfer.items.add(file));
      uploadFilesAndGetData(dataTransfer.files);
    }
  }, [fileQueue, isLoading, uploadFilesAndGetData]);

  return (
    <>
      <div className='dark:bg-neutral-800 mx-auto max-w-sm bg-white border dark:border-neutral-700 w-full rounded-xl'>
        <form encType='multipart/form-data' onSubmit={handleSubmit}>
          <label
            htmlFor='file'
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div
              className={cn(
                "px-4 py-2 border-[1.5px] border-dashed dark:border-neutral-700 m-2 rounded-[8px] flex flex-col justify-start items-center hover:cursor-pointer",
                dragOver && "border-blue-600 bg-blue-50",
                isLoading &&
                  dragOver &&
                  "border-orange-600 bg-orange-50 cursor-not-allowed"
              )}
            >
              <div className='flex flex-col justify-start items-center'>
                {isLoading ? (
                  <DownloadCloud
                    className={cn(
                      "h-5 w-5 text-neutral-600 my-4",
                      dragOver && "text-blue-500",
                      isLoading && dragOver && "text-orange-500"
                    )}
                  />
                ) : (
                  <UploadCloud
                    className={cn(
                      "h-5 w-5 text-neutral-600 my-4",
                      dragOver && "text-blue-500"
                    )}
                  />
                )}
                <p className='font-semibold'>
                  {isLoading && dragOver
                    ? "Add more files"
                    : isLoading
                    ? "Sit back and relax"
                    : "Choose a file or drag & drop it here"}
                </p>
                <p className='text-neutral-500 text-sm pb-2'>
                  {isLoading && dragOver
                    ? "Files will be queued for processing"
                    : isLoading
                    ? "We're processing your files"
                    : "PDF, JPEG, JPG, PNG formats."}
                </p>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <div className='px-3 py-1 border dark:border-neutral-700 rounded-xl mt-2 mb-2 drop-shadow-sm hover:drop-shadow transition-all hover:cursor-pointer bg-white dark:bg-neutral-700'>
                    Select files
                  </div>
                )}
              </div>
            </div>
          </label>
          <input
            type='file'
            name='file'
            id='file'
            accept='.pdf, .jpeg, .jpg, .png'
            ref={fileInputRef}
            className='hidden'
            onChange={handleFileInput}
            multiple
          />
        </form>

        {fileQueue.length > 0 && (
          <div className='w-full px-4 py-2 gap-2 flex flex-col justify-start items-center border-t dark:border-neutral-700 max-h-[216px] overflow-auto'>
            {fileQueue.map((file, index) => {
              return (
                <div
                  key={index}
                  className='flex flex-row justify-between items-center border dark:border-neutral-700 rounded-lg px-2 py-1 w-full group'
                >
                  <div className='flex flex-row justify-start items-center gap-2'>
                    <div className='flex flex-col justify-start items-start gap-1'>
                      <div className='flex flex-row justify-start items-center gap-2'>
                        <p>{truncateFileName(file.name)}</p>
                      </div>
                    </div>
                  </div>
                  <div className='h-2 w-2 bg-orange-400 rounded-full' />
                </div>
              );
            })}
          </div>
        )}

        {fileDropError && <p className='text-red-500'>{fileDropError}</p>}
      </div>
    </>
  );
}
