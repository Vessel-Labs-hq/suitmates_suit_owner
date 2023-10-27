import { Button, IconBox, Label, Title } from "@the_human_cipher/components-library";
import Avatar from "../atoms/Avatar";
import { ClassValues, cn } from "@/utils";
import Link from "next/link";

type Href = React.ComponentProps<typeof Link>["href"];

interface TenantDetailCardProps {
  status: "paid" | "due";
  onSuiteChange(): void;
  onRemove(): void;
  href: Href;
}
const buttonStyle = cn("flex h-12 items-center gap-1 bg-suite-dark px-3 py-2 text-sm");
const FittedContainer = ({ className, children }: IProps) => (
  <div className={cn("mx-auto w-fit", className)}>{children}</div>
);

interface StyledButtonProps {
  onClick(): void;
  icon: React.ComponentProps<typeof IconBox>["icon"];
  text: string;
  className?: string;
}

const StyledButton = ({ icon, onClick, className, text }: StyledButtonProps) => {
  return (
    <Button className={cn(buttonStyle, className)} variant="dark" onClick={onClick}>
      <IconBox icon={icon} />
      <span>{text}</span>
    </Button>
  );
};

const TenantDetailCard = (props: TenantDetailCardProps) => {
  const { onRemove, onSuiteChange, status, href } = props;

  return (
    <div className="relative grid grid-cols-4 items-center gap-2 rounded-md bg-light-gray p-4">
      <Link href={href} className="absolute inset-0" />
      <div className="flex items-center gap-2">
        <Avatar
          className="h-16 w-16 rounded-md"
          src="https://picsum.photos/id/237/200/300"
          name="rehk mansa"
        />
        <div className="space-y-1">
          <Title className="text-lg" weight="bold" level={4}>
            Rehkmansa
          </Title>
          <Label
            type={status === "due" ? "danger" : "success"}
            dots
            small
            className="gap-1 !py-1 !text-xs capitalize"
            label={cn("rent", status)}
          />
        </div>
      </div>
      <FittedContainer>
        <div>Suite14C</div>
        <div className="text-xs">Hairdresser</div>
      </FittedContainer>
      <FittedContainer>
        <StyledButton icon="RefreshCw03" text="Change Suite" onClick={onSuiteChange} />
      </FittedContainer>
      <FittedContainer>
        <StyledButton icon="Trash03" text="Remove" onClick={onRemove} />
      </FittedContainer>
    </div>
  );
};

export default TenantDetailCard;
