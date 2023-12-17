import { baseURL } from "@/api/routes";
import { useGetUser } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/utils/Icons";
import { ROUTES } from "@/lib/routes";
import { setUser } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import store from "storejs";

const Login = () => {
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  const token = searchParams.get("token");
  const googleAuthUrl = baseURL + import.meta.env.VITE_GOOGLE_AUTH_URL;

  if (token) {
    store.set("token", token);
  }

  const { data: user } = useGetUser();

  const googleAuth = () => {
    window.open(googleAuthUrl, "_self");
  };

  useEffect(() => {
    if (user?.email) {
      dispatch(setUser(user));
      navigate(ROUTES.DASHBOARD);
    }
  }, [dispatch, navigate, user]);

  return (
    <main className='flex-1'>
      <section className='w-full pt-12 md:pt-24 lg:pt-32'>
        <div className='px-4 md:px-6 space-y-10 xl:space-y-16'>
          <div className='grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16'>
            <div>
              <h1 className='lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]'>
                Automated Data Extraction for Invoices
              </h1>
            </div>
            <div className='flex flex-col items-start space-y-4'>
              <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                Simplify your business processes with our AI-powered data
                extraction service. Focus on your core business while we handle
                the data extraction from your invoices.
              </p>
              <div className='mx-auto'>
                <Button onClick={googleAuth}>
                  <Icons.google width={"20px"} height={"20px"} />
                  <p className={"pl-2"}>Sign in with google </p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container space-y-12 px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <div className='inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800'>
                Our Features
              </div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                Streamline Your Workflow with Our Features
              </h2>
              <p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                Utilize our advanced technology to automate your invoice data
                extraction process, increase efficiency and reduce errors.
              </p>
            </div>
          </div>
          <div className='mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3'>
            <div className='grid gap-1'>
              <h3 className='text-lg font-bold'>AI-Powered Extraction</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Our AI-driven service accurately extracts data from your
                invoices, reducing manual efforts and errors.
              </p>
            </div>
            <div className='grid gap-1'>
              <h3 className='text-lg font-bold'>Easy Integration</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Our solution easily integrates with your existing systems,
                ensuring a smooth transition and workflow.
              </p>
            </div>
            <div className='grid gap-1'>
              <h3 className='text-lg font-bold'>Scalable Solution</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Our service scales as your business grows. From a few invoices
                to thousands, we've got you covered.
              </p>
            </div>
          </div>

          <div className='flex justify-center flex-col sm:flex-row items-start gap-4'>
            <Link
              className='inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300'
              to='/support'
            >
              Contact Sales
            </Link>
          </div>
          <div className='flex flex-col items-center justify-center space-y-4 text-center mt-10'>
            <div className='space-y-2'>
              <div className='inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800'>
                Our Pricing
              </div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                Affordable and Efficient Pricing
              </h2>
              <p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                We offer simple and affordable pricing options to help you get
                started.
              </p>
              <div className='mt-6 space-y-4'>
                <div className='grid gap-1'>
                  <h3 className='text-lg font-bold'>Free Plan</h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Get 5 credits on new sign up.
                  </p>
                </div>
                <div className='grid gap-1'>
                  <h3 className='text-lg font-bold'>Paid Plan</h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Get 100 credits for $10.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
