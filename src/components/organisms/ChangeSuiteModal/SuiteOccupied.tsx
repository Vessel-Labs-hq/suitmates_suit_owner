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
import SuiteOccupiedRow from "./SuiteOccupiedRow";
import { useEffect } from "react";

// interface Props {
//   onSubmit(): void;
//   spaceId: string | null;
// }

type Inputs = InferSchema<typeof SuiteInfoSchema>;

const DefaultValues = {
  suite_cost: "",
  suite_number: "",
  suite_size: "",
  suite_type: { label: "", value: "" },
  timing: { label: "", value: "" },
};
interface DbCreateSuite {
  // ... other properties
  suite_cost: string | number;
}
/**
 * guide on how to do multiple fields
 *
 * https://www.cluemediator.com/dynamic-form-with-react-hook-form-using-usefieldarray
 */
const SuiteOccupied = ({ userSuite }: ProfileProps) => {
  const { control, handleSubmit, register, formState, setValue } = useForm<Inputs>({
    resolver: zodResolver(SuiteInfoSchema),
    mode: "onChange",
    // defaultValues: {
    //   suites: userSuite?.space?.suites
    //     ? userSuite.space.suites.map((suite: DbCreateSuite) => ({
    //         ...DefaultValues,
    //         ...suite,
    //         suite_cost:
    //           typeof suite.suite_cost === "string"
    //             ? parseFloat(suite.suite_cost)
    //             : suite.suite_cost,
    //       }))
    //     : [DefaultValues],
    // },
  });

  // Use setValue to dynamically set the values after the form has been initialized

  const { fields } = useFieldArray<Inputs>({
    control,
    name: "suites",
  });

  return (
    <div className="mx-auto max-w-[1200px]">
      <form>
        <div className="rounded-2xl bg-[#F3F3F3] p-5 pt-8">
          <div className="relative">
            <div className="space-y-10 ">
              <span className="my-5 font-bold">Currently Occupied Suite</span>
              {fields.map((field, idx) => (
                <div key={field.id}>
                  <SuiteOccupiedRow
                    idx={idx}
                    register={register}
                    formState={formState}
                    control={control}
                  />
                  {/* {idx > 0 && (
                    <button
                      type="button"
                      className="-mt-1 ml-auto block w-fit text-right text-xs text-red-600"
                      onClick={() => remove(idx)}
                    >
                      Remove
                    </button>
                  )} */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SuiteOccupied;
