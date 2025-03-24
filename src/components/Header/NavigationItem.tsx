import { NavigationMenuItem } from "../ui/navigation-menu";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationLink } from "./types";

type NavigationItemProps = {
  link: NavigationLink;
};

const NavigationItem = ({ link }: NavigationItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === link.to;

  return (
    <NavigationMenuItem
      className={`group/item px-4 py-2 transition-all ${isActive ? "border-b-2 border-foreground" : `cursor-pointer border-b-2 border-transparent hover:border-b-2 hover:border-foreground`}`}
      onClick={() => navigate(link.to)}
    >
      <p className={`${isActive ? `cursor-default text-primary` : `text-primary group-hover/item:text-primary`}`}>
        {link.text}
      </p>
    </NavigationMenuItem>
  );
};

export default NavigationItem;
