import Icons from "@/assets/icons";
import { cn } from "@/utils";
import { Modal } from "@the_human_cipher/components-library";

type ModalProps = React.ComponentProps<typeof Modal>;

export const HelpAndSupportModal = ({ ...props }: ModalProps) => {
  const styles = cn(
    "flex items-center gap-2 rounded-lg bg-[#D0FCE6] px-3 py-3 max-sm:text-sm max-xs:text-xs md:px-6"
  );

  return (
    <Modal {...props}>
      <Modal.Body enableBottomSheet className="pb-4 md:max-w-[800px]">
        <Modal.Title title="" />
        <Modal.Content className="py-0">
          <div className="text-center">
            <div className="mb-2 flex justify-center">{Icons.HelpAndSupport}</div>
            <h3 className="mb-8 text-2xl font-normal leading-10 md:text-4xl">
              Are you facing any problem?
            </h3>
            <p className="mx-auto max-w-[45ch] text-suite-dark md:text-xl">
              If you have any issues, kindly contact us through the information below. Our
              support team will reply as soon as possible.
            </p>

            <div className="my-16 flex justify-center gap-2 md:mb-0 md:gap-8">
              <span className={styles}>
                {Icons.Mail}
                help@suitemates.com
              </span>
              <span className={styles}>
                {Icons.PhoneIcon}
                +190792654779
              </span>
            </div>
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal>
  );
};
