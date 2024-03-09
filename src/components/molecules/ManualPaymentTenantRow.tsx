import { Button, IconBox, Label, Title } from "@the_human_cipher/components-library";
import Avatar from "../atoms/Avatar";
import { cn } from "@/utils";
import dayjs from "dayjs";
import { useState } from "react";
import { LightBox } from "../organisms/Lightbox";

interface TenantDetailCardProps {
  user: {
    avatar?: string;
    name: string;
  };
  payment: DbGetManualPaymentsManualPayment;
}

const FittedContainer = ({ className, children }: IProps) => (
  <div className={cn("mx-auto w-fit", className)}>{children}</div>
);

interface StyledButtonProps {
  onClick?(): void;
  icon: React.ComponentProps<typeof IconBox>["icon"];
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
}

const StyledButton = (props: StyledButtonProps) => {
  const { icon, onClick, className, variant = "dark" } = props;

  return (
    <Button
      className={cn("grid h-8 w-8 place-items-center rounded-full p-0", className)}
      variant={variant}
      onClick={onClick}
    >
      <IconBox icon={icon} />
    </Button>
  );
};

export const ManualPaymentTenantRow = (props: TenantDetailCardProps) => {
  const [open, setOpen] = useState(false);
  const { payment, user } = props;

  const { avatar, name } = user;

  return (
    <>
      <div className="relative grid grid-cols-3 items-center gap-2 gap-y-3 rounded-md bg-light-gray p-4">
        <div className="flex items-center gap-2 max-sm:col-span-2">
          <Avatar
            className="h-8 w-8 rounded-md sm:h-16 sm:w-16"
            src={avatar}
            name={name}
          />
          <div className="sm:space-y-1">
            <Title className="sm:text-base" weight="bold" level={4}>
              {name}
            </Title>
            <Label
              type={payment.status === "pending" ? "danger" : "success"}
              dots
              small
              className="gap-1 py-0.5 text-[10px] capitalize sm:!py-1 sm:!text-xs"
              label={cn(payment.status)}
            />
          </div>
        </div>
        <FittedContainer className="text-right max-sm:w-full sm:text-center">
          <p className="text-xs font-medium opacity-60">Paid</p>
          <p>{dayjs(payment.created_at).fromNow()}</p>
        </FittedContainer>

        <FittedContainer className="ml-auto mr-0 flex items-center justify-end gap-2 max-sm:col-span-3">
          <StyledButton icon="Eye" variant="dark" onClick={() => setOpen(true)} />
          <StyledButton icon="Check" variant="primary" />
          <StyledButton icon="X" variant="dark" className="bg-borderNegative" />
        </FittedContainer>
      </div>
      {open && (
        <LightBox
          open={open}
          close={() => setOpen(false)}
          slides={[{ src: payment.image_url }]}
          render={{
            iconPrev: () => <></>,
            iconNext: () => <></>,
          }}
        />
      )}
    </>
  );
};
