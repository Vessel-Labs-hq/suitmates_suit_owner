import { useRouter } from "next/router";
import AddTenantUI from "./AddTenantUI";
import InviteTenantForm from "./InviteTennatForm";
import { Modal } from "@the_human_cipher/components-library";
import AttachSuiteForm from "./AttachSuiteForm";
import { useGetProfile } from "@/utils/hooks/api/useGetProfile";
import { SpinnerLoader } from "@/components/atoms/Loader";
import { assertReactQueryError } from "@/utils";
import { useMemo } from "react";

type ModalProps = React.ComponentProps<typeof Modal>;

interface Props extends ModalProps {
  onTenantAdded(): void;
}

interface ModalCustomProps extends ModalProps {
  title?: string;
}

const ModalWrapper = ({ children, title, ...props }: ModalCustomProps) => (
  <Modal {...props}>
    <Modal.Body enableBottomSheet className="md:max-w-[600px]">
      <Modal.Title title={title ?? "Add Tenants"} />
      <Modal.Content className="mx-auto grid min-h-[400px] w-full max-w-sm place-items-center">
        {children}
      </Modal.Content>
    </Modal.Body>
  </Modal>
);

export const InviteTenantModal = ({ onTenantAdded, ...props }: Props) => {
  const router = useRouter();

  const handleInviteClick = () => {
    router.push({
      query: {
        ...router.query,
        mode: "invite",
      },
    });
  };

  const renderModalSelection = () => {
    switch (router.query.mode) {
      case "invite":
        return <InviteTenantForm onSubmit={onTenantAdded} />;
      default:
        return (
          <AddTenantUI
            url="/add-tenant?step=personal-information"
            onClick={handleInviteClick}
          />
        );
    }
  };

  return <ModalWrapper {...props}>{renderModalSelection()}</ModalWrapper>;
};

interface AddTenantModalProps extends Props {
  email: string;
}
export const AttachTenantModal = ({
  onTenantAdded,
  email,
  ...props
}: AddTenantModalProps) => {
  const { data: profile, isLoading, isError, error } = useGetProfile();

  const parsedSuite = useMemo(
    () =>
      (profile?.space?.suite ?? []).map((ele) => ({
        label: `Suite ${ele.suite_number}`,
        value: String(ele.id),
      })),
    [profile]
  );

  if (isLoading) {
    return (
      <ModalWrapper {...props}>
        <SpinnerLoader />
      </ModalWrapper>
    );
  }

  if (isError) {
    return (
      <ModalWrapper {...props}>
        <div>{assertReactQueryError(error)}</div>
      </ModalWrapper>
    );
  }

  if (!profile) {
    return (
      <ModalWrapper {...props}>
        <SpinnerLoader />
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper title="Add Tenant to Suite" {...props}>
      <AttachSuiteForm onSubmit={onTenantAdded} suites={parsedSuite} email={email} />
    </ModalWrapper>
  );
};
