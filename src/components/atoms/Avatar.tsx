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

  const assertChildValue = (str?: string) => (str ? (str.length > 1 ? str[0] : str) : "");

  const joinValues = (str: string) => str.replace(" ", "");

  if (fullName.length < 1) return joinValues(cn(assertChildValue(name[0]), name[0]?.[1] ?? ""));

  return joinValues(cn(assertChildValue(name[0]), assertChildValue(name[1])));
};

const Avatar = ({ name, className, src, size = 50 }: AvatarProps) =>
  src ? (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      className={cn(
        "h-[50px] w-[50px] rounded-full object-cover max-md:h-10 max-md:w-10",
        className
      )}
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
