import Icons from "@/assets/icons";
import { Modal } from "@the_human_cipher/components-library";

type ModalProps = React.ComponentProps<typeof Modal>;

export const HelpAndSupportModal = ({ ...props }: ModalProps) => {
  return (
    <Modal {...props}>
      <Modal.Body enableBottomSheet className="pb-4 md:max-w-[800px]">
        <Modal.Title title="" />
        <Modal.Content className="py-0">
          <div className="text-center">
            <div className="mb-2 flex justify-center">{Icons.HelpAndSupport}</div>
            <h3 className="mb-8 text-4xl font-normal leading-10">
              Are you facing any problem?
            </h3>
            <p className="text-xl text-suite-dark">
              If you have any issues, kindly contact us through the information below. Our
              support team will reply as soon as possible.
            </p>

            <div className="mt-24 flex justify-center gap-8">
              <span className="flex items-center gap-2 rounded-lg bg-[#D0FCE6] px-6 py-3">
                {Icons.Mail}
                help@suitemates.com
              </span>
              <span className="flex items-center gap-2 rounded-lg bg-[#D0FCE6] px-6 py-3">
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
