import { cn } from "@/utils";
import Image from "next/image";
import Avatar from "./Avatar";

interface HeaderProfileProps {
  email: string;
  name: string;
  src?: string;
  contentClass?: string;
}

const getPlaceholder = (name: string) => {
  const fullName = name.split(" ");

  if (fullName.length < 1) return cn(name[0][0], name[0]?.[1] ?? "").replace(" ", "");

  return cn(name[0][0], name[1][0]).replace(" ", "");
};

const HeaderProfile = ({ email, name, src, contentClass }: HeaderProfileProps) => (
  <div className="flex items-center gap-2">
    <Avatar src={src} name={name} />
    <div className={cn("w-full max-w-[150px]", contentClass)}>
      <h6 className="text-sm font-bold capitalize text-black">{name}</h6>
      <p className="line-clamp-1 max-w-full text-xs lowercase">{email}</p>
    </div>
  </div>
);

export default HeaderProfile;
