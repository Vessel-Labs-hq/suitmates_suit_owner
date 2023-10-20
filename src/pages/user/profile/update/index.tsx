import Image from "next/image";
import Logo from "public/logo-dark.png";
import { useRouter } from "next/router";
import { formatWord } from "@/utils";
import PersonalInformation from "@/components/organisms/Profile/PersonalInfo";
import SpaceInfo from "@/components/organisms/Profile/SpaceInfo";
import SuiteInformation from "@/components/organisms/Profile/SuiteInformation";
import AccountInformation from "@/components/organisms/Profile/AccountInfo";
import { useEffect, useState } from "react";
import { StepProgressIndicator } from "@the_human_cipher/components-library";
import SEO from "@/components/layouts/SEO";
import { SpinnerLoader } from "@/components/atoms/Loader";
import authService from "@/utils/apis/auth";
import onBoardingService from "@/utils/apis/onboarding";
import Alert from "@/utils/base/alerts";

const AllSteps = [
  "personal-information",
  "space-information",
  "suite-information",
  "account-information",
] as const;

type Step = (typeof AllSteps)[number];

type IndexedStep = Step | (string & {});

const UpdateUserPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [shouldVerify, setShouldVerify] = useState(false);

  const { step, spaceId } = router.query;

  const space_id = spaceId ? String(spaceId) : null;

  const user = authService.getSession();

  useEffect(() => {
    setLoading(false);
  }, []);

  const updateUserProfile = async () => {
    setShouldVerify(true);

    try {
      await onBoardingService.completeUserOnboarding(String(user?.id));
      Alert.success("Profile Updated successfully");
      router.push("/");
    } catch (error) {
      Alert.error(error);
    } finally {
      setShouldVerify(false);
    }
  };

  const renderStep = (query: Extract<IndexedStep, Step>): JSX.Element => {
    switch (query) {
      case "personal-information":
        return <PersonalInformation onSubmit={handleQueryUpdate} personId={user?.id} />;
      case "space-information":
        return <SpaceInfo onSubmit={(spaceId) => handleQueryUpdate({ spaceId })} />;
      case "suite-information":
        return <SuiteInformation onSubmit={handleQueryUpdate} spaceId={space_id} />;
      case "account-information":
        return <AccountInformation onSubmit={() => updateUserProfile()} spaceId={space_id} />;
      default:
        throw new Error(`${step} is invalid, step should be of either ${AllSteps.join(", ")}`);
    }
  };

  const getCurrentStep = (step: IndexedStep) => {
    const idx = AllSteps.findIndex((curr) => curr === step);

    return idx + 1;
  };

  type HandleQueryUpdate = typeof router.query;
  function handleQueryUpdate(args?: HandleQueryUpdate) {
    const idx = getCurrentStep(String(step));

    router.push({
      query: {
        ...router.query,
        ...args,
        step: AllSteps[idx],
      },
    });
  }

  /**
   * handle loading state better
   */
  if (loading)
    return (
      <>
        <div />
        <SEO title="Update Profile" />
      </>
    );

  if (!step)
    return (
      <div>
        <SEO title="Update Profile" />
        {/* 404 page if step is undefined*/}
      </div>
    );

  /**
   * default page step should be personal-information
   */

  const PAGE_TITLE = AllSteps.at(getCurrentStep(String(step)) - 1) ?? "Update Profile";

  return (
    <section className="space-y-4">
      <SEO title={`${formatWord(PAGE_TITLE)} | Suitemates`} />
      <header className="container py-10">
        <Image src={Logo} className="max-w-40" alt="Suitemates" priority />
      </header>
      <div className="pb-20">
        <div className="container">
          <div className="mx-auto max-w-[90%]">
            <StepProgressIndicator
              currentStep={getCurrentStep(String(step))}
              steps={AllSteps.length}
            >
              {AllSteps.map((opt, idx) => (
                <StepProgressIndicator.Item
                  key={opt}
                  className="flex flex-col items-center"
                  step={idx + 1}
                >
                  <span className="mt-2 hidden max-w-[10ch] text-center text-sm md:block">
                    {formatWord(opt)}
                  </span>
                </StepProgressIndicator.Item>
              ))}
            </StepProgressIndicator>
          </div>

          {renderStep(String(step) as Step)}
        </div>
      </div>

      {shouldVerify && (
        <div className="fixed inset-0 z-10 grid place-items-center bg-white/80">
          <div className="items-center space-y-4">
            <SpinnerLoader className="h-10 w-10" wrapperClass="w-fit mx-auto" />
            <div>Your profile is being updated...</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UpdateUserPage;
