import { Button } from "@the_human_cipher/components-library";
import Modal from "../Modal";
import { useRouter } from "next/router";
import AddTenantUI from "./AddTenantUI";
import InviteTenantForm from "./InviteTennatForm";

const LineStyle = "h-[1px] w-full bg-suite-dark";

interface Props extends React.ComponentProps<typeof Modal> {
  onTenantAdded(): void;
}

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

      default:
        return (
          <AddTenantUI
            url="/add-tenant?step=personal-information"
            onClick={handleInviteClick}
          />
        );
    }
  };

  return (
    <Modal {...props}>
      <Modal.Body className="max-w-[600px]">
        <Modal.Title title="Add Tenants" />
        <Modal.Content className="mx-auto grid min-h-[400px] w-full max-w-sm place-items-center">
          {renderModalSelection()}
        </Modal.Content>
      </Modal.Body>
    </Modal>
  );
};

export default AddTenantModal;
