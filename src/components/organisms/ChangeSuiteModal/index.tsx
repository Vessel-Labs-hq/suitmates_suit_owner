import { useRouter } from "next/router";
// import AddTenantUI from "./AddTenantUI";
// import InviteTenantForm from "./InviteTennatForm";
import { assertReactQueryError } from "@/utils";
import { SpinnerLoader } from "@/components/atoms/Loader";
import { useMemo } from "react";
import { useGetProfile } from "@/utils/hooks/api/useGetProfile";
import { Modal } from "@the_human_cipher/components-library";
// import ChangeSuiteForm from "./ChangeSuiteForm";
import { InferSchema } from "@/utils/schema/login";
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { SuiteInfoSchema } from "@/utils/schema/details";
import ChangeSuiteInfoRow from "./ChangeSuiteInfoRow";
import ChangeSuiteInformation from "./ChangeSuiteInformation";
import { useQuery } from "react-query";
// import onBoardingService from "@/utils/apis/onboarding";
// import authService from "@/utils/apis/auth";
// import userProfileApi from "@/utils/hooks/api/userprofile";

type ModalProps = React.ComponentProps<typeof Modal>;
type FormValues = InferSchema<typeof SuiteInfoSchema>;

// interface Props extends ModalProps {
//   onSuiteChange(): void;
//   control: Control<FormValues>;
//   register: UseFormRegister<FormValues>;
//   idx: number;
//   formState: FormState<FormValues>;
//   //   spaceId: string;
// }

const ModalWrapper = ({ children, ...props }: ModalProps) => (
  <Modal {...props}>
    <Modal.Body enableBottomSheet className="min-h-[800px] max-w-[1280px]">
      <Modal.Title title="Change Suite" className="mt-4" />
      <span>Change suite for tenant as requested</span>
      <Modal.Content className="mx-auto grid h-full w-full place-items-center">
        {children}
      </Modal.Content>
    </Modal.Body>
  </Modal>
);

const ChangeSuiteModal = ({ ...props }) => {
  const { data: profile, isLoading, isError, error } = useGetProfile();
  // console.log("profile", profile);

  //   const parsedSuite = useMemo(
  //     () =>
  //       (profile?.space?.suite ?? []).map((ele) => ({
  //         label: `Suite ${ele.suite_number}`,
  //         value: String(ele.id),
  //       })),
  //     [profile]
  //   );

  const router = useRouter();

  // const handleSuiteChange = () => {
  //   router.push({
  //     query: {
  //       ...router.query,
  //       mode: "change_suite",
  //     },
  //   });
  // };

  const renderModalSelection = () => {
    switch (router.query.mode) {
      case "change_suite":
        return <ChangeSuiteModal />;
      case "success":
        return <div />;
      default:
        return (
          <ChangeSuiteInformation
          // onSubmit={onSuiteChange}
          // url="/change-suite?step=personal-information"
          // spaceId={spaceId}
          //   onClick={handleInviteClick}
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

export default ChangeSuiteModal;
