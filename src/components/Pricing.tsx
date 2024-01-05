import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogContent, Dialog } from "@/components/ui/dialog";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "./utils/Icons";

const Pricing = ({
  showPricingDialog,
  setShowPricingDialog,
  checkoutHandler,
}: {
  checkoutHandler: (amount: number) => void;
  showPricingDialog: boolean;
  setShowPricingDialog: (value: boolean) => void;
}) => {
  const closePricingDialogWithADelay = () => {
    setTimeout(() => {
      setShowPricingDialog(false);
    }, 600);
  };

  return (
    <Dialog open={showPricingDialog} onOpenChange={setShowPricingDialog}>
      <DialogTrigger asChild>
        <Button size='sm' className='space-x-1'>
          <Icons.sparkles />
          <span>Upgrade</span>
        </Button>
      </DialogTrigger>
      <DialogContent style={{ maxWidth: 878 }}>
        <div>
          <div>Pricing Tiers</div>
          <div>Select a plan that's right for you.</div>
        </div>
        <div className='grid grid-cols-3 gap-4 w-full'>
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <Badge
                onClick={() => {
                  checkoutHandler(10);
                  closePricingDialogWithADelay();
                }}
              >
                5 credits
              </Badge>
            </CardHeader>
            <CardContent>
              <p>Get started with our free plan.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Basic</CardTitle>
              <Badge>30 credits</Badge>
            </CardHeader>
            <CardContent>
              <p>Get 30 credits for only ₹99</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  checkoutHandler(99);
                  closePricingDialogWithADelay();
                }}
              >
                Upgrade
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <Badge>100 credits</Badge>
            </CardHeader>
            <CardContent>
              <p>Get 100 credits for only ₹299</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  checkoutHandler(299);
                  closePricingDialogWithADelay();
                }}
              >
                Upgrade
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Pricing;
