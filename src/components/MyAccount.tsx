import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useLogout from "@/hooks/useLogout";
const paymentLink = import.meta.env.VITE_PAYMENT_LINK;

interface MyAccountProps {
  avatar: string;
}

const MyAccount = ({ avatar }: MyAccountProps) => {
  const handleLogout = useLogout();

  const handleBuyCredits = () => {
    window.location.href = paymentLink;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleBuyCredits}>
          Buy 100 Credits
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MyAccount;
