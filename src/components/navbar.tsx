import Logo from "@/assets/tukangku.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <header
      className="w-full sticky top-0 bg-white/90 z-50"
      aria-label="navbar">
      <nav className="flex container p-6 flex-row justify-between">
        <img src={Logo} alt="Logo TukangKu" className="w-16 lg:w-24 cursor-pointer" />
        <div className="hidden md:block">
        <ul className="flex  flex-row justify-between gap-5 p-5 font-medium cursor-pointer tracking-wide">
          <li className="hover:text-tukangku relative after:content-[''] after:bg-tukangku after:h-[3px] after:w-[0%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute hover:after:w-[100%] after:duration-300">
            Home
          </li>
          <li className="hover:text-tukangku relative after:content-[''] after:bg-tukangku after:h-[3px] after:w-[0%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute hover:after:w-[100%] after:duration-300">
            Category
          </li>
          <li className="hover:text-tukangku relative after:content-[''] after:bg-tukangku after:h-[3px] after:w-[0%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute hover:after:w-[100%] after:duration-300">
            Notification
          </li>
        </ul>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>TK</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Hi, User</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem className="lg:hidden">Category</DropdownMenuItem>
            <DropdownMenuItem className="lg:hidden">Notification</DropdownMenuItem>
            <DropdownMenuItem>Login</DropdownMenuItem>
            <DropdownMenuItem>Register</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};

export default Navbar;
