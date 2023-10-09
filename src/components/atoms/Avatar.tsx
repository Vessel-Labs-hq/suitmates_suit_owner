import { cn } from "@/utils";
import Image from "next/image";

interface AvatarProps {
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

const Avatar = ({ email, name, src, contentClass }: AvatarProps) => (
  <div className="flex items-center gap-2">
    <div>
      {src ? (
        <Image
          src={src}
          alt={name}
          width={50}
          height={50}
          className="rounded-full object-cover max-md:max-h-10 max-md:max-w-10"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-custom-black/90 text-base uppercase text-white md:h-[50px] md:w-[50px] md:text-xl ">
          {getPlaceholder(name)}
        </div>
      )}
    </div>
    <div className={cn("w-full max-w-[150px]", contentClass)}>
      <h6 className="text-sm font-bold capitalize text-black">{name}</h6>
      <p className="line-clamp-1 max-w-full text-xs lowercase">{email}</p>
    </div>
  </div>
);

export default Avatar;
