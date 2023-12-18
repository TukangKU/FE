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
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  console.log(location);

  const dataNavClient = [
    {
      name: "Home",
      pathname: "/",
    },
    {
      name: "Category",
      pathname: "/category",
    },
    {
      name: "Notification",
      pathname: "/notification",
    },
  ];


  return (
    <header
      className="w-full sticky top-0 bg-white/90 z-50"
      aria-label="navbar">
      <nav className="flex container p-6 flex-row justify-between">
        <img
          src={Logo}
          alt="Logo TukangKu"
          className="w-16 lg:w-24 cursor-pointer"
        />
        <div className="hidden md:block">
          <ul className="flex  flex-row justify-between gap-5 p-5 font-medium cursor-pointer tracking-wide">
            {dataNavClient.map((item) => {
              return (
                <Link to={item.pathname}>
                  <li
                    className={` ${
                      location.pathname === item.pathname
                        ? "text-tukangku"
                        : ""
                    }`}>
                    {item.name}
                  </li>
                </Link>
              );
            })}
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
            <DropdownMenuItem className="lg:hidden">
              Notification
            </DropdownMenuItem>
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
