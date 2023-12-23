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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToken } from "@/utils/contexts/token";
import { useToast } from "./ui/use-toast";

const Navbar = () => {
  const location = useLocation();
  const { token, role, client, worker, changeToken } = useToken();
  const { toast } = useToast();
  const navigate = useNavigate();

  const dataNav = [
    {
      name: "Home",
      pathname: "/",
    },
    {
      name: "Category",
      pathname: "/category",
    },
    {
      name: "Job Request",
      pathname: "/worker/job/request",
    },
  ];

  

  function handleLogout() {
    changeToken();
    toast({
      description: "Logout Successfully",
    });
  }

  return (
    <header
      className="w-full sticky top-0 bg-white/90 z-50 drop-shadow-lg"
      aria-label="navbar">
      <nav className="flex container p-6 flex-row justify-between">
        <Link to={'/'}>
        <img
          src={Logo}
          alt="Logo TukangKu"
          className="w-16 lg:w-24 cursor-pointer"
        />
        </Link>
        <div className="hidden md:block">
          <ul className="flex  flex-row justify-between gap-5 p-5 font-medium cursor-pointer tracking-wide">
            {dataNav.map((item) => {
              return (
                <Link to={item.pathname}>
                  <li
                    className={` ${
                      location.pathname === item.pathname ? "text-tukangku" : ""
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
              {role === "worker" ? (
                <AvatarImage src={worker.foto} alt={worker.nama} />
              ) : (
                <AvatarImage src={client.foto} alt={client.nama} />
              )}
              <AvatarFallback>TK</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" forceMount>
            {token ? (
              <>
                {role === "worker" ? (
                  <>
                    <DropdownMenuLabel>Hi, {worker.nama}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigate("/profile/worker/edit")}>
                      Profile
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>Hai, {client.nama}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigate("/profile/client/edit")}>
                      Profile
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem onClick={() => handleLogout()}>
                  Logout
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={() => navigate("/login")}>
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/register")}>
                  Register
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};

export default Navbar;
