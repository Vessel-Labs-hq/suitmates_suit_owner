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
}

const NavLink = (props: NavLinkProps) => {
  const { icon, link, text, isActive, className } = props;

  return (
    <Link
      href={link}
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-3 text-suite-dark [word-spacing:-0.1ch] lg:text-lg",
        className,
        isActive && "bg-primary text-white"
      )}
    >
      <IconBox icon={icon} size={22} />
      <span>{text}</span>
    </Link>
  );
};

export default NavLink;
