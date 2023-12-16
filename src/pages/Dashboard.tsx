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

const initialState = [
  {
    id: "chatcmpl-8WMi0jpVduxb2Eqzeh5XJ2oaTLGPZ",
    amount: "255",
    date: "07/10/2021",
    invoiceNumber: "151210244534580",
    vendor: "Instamart",
    foodDeliveryApp: "",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472707-010-Instamart.jpeg",
  },
  {
    id: "chatcmpl-8WMi0J7r4uQNWCuBWPTvwtiKPpGeM",
    amount: "1015.00",
    date: "26/10/2023",
    invoiceNumber: "157289444997597",
    vendor: "Citadines1 Citadines Hotel",
    foodDeliveryApp: "",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472752-WhatsApp_Oct_26_Image_1..jpeg",
  },
  {
    id: "chatcmpl-8WMi0ivAE8tGTcebPhlClkgsvUF38",
    amount: "285.35",
    date: "11/04/2023",
    invoiceNumber: "",
    vendor: "Uber",
    foodDeliveryApp: "",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472749-receipt_0288035f-e643-4d0f-94e4-15cefb06ed80.pdf",
  },
  {
    id: "chatcmpl-8WMi0j758oF7IBWHfUqErpqVyW2Yn",
    amount: "82.74",
    date: "28/04/2023",
    invoiceNumber: "0002195042800008",
    vendor: "Cafe Classic",
    foodDeliveryApp: "Swiggy",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472752-taco_0002195042800008_b75950cc-56a3-4cf1-beaf-a5600b11ba38.pdf",
  },
  {
    id: "chatcmpl-8WMi05vka186HJ3Yi5cm0gldoBEDB",
    amount: "464.36",
    date: "20/09/2023",
    invoiceNumber: "5190925284",
    vendor: "Hara Bara",
    foodDeliveryApp: "#",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472755-WhatsApp_Oct_26_Image_2..jpeg",
  },
  {
    id: "chatcmpl-8WMi0347vAlRh6oUaDkBprJ0rG9WU",
    amount: "470.82",
    date: "10/08/2023",
    invoiceNumber: "432003279118",
    vendor: "Reliance Jio Infocomm Limited",
    foodDeliveryApp: "",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472698-jio%20postpaid%20aug.pdf",
  },
  {
    id: "chatcmpl-8WMi0GJ7KzmfriMLLhVkcw5B35dhw",
    amount: "1178.82",
    date: "16/09/2023",
    invoiceNumber: "20009083201",
    vendor: "Bharti Airtel Limited",
    foodDeliveryApp: "",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472707-20009083201_284903006_9_2023.pdf",
  },
  {
    id: "chatcmpl-8WMi0BD9uBeDukkDzykCojokuoTGd",
    amount: "337.00",
    date: "18/08/2023",
    invoiceNumber: "175427604209",
    vendor: "Instawich - Desi Sandwiches",
    foodDeliveryApp: "",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472705-004-Instawich_-_Desi_Sandwiches.jpeg",
  },
  {
    id: "chatcmpl-8WMi0JszR3UPBaTawopYmcUSPHq3t",
    amount: "175",
    date: "01/09/2019",
    invoiceNumber: "50430282157",
    vendor: "Friends Chettinad Mess",
    foodDeliveryApp: "Swiggy",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472749-swiggy-order-50430282157_Pages_1-2_-_Flip_PDF_Download___FlipHTML5.pdf",
  },
  {
    id: "chatcmpl-8WMi0m0zW66WQIvlICB9EZc58hFVI",
    amount: "1719.82",
    date: "10/11/2023",
    invoiceNumber: "429004250888",
    vendor: "Jio",
    foodDeliveryApp: "",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472687-Jio%20PostPaid%20Nov.pdf",
  },
  {
    id: "chatcmpl-8WMi0mOZbumTpBxiEe0xAGolP4NUz",
    amount: "320.88",
    date: "15/09/2023",
    invoiceNumber: "Z24MHOT006740106",
    vendor: "RushHrs Restaurant",
    foodDeliveryApp: "Zomato",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472743-Invoice_5178177025.pdf",
  },
  {
    id: "chatcmpl-8WMi07OZRdv0zmvkdfVUUFB4zy2qq",
    amount: "1520.00",
    date: "08/11/2019",
    invoiceNumber: "157299708600455",
    vendor: "Cream Centre",
    foodDeliveryApp: "",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472755-WhatsApp_Oct_26_Image.jpeg",
  },
  {
    id: "chatcmpl-8WMi0Sa7p8Kof03q5W94qFYi7iLBn",
    amount: "179.65",
    date: "07/04/2023",
    invoiceNumber: "4792771283",
    vendor: "Giridhar",
    foodDeliveryApp: "Zomato",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472746-Order_ID_4792771283.pdf",
  },
  {
    id: "chatcmpl-8WMi0qxauBkkX8L4QIsYPeXBR50ov",
    amount: "1215",
    date: "09/04/2023",
    invoiceNumber: "1642",
    vendor: "MUGHALS Resto & Bar",
    foodDeliveryApp: "",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472726-Image_20230410_124527_312.jpeg",
  },
  {
    id: "chatcmpl-8WMi0xe4LCpVdy8KwP031W9TVWyYx",
    amount: "470.82",
    date: "10-SEP-2023",
    invoiceNumber: "464003589764",
    vendor: "Jio",
    foodDeliveryApp: "",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472701-jio%20postpaid%20sept.pdf",
  },
  {
    id: "chatcmpl-8WMi0gfzEkbxqfWQMj8iLoxfQNdyX",
    amount: "470.82",
    date: "10-10-2023",
    invoiceNumber: "439004118927",
    vendor: "Jio",
    foodDeliveryApp: "",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472690-jio%20oct.pdf",
  },
  {
    id: "chatcmpl-8WMi0lzXf8oP5oNReqL9CWBw2qAPw",
    amount: "1953.00",
    date: "08/04/2023",
    invoiceNumber: "249",
    vendor: "open window cate BIstro",
    foodDeliveryApp: "",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472717-Image_20230410_122142_468.jpeg",
  },
  {
    id: "chatcmpl-8WMi0PuaHFDidziNmxAzwHoZa0VbA",
    amount: "572.00",
    date: "11/04/2023",
    invoiceNumber: "RS00084327",
    vendor: "The Orchid Hotel, Pune",
    foodDeliveryApp: "",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472734-Image_20230412_162602_501.pdf",
  },
  {
    id: "chatcmpl-8WMi1S43dBKbNDMteXdaWZ4jPyHB6",
    amount: "761.00",
    date: "07/04/2023",
    invoiceNumber: "510",
    vendor: "Bistro Quos Foods Pvt Ltd",
    foodDeliveryApp: "",
    platformFee: "",
    documentUrl:
      "https://invoi-s3-bucket.s3.ap-south-1.amazonaws.com/1702724472711-Image_20230410_122122_690.jpeg",
  },
];

function Dashboard() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const handleLogout = useLogout();
  const isWelfarePage = location.pathname === ROUTES.WELFARE;
  const [invoiceDataArray, setInvoiceDataArray] = useState<Invoice[] | []>([
    ...initialState,
  ]);
  console.log("🐬 ~ Dashboard ~ invoiceDataArray:", invoiceDataArray);
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
    <div className='max-h-100vh overflow-y-hidden'>
      <Navbar />
      <main className='mt-6 flex max-w-7xl mx-auto'>
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

        {hasData && (
          <div className='flex-grow overflow-y-scroll h-[calc(100vh-80.9px)] max-h-full'>
            <InvoiceTable invoiceDataArray={invoiceDataArray} />
          </div>
        )}
        <Toaster />
      </main>
    </div>
  );
}

export default Dashboard;
