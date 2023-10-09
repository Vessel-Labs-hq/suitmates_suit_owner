import { cn } from "@/utils";
import Image from "next/image";

interface AvatarProps {
  email: string;
  name: string;
  src?: string;
}

const getPlaceholder = (name: string) => {
  const fullName = name.split(" ");

  if (fullName.length < 1) return cn(name[0][0], name[0]?.[1] ?? "").replace(" ", "");

  return cn(name[0][0], name[1][0]).replace(" ", "");
};

const Avatar = ({ email, name, src }: AvatarProps) => (
  <div className="flex items-center gap-2">
    <div>
      {src ? (
        <Image src={src} alt={name} width={50} height={50} className="rounded-full object-cover" />
      ) : (
        <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-custom-black/90 text-xl uppercase text-white ">
          {getPlaceholder(name)}
        </div>
      )}
    </div>
    <div className="w-full max-w-[150px]">
      <h6 className="text-sm font-bold capitalize text-black">{name}</h6>
      <p className="line-clamp-1 max-w-full text-xs lowercase">{email}</p>
    </div>
  </div>
);

export default Avatar;
