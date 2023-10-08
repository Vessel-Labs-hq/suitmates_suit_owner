import Image from "next/image";
import Logo from "public/logoDark.png";
import { useRouter } from "next/router";
import { formatWord } from "@/utils";
import PersonalInformation from "@/components/organisms/Profile/PersonalInfo";
import SpaceInfo from "@/components/organisms/Profile/SpaceInfo";
import SuiteInformation from "@/components/organisms/Profile/SuiteInformation";
import AccountInformation from "@/components/organisms/Profile/AccountInfo";
import { useEffect, useState } from "react";
import { StepProgressIndicator } from "@the_human_cipher/components-library";

const AllSteps = [
  "personal-information",
  "space-information",
  "suite-information",
  "account-information",
] as const;

type Step = (typeof AllSteps)[number];

type IndexedStep = Step | (string & {});

const SigUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const step = router.query.step;

  useEffect(() => {
    setLoading(false);
  }, []);

  const renderStep = (query: Extract<IndexedStep, Step>): JSX.Element => {
    switch (query) {
      case "personal-information":
        return <PersonalInformation onSubmit={handleQueryUpdate} />;
      case "space-information":
        return <SpaceInfo onSubmit={handleQueryUpdate} />;
      case "suite-information":
        return <SuiteInformation onSubmit={handleQueryUpdate} />;
      case "account-information":
        return <AccountInformation onSubmit={() => console.log("Submitted")} />;
      default:
        throw new Error(`${step} is invalid, step should be of either ${AllSteps.join(", ")}`);
    }
  };

  const getCurrentStep = (step: IndexedStep) => {
    const idx = AllSteps.findIndex((curr) => curr === step);

    return idx + 1;
  };

  function handleQueryUpdate() {
    const idx = getCurrentStep(String(step));

    router.push({
      query: {
        step: AllSteps[idx],
      },
    });
  }

  /**
   * handle loading state better
   */
  if (loading) return <div />;

  if (!step) return <div>{/* 404 page if step is undefined*/}</div>;

  /**
   * default page step should be personal-information
   */

  return (
    <section className="space-y-4">
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
    </section>
  );
};

export default SigUpPage;
