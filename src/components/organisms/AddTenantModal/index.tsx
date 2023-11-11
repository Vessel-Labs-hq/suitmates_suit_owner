import { useRouter } from "next/router";
import AddTenantUI from "./AddTenantUI";
import InviteTenantForm from "./InviteTennatForm";
import { Modal } from "@the_human_cipher/components-library";

type ModalProps = React.ComponentProps<typeof Modal>;

interface Props extends ModalProps {
  onTenantAdded(): void;
}

const ModalWrapper = ({ children, ...props }: ModalProps) => (
  <Modal {...props}>
    <Modal.Body enableBottomSheet className="max-w-[600px]">
      <Modal.Title title="Add Tenants" />
      <Modal.Content className="mx-auto grid min-h-[400px] w-full max-w-sm place-items-center">
        {children}
      </Modal.Content>
    </Modal.Body>
  </Modal>
);

const AddTenantModal = ({ onTenantAdded, ...props }: Props) => {
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

  return <ModalWrapper {...props}>{renderModalSelection()}</ModalWrapper>;
};

export default AddTenantModal;
