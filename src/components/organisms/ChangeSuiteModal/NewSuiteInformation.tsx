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
import NewSuiteRow from "./NewSuiteRow";

interface Props {
  //   onSubmit(): void;
  //   spaceId: string | null;
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
const NewSuiteInformation = () => {
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
    <div className="mx-auto max-w-[1200px]">
      <form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
        <div className="rounded-2xl bg-[#F3F3F3] p-5 pt-8">
          <div className="relative">
            <div className="space-y-10 ">
              <span className="my-5 font-bold">New Suite</span>
              {fields.map((field, idx) => (
                <div key={field.id}>
                  <NewSuiteRow
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
          <Button
            type="button"
            dark
            className="mt-4 flex max-w-[140px] items-center justify-center gap-4 bg-[#333333] max-sm:py-3 max-sm:text-sm"
            onClick={() => append(DefaultValues)}
          >
            {Icons.Plus} Add Field
          </Button>
        </div>

        <div className="mx-auto max-w-sm">
          <Button className="" type="submit" loading={formState.isSubmitting}>
            Change Suite
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewSuiteInformation;
