import { useEffect, useState } from "react";
import InvoiceTable from "@/components/InvoiceTable";
import ActionButtons from "@/components/ActionButtons";
import { Toaster } from "@/components/ui/toaster";
import {
  downloadGeneralExcel,
  downloadExcelForWellnessExpense,
} from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { useGetUser } from "@/api/user";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/userSlice";
import { useLocation } from "react-router-dom";
import { ROUTES } from "@/lib/routes";
import useLogout from "@/hooks/useLogout";
import UploadComponent from "@/components/DragAndDropUpload";

function Dashboard() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const handleLogout = useLogout();
  const isWelfarePage = location.pathname === ROUTES.WELFARE;
  const [invoiceDataArray, setInvoiceDataArray] = useState<Invoice[] | []>([]);
  const { data: user, refetch, isError } = useGetUser();

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
    isWelfarePage
      ? downloadExcelForWellnessExpense(invoiceDataArray)
      : downloadGeneralExcel(invoiceDataArray);
  };

  return (
    <>
      <Navbar />
      <main className='mt-6'>
        <UploadComponent
          invoiceDataArray={invoiceDataArray}
          handleSubmit={handleSubmit}
          setInvoiceDataArray={setInvoiceDataArray}
        />

        {hasData && (
          <>
            <InvoiceTable invoiceDataArray={invoiceDataArray} />
            <ActionButtons
              invoiceDataArray={invoiceDataArray}
              downloadExcel={downloadExcel}
            />
          </>
        )}
        <Toaster />
      </main>
    </>
  );
}

export default Dashboard;
