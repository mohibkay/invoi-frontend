import store from "storejs";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "@/lib/routes";

const paymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK;

interface MyAccountProps {
  avatar: string;
}

const MyAccount = ({ avatar }: MyAccountProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    store.clear();
    queryClient.clear();
    navigate(ROUTES.LOGIN);
  };

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
