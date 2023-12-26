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
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <Dialog>
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
              <Badge>5 credits</Badge>
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
              <Button>
                <Link to={"https://mohibkay.gumroad.com/l/invoi-30"}>
                  Upgrade
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <Badge>100 credits</Badge>
            </CardHeader>
            <CardContent>
              <p>Get 100 credits for only ₹849</p>
            </CardContent>
            <CardFooter>
              <Button>
                <Link to={"https://mohibkay.gumroad.com/l/invoi-100"}>
                  Upgrade
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Pricing;
