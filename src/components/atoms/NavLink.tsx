import { cn } from "@/utils";
import { IconBox } from "@the_human_cipher/components-library";
import Link from "next/link";

type Icons = React.ComponentProps<typeof IconBox>["icon"];

interface NavLinkProps {
  link: string;
  text: string;
  icon: Icons;
  isActive?: boolean;
  className?: string;
  textStyles?: string;
}

const NavLink = (props: NavLinkProps) => {
  const { icon, link, text, isActive, className, textStyles } = props;

  return (
    <Link
      href={link}
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-3 text-suite-dark [word-spacing:-0.1ch] lg:text-lg",
        className,
        isActive && "bg-primary text-white"
      )}
    >
      <IconBox icon={icon} size={22} className="w-[22px]" />
      <span className={cn("w-[calc(100%-30px)]", textStyles)}>{text}</span>
    </Link>
  );
};

export default NavLink;
