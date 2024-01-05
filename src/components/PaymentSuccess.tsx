import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PartyPopper from "../assets/party-popper.png";

type PricingSuccessProps = {
  creditsAwarded: number;
  showPricingSuccess: boolean;
  setShowPricingSuccess: (value: boolean) => void;
};

const PricingSuccess = ({
  creditsAwarded,
  showPricingSuccess,
  setShowPricingSuccess,
}: PricingSuccessProps) => {
  return (
    <Dialog open={showPricingSuccess} onOpenChange={setShowPricingSuccess}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <img
            src={PartyPopper}
            alt='party popper'
            width={100}
            className='mx-auto'
          />
          <DialogTitle className='text-center text-xl'>
            Congratulations 🥳
          </DialogTitle>
          <DialogDescription className='text-center text-2xl'>
            You have got {creditsAwarded} Invoi credits
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PricingSuccess;
