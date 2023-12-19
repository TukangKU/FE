import { ChevronRight } from "lucide-react";

interface CardProps {
  description: string;
}

const NotificationCard = (props: CardProps) => {
  const { description } = props;
  return (
    <div className="container lg:w-[80%] w-full p-3 border-2 border-black lg:p-6 rounded-md flex flex-row justify-between text-slate-500">
      <p>{description}</p>
      <ChevronRight size={32}/>
    </div>
  );
};

export default NotificationCard;
