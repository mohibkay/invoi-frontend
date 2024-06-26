import { useEffect, useState } from "react";
import InvoiceTable from "@/components/InvoiceTable";
import ActionButtons from "@/components/ActionButtons";
import { Toaster } from "@/components/ui/toaster";
import { downloadExcelForWellnessExpense } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { useGetUser } from "@/api/user";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/userSlice";
import useLogout from "@/hooks/useLogout";
import UploadComponent from "@/components/DragAndDropUpload";

function Dashboard() {
  const dispatch = useAppDispatch();
  const handleLogout = useLogout();
  const [invoiceDataArray, setInvoiceDataArray] = useState<Invoice[] | []>([]);
  const { data: user, refetch, isError, isFetching } = useGetUser();

  useEffect(() => {
    if (user?.email) {
      dispatch(setUser(user));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (invoiceDataArray) {
      refetch();
    }
  }, [invoiceDataArray, refetch]);

  useEffect(() => {
    if (isError) {
      handleLogout();
    }
  }, [isError, handleLogout]);

  const hasData = !!Object.entries(invoiceDataArray).length;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const downloadExcel = () => {
    downloadExcelForWellnessExpense(invoiceDataArray);
  };

  return (
    <div className='max-h-100vh overflow-y-hidden'>
      <Navbar isFetching={isFetching} />
      <main className='mt-6 flex max-w-7xl mx-auto px-4'>
        <div className='min-w-max mr-4 top-52 mt-12'>
          <UploadComponent
            invoiceDataArray={invoiceDataArray}
            handleSubmit={handleSubmit}
            setInvoiceDataArray={setInvoiceDataArray}
          />
          {hasData && (
            <ActionButtons
              invoiceDataArray={invoiceDataArray}
              downloadExcel={downloadExcel}
            />
          )}
        </div>

        <div className='flex-grow overflow-y-scroll h-[calc(100vh-80.9px)] max-h-full'>
          {invoiceDataArray.length ? (
            <InvoiceTable invoiceDataArray={invoiceDataArray} />
          ) : (
            <div className='flex flex-col items-center justify-center mx-auto w-full mt-8'>
              <img src='/no-data.svg' alt='' />
              <p className='mt-4 text-center text-md'>
                Upload invoices for automated data extraction
              </p>
            </div>
          )}
        </div>
        <Toaster />
      </main>
    </div>
  );
}

export default Dashboard;
