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
      pathname: "/client/notification",
    },
  ];

  const dataNavWorker = [
    {
      name: "Home",
      pathname: "/",
    },
    {
      name: "Job Request",
      pathname: "/job-request",
    },
    {
      name: "History",
      pathname: "/history",
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
            {role === "worker"
              ? dataNavWorker.map((item) => {
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
                })
              : dataNavClient.map((item) => {
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
                      onClick={() => navigate("/profile/worker")}>
                      Profile
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>Hi, {client.nama}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigate("/profile/client")}>
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
