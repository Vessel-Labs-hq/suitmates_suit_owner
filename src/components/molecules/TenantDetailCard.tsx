import { Button, IconBox, Label, Title } from "@the_human_cipher/components-library";
import Avatar from "../atoms/Avatar";
import { ClassValues, clampText, cn } from "@/utils";
import Link from "next/link";

type Href = React.ComponentProps<typeof Link>["href"];

interface TenantDetailCardProps {
  status: "paid" | "due";
  onSuiteChange(hasSuite: boolean): void;
  onRemove(): void;
  href: Href;
  user: {
    avatar?: string;
    name: string;
  };
  onboarded?: boolean;
  suite?: DbSuite;
  business?: DbBusiness;
  email: string;
}
const buttonStyle = cn(
  "relative flex h-12 items-center gap-1 whitespace-nowrap bg-suite-dark px-3 py-2 text-sm max-md:h-8 max-md:rounded-md max-md:px-2 max-md:text-[10px]"
);

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
      <IconBox icon={icon} className="max-md:h-3 max-md:w-3" />
      <span>{text}</span>
    </Button>
  );
};

const TenantDetailCard = (props: TenantDetailCardProps) => {
  const { onRemove, onSuiteChange, status, href, user, suite, business, email } = props;

  const { avatar, name } = user;

  const suiteText = suite ? "Change Suite" : "Assign Suite";

  const handSuiteChange = () => {
    return onSuiteChange(Boolean(suite));
  };

  return (
    <div className="relative grid grid-cols-3 items-center gap-2 gap-y-3 rounded-md bg-light-gray p-4 md:grid-cols-4">
      <Link href={href} className="absolute inset-0" />

      <div className="flex items-center gap-2 max-md:col-span-2">
        <Avatar
          className="h-8 w-8 rounded-md sm:h-12 sm:w-12 md:h-16 md:w-16"
          src={avatar}
          name={name}
        />
        <div className="md:space-y-1">
          <Title className="md:text-lg" weight="bold" level={4}>
            {name}
          </Title>
          <Label
            type={status === "due" ? "danger" : "success"}
            dots
            small
            className="gap-1 py-0.5 text-[10px] capitalize max-md:hidden md:!py-1 md:!text-xs"
            label={cn("rent", status)}
          />
          <div className="text-[10px] leading-none md:hidden">{clampText(email)}</div>
        </div>
      </div>
      <FittedContainer className="text-center max-md:ml-auto max-md:mr-0 max-md:text-xs">
        <div className="max-md:text-sm">
          {suite ? suite.suite_number : "Not Assigned"}
        </div>
        <div className="text-[10px] md:text-xs">
          <span className="xs:hidden"> {clampText(business?.occupation ?? "", 16)}</span>
          <span className="max-xs:hidden"> {business?.occupation}</span>
        </div>
      </FittedContainer>
      <FittedContainer className="max-md:hidden">
        <StyledButton
          icon={suite ? "RefreshCw03" : "Plus"}
          text={suiteText}
          onClick={handSuiteChange}
        />
      </FittedContainer>
      <FittedContainer className="max-md:hidden">
        {suite ? (
          <StyledButton icon="Trash03" text="Remove" onClick={onRemove} />
        ) : (
          "No Suite Added"
        )}
      </FittedContainer>

      <FittedContainer className="ml-auto flex w-full items-center justify-end max-md:col-span-3 md:hidden">
        <div className="flex gap-2">
          <StyledButton
            icon={suite ? "RefreshCw03" : "Plus"}
            text={suiteText}
            onClick={handSuiteChange}
          />
          {suite ? (
            <StyledButton icon="Trash03" text="Remove" onClick={onRemove} />
          ) : null}
        </div>
      </FittedContainer>
    </div>
  );
};

export default TenantDetailCard;
