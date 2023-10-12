import { cn } from "@/utils";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  name: string;
  className?: string;
  size?: number;
}

const getPlaceholder = (name: string) => {
  const fullName = name.split(" ");

  if (fullName.length < 1) return cn(name[0][0], name[0]?.[1] ?? "").replace(" ", "");

  return cn(name[0][0], name[1][0]).replace(" ", "");
};

const Avatar = ({ name, className, src, size = 50 }: AvatarProps) =>
  src ? (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      className={cn("rounded-full object-cover max-md:max-h-10 max-md:max-w-10", className)}
    />
  ) : (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full bg-custom-black/90 text-base uppercase text-white md:h-[50px] md:w-[50px] md:text-xl",
        className
      )}
    >
      {getPlaceholder(name)}
    </div>
  );

export default Avatar;
