import { Button } from "@the_human_cipher/components-library";
import Modal from "../Modal";
import Link from "next/link";
import { UrlObject } from "url";
import { useRouter } from "next/router";

const LineStyle = "h-[1px] w-full bg-suite-dark";

interface Props extends React.ComponentProps<typeof Modal> {
  currentURL?: UrlObject | string;
}

const AddTenantModal = (props: Props) => {
  const router = useRouter();

  const handleInviteClick = () => {
    router.push({
      query: {
        ...router.query,
        mode: "invite",
      },
    });
  };

  return (
    <Modal {...props}>
      <Modal.Body className="max-w-[600px]">
        <Modal.Title title="Add Tenants" />
        <Modal.Content className="mx-auto grid min-h-[400px] w-full max-w-sm place-items-center">
          <div className="w-full space-y-6 max-md:text-sm">
            <Button onClick={handleInviteClick}>Invite</Button>
            <div className="mx-auto flex max-w-[70%] items-center gap-1 text-center">
              <div className={LineStyle} />
              <span>or</span>
              <div className={LineStyle} />
            </div>
            <Button asChild className="border border-primary bg-transparent text-primary">
              <Link
                className="flex items-center justify-center"
                href="/add-tenant?step=personal-information"
              >
                Add Manually
              </Link>
            </Button>
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal>
  );
};

export default AddTenantModal;
