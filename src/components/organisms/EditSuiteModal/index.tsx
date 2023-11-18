import Icons from "@/assets/icons";
import SuiteInfoInputRow from "@/components/molecules/SuiteInfoInputRow";
import { cn } from "@/utils";
import { onFormError } from "@/utils/functions/react-hook-form";
import { SuiteInfoSchema } from "@/utils/schema/details";
import { InferSchema } from "@/utils/schema/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, Text } from "@the_human_cipher/components-library";
import { useRef } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

type ModalProps = React.ComponentProps<typeof Modal>;

interface EditSuiteModalProps extends ModalProps {
  suites: DbCreateSuite[];
}

type Inputs = InferSchema<typeof SuiteInfoSchema>;

const DefaultValues = {
  suite_cost: "",
  suite_number: "",
  suite_size: "",
  suite_type: { label: "", value: "" },
  timing: { label: "", value: "" },
};

export const EditSuiteModal = ({ suites, ...props }: EditSuiteModalProps) => {
  const cachedSuite = useRef(
    suites.map(({ suite_cost, suite_number, suite_size, suite_type, timing }) => ({
      suite_cost: String(suite_cost),
      suite_number,
      suite_size,
      suite_type: JSON.parse(suite_type),
      timing: JSON.parse(timing),
    }))
  );

  const { control, handleSubmit, register, formState } = useForm<Inputs>({
    resolver: zodResolver(SuiteInfoSchema),
    mode: "onChange",
    defaultValues: {
      suites: cachedSuite.current,
    },
  });

  const { fields, append, remove } = useFieldArray<Inputs>({
    control,
    name: "suites",
  });

  console.log(suites);

  const onFormSubmit: SubmitHandler<Inputs> = async () => {};

  return (
    <Modal {...props}>
      <Modal.Body enableBottomSheet className="md:max-w-[1100px]">
        <Modal.Title title="Make changes to the suites in this space" />
        <Modal.Content className="py-0 max-md:pb-10">
          <div className="">
            <form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
              <div className="pb-2">
                <Text className="">You can add as many as is available</Text>
              </div>
              <div className="rounded-2xl bg-[#F3F3F3] p-5 pt-8">
                <div className="relative">
                  <div className="space-y-10">
                    {fields.map((field, idx) => (
                      <div key={field.id}>
                        <SuiteInfoInputRow
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

              <div className="mx-auto mt-8 max-w-sm">
                <Button className="" type="submit" loading={formState.isSubmitting}>
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal>
  );
};
