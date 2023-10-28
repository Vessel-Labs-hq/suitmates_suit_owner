import Modal from "../Modal";
import { useRouter } from "next/router";
import AddTenantUI from "./AddTenantUI";
import InviteTenantForm from "./InviteTennatForm";
import { assertReactQueryError } from "@/utils";
import { SpinnerLoader } from "@/components/atoms/Loader";
import { useMemo } from "react";
import { useGetProfile } from "@/utils/hooks/api/useGetProfile";

type ModalProps = React.ComponentProps<typeof Modal>;

interface Props extends ModalProps {
  onTenantAdded(): void;
}

const ModalWrapper = ({ children, ...props }: ModalProps) => (
  <Modal {...props}>
    <Modal.Body className="max-w-[600px]">
      <Modal.Title title="Add Tenants" />
      <Modal.Content className="mx-auto grid min-h-[400px] w-full max-w-sm place-items-center">
        {children}
      </Modal.Content>
    </Modal.Body>
  </Modal>
);

const AddTenantModal = ({ onTenantAdded, ...props }: Props) => {
  const { data: profile, isLoading, isError, error } = useGetProfile();

  const parsedSuite = useMemo(
    () =>
      (profile?.space?.suite ?? []).map((ele) => ({
        label: `Suite ${ele.suite_number}`,
        value: String(ele.id),
      })),
    [profile]
  );

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
        return <InviteTenantForm onSubmit={onTenantAdded} suites={parsedSuite} />;
      case "success":
        return <div />;
      default:
        return (
          <AddTenantUI
            url="/add-tenant?step=personal-information"
            onClick={handleInviteClick}
          />
        );
    }
  };

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

  return <ModalWrapper {...props}>{renderModalSelection()}</ModalWrapper>;
};

export default AddTenantModal;
