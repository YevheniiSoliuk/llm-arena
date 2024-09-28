import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { links } from "./constants";
import NavigationItem from "./NavigationItem";

const Header = () => {
  return (
    <NavigationMenu className='fixed left-0 top-0 z-20 min-w-full p-4 dark:bg-background'>
      <NavigationMenuList className='gap-4'>
        {links.map((link) => (
          <NavigationItem key={link.to} link={link} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Header;
