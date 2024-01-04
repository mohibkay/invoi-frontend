import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PricingSuccessProps = {
  showPricingSuccess: boolean;
  setShowPricingSuccess: (value: boolean) => void;
};

const PricingSuccess = ({
  showPricingSuccess,
  setShowPricingSuccess,
}: PricingSuccessProps) => {
  return (
    <Dialog open={showPricingSuccess} onOpenChange={setShowPricingSuccess}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <img
            src='public/party-popper.png'
            alt='party popper'
            width={100}
            className='mx-auto'
          />
          <DialogTitle className='text-center text-xl'>
            Congratulations 🥳
          </DialogTitle>
          <DialogDescription className='text-center text-2xl'>
            You have got 100 Invoi credits
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PricingSuccess;
