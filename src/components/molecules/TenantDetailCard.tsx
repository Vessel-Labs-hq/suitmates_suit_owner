import { Button, IconBox, Label, Title } from "@the_human_cipher/components-library";
import Avatar from "../atoms/Avatar";
import { ClassValues, clampText, cn, localLog } from "@/utils";
import Link from "next/link";
import { UrlObject } from "url";
import { useRouter } from "next/router";
import { useGetProfile } from "@/utils/hooks/api/useGetProfile";

type Href = React.ComponentProps<typeof Link>["href"];

interface TenantDetailCardProps {
  status: "paid" | "due";
  onSuiteChange(): void;
  onRemove(): void;
  href: Href;
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
  href: string | UrlObject;
}

const StyledButton = ({ href, icon, onClick, className, text }: StyledButtonProps) => {
  return (
    <Link href={href}>
      <Button className={cn(buttonStyle, className)} variant="dark" onClick={onClick}>
        <IconBox icon={icon} className="max-md:h-3 max-md:w-3" />
        <span>{text}</span>
      </Button>
    </Link>
  );
};

const TenantDetailCard = (props: TenantDetailCardProps) => {
  const { onRemove, onSuiteChange, status, href } = props;

  const router = useRouter();

  // const { change_suite } = router.query;

  const { data: profile } = useGetProfile();

  localLog(profile);

  // const handleClose = () => router.push({ query: {} });

  return (
    <div className="relative grid grid-cols-3 items-center gap-2 gap-y-3 rounded-md bg-light-gray p-4 md:grid-cols-4">
      <Link href={href} className="absolute inset-0" />

      <div className="flex items-center gap-2 max-md:col-span-2">
        <Avatar
          className="h-8 w-8 rounded-md sm:h-12 sm:w-12 md:h-16 md:w-16"
          src="https://picsum.photos/id/237/200/300"
          name="rehk mansa"
        />
        <div className="md:space-y-1">
          <Title className="md:text-lg" weight="bold" level={4}>
            Rehkmansa
          </Title>
          <Label
            type={status === "due" ? "danger" : "success"}
            dots
            small
            className="gap-1 py-0.5 text-[10px] capitalize max-md:hidden md:!py-1 md:!text-xs"
            label={cn("rent", status)}
          />
          <div className="text-[10px] leading-none md:hidden">
            {clampText("godspowernathaniel25@gmail.com")}
          </div>
        </div>
      </div>
      <FittedContainer className="max-md:ml-auto max-md:mr-0">
        <div className="max-md:text-sm">Suite14C</div>
        <div className="text-[10px] md:text-xs">Hairdresser</div>
      </FittedContainer>
      <FittedContainer className="max-md:hidden">
        <StyledButton
          icon="RefreshCw03"
          text="Change Suite"
          onClick={onSuiteChange}
          href={{ query: { change_suite: "true" } }}
        />
      </FittedContainer>
      <FittedContainer className="max-md:hidden">
        <StyledButton
          icon="Trash03"
          text="Remove"
          onClick={onRemove}
          href={{ query: { remove_suite: "true" } }}
        />
      </FittedContainer>

      <FittedContainer className="ml-auto flex w-full items-center justify-end max-md:col-span-3 md:hidden">
        <div className="flex gap-2">
          <StyledButton
            icon="RefreshCw03"
            text="Change Suite"
            onClick={onSuiteChange}
            href={{ query: { change_suite: "true" } }}
          />
          <StyledButton
            icon="Trash03"
            text="Remove"
            onClick={onRemove}
            href={{ query: { remove_suite: "true" } }}
          />
        </div>
      </FittedContainer>
    </div>
  );
};

export default TenantDetailCard;
