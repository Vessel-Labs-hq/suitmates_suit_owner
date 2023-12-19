import { cn } from "@/utils";
import { IconBox } from "@the_human_cipher/components-library";
import { IconButton } from "../organisms/TenantPageBlocks";

type Icons = React.ComponentProps<typeof IconBox>["icon"];

interface NavLinkProps {
  text: string;
  icon: Icons;
  href: string;
  isActive?: boolean;
  className?: string;
  textStyles?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const HelpLink = (props: NavLinkProps) => {
  const { icon, isActive, className } = props;

  return (
    <IconButton
      icon={icon}
      text="Help & Support"
      href={{ query: { help_and_support: "true" } }}
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-3 text-suite-dark [word-spacing:-0.1ch] lg:text-lg",
        className,
        isActive && "bg-primary text-white"
      )}
    />
  );
};

export default HelpLink;
