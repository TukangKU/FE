import PageNotFound from "@/assets/notfound.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center my-auto">
      <img src={PageNotFound} alt="Page Not Found" className="lg:w-[500px]" />
      <Link to={"/"}>
        <Button>Go To Homepage</Button>
      </Link>
    </div>
  );
};

export default NotFound;
