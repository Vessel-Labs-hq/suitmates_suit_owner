import { Button, IconBox, Label, Title } from "@the_human_cipher/components-library";
import Avatar from "../atoms/Avatar";
import { cn } from "@/utils";
import dayjs from "dayjs";
import { useState } from "react";
import { LightBox } from "../organisms/Lightbox";
import { renderSkeltonLoader } from "../atoms/blocks";
import rentHistoryApi from "@/utils/apis/rent-history";
import Alert from "@/utils/base/alerts";

interface TenantDetailCardProps {
  user: {
    avatar?: string;
    name: string;
  };
  payment: DbGetManualPaymentsManualPayment;
  refetch?(): any | Promise<any>;
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
  const { payment, user, refetch } = props;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { renderSkeleton } = renderSkeltonLoader(loading);

  const { avatar, name } = user;

  const handleDeclineOrAccept = async (target: DbGetManualTarget) => {
    setLoading(true);
    try {
      const res = await rentHistoryApi.approveOrDeclineManualPayment(payment.id, target);
      await refetch?.();
      Alert.success(`You ${target} payment for ${user.name}`);
    } catch (error) {
      Alert.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderButton = (node: React.ReactNode) =>
    renderSkeleton(node, {
      className: " h-8 w-8 rounded-full",
    });

  return (
    <>
      <div className="relative grid grid-cols-3 items-center gap-2 gap-y-3 rounded-md bg-light-gray p-4">
        <div className="flex w-full items-center gap-2 max-sm:col-span-2">
          {renderSkeleton(
            <Avatar
              className="h-8 w-8 rounded-md sm:h-16 sm:w-16"
              src={avatar}
              name={name}
            />,
            { className: "h-8 w-8 rounded-md sm:h-16 sm:w-16" }
          )}
          <div className="w-[calc(100%-32px)] sm:w-[calc(100%-64px)] sm:space-y-1">
            {renderSkeleton(
              <Title className="sm:text-base" weight="bold" level={4}>
                {name}
              </Title>,
              { className: "h-4 w-full" }
            )}
            {renderSkeleton(
              <Label
                type={payment.status === "pending" ? "danger" : "success"}
                dots
                small
                className="gap-1 py-0.5 text-[10px] capitalize sm:!py-1 sm:!text-xs"
                label={cn(payment.status)}
              />,
              { className: "h-4 w-[60%]" }
            )}
          </div>
        </div>
        <FittedContainer className="flex flex-col items-center justify-center gap-2 text-right max-sm:w-full sm:text-center">
          {renderSkeleton(<p className="text-xs font-medium opacity-60">Paid</p>, {
            className: "h-4 w-[40px]",
          })}
          {renderSkeleton(<p>{dayjs(payment.created_at).fromNow()}</p>, {
            className: "h-4 w-[80px]",
          })}
        </FittedContainer>

        <FittedContainer className="ml-auto mr-0 flex items-center justify-end gap-2 max-sm:col-span-3">
          {renderButton(
            <StyledButton icon="Eye" variant="dark" onClick={() => setOpen(true)} />
          )}
          {renderButton(
            <StyledButton
              icon="Check"
              variant="primary"
              onClick={() => handleDeclineOrAccept("approved")}
            />
          )}
          {renderButton(
            <StyledButton
              icon="X"
              variant="dark"
              className="bg-borderNegative"
              onClick={() => handleDeclineOrAccept("declined")}
            />
          )}
        </FittedContainer>
      </div>
      {open && (
        <LightBox
          open={open}
          close={() => setOpen(false)}
          slides={[{ src: payment.image_url }]}
          render={{ iconPrev: () => <></>, iconNext: () => <></> }}
        />
      )}
    </>
  );
};
