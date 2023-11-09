import SuiteInfoInputRow from "@/components/molecules/SuiteInfoInputRow";
import { InferSchema } from "@/utils/schema/helpers";
import { SuiteInfoSchema } from "@/utils/schema/details";
import { Button, Text, Title } from "@the_human_cipher/components-library";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Icons from "@/assets/icons";
import Alert from "@/utils/base/alerts";
import onBoardingService from "@/utils/apis/onboarding";
import { onFormError } from "@/utils/functions/react-hook-form";
import ChangeSuiteInfoRow from "./ChangeSuiteInfoRow";

interface Props {
  onSubmit(): void;
  url: string;
}

type Inputs = InferSchema<typeof SuiteInfoSchema>;

const DefaultValues = {
  suite_cost: "",
  suite_number: "",
  suite_size: "",
  suite_type: { label: "", value: "" },
  timing: { label: "", value: "" },
};

/**
 * guide on how to do multiple fields
 *
 * https://www.cluemediator.com/dynamic-form-with-react-hook-form-using-usefieldarray
 */
const ChangeSuiteInformation = ({ onSubmit, url }: Props) => {
  const { control, handleSubmit, register, formState } = useForm<Inputs>({
    resolver: zodResolver(SuiteInfoSchema),
    mode: "onChange",
    defaultValues: {
      suites: [DefaultValues],
    },
  });
  const { fields, append, remove } = useFieldArray<Inputs>({
    control,
    name: "suites",
  });

  const onFormSubmit: SubmitHandler<Inputs> = async (data) => {
    // if (spaceId) {
    //   try {
    //     const res = await onBoardingService.createSuite({
    //       spaceId,
    //       suites: data.suites,
    //     });
    //     if (res) {
    //       onSubmit();
    //     }
    //   } catch (error) {
    //     Alert.error(error);
    //   }
    // } else {
    //   Alert.error("Space Id is undefined, error creating Suite");
    // }
  };

  return (
    <div className="mx-auto my-4 mt-16 w-full pt-10">
      <form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
        <div className="ml-4 sm:ml-8">
          <Text className="my-5 block font-bold">Current Suite Occupied</Text>
        </div>
        <div className="rounded-2xl bg-[#F3F3F3] p-5 pt-8">
          <div className="relative">
            <div className="space-y-10 ">
              {fields.map((field, idx) => (
                <div key={field.id}>
                  <ChangeSuiteInfoRow
                    idx={idx}
                    register={register}
                    formState={formState}
                    control={control}
                  />
                  {idx > 0 && (
                    <button
                      type="button"
                      className="-mt-1 ml-auto block w-fit text-right text-xs text-red-600"
                      onClick={() => remove(idx)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>

      {/* second form */}
      <form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
        <div className="ml-4 sm:ml-8">
          <Text className="my-5 block font-bold">Current Suite Occupied</Text>
        </div>
        <div className="rounded-2xl bg-[#F3F3F3] p-5 pt-8">
          <div className="relative">
            <div className="space-y-10 ">
              {fields.map((field, idx) => (
                <div key={field.id}>
                  <ChangeSuiteInfoRow
                    idx={idx}
                    register={register}
                    formState={formState}
                    control={control}
                  />
                  {idx > 0 && (
                    <button
                      type="button"
                      className="-mt-1 ml-auto block w-fit text-right text-xs text-red-600"
                      onClick={() => remove(idx)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-sm">
          <Button className="" type="submit" loading={formState.isSubmitting}>
            Change Suite
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangeSuiteInformation;
