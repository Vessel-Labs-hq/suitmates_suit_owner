import Icons from "@/assets/icons";
import SuiteInfoInputRow from "@/components/molecules/SuiteInfoInputRow";
import onBoardingService from "@/utils/apis/onboarding";
import Alert from "@/utils/base/alerts";
import { onFormError } from "@/utils/functions/react-hook-form";
import { EditSuiteInfoSchema, SuiteInfoSchema } from "@/utils/schema/details";
import { InferSchema } from "@/utils/schema/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, Text } from "@the_human_cipher/components-library";
import { useEffect, useRef } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

type ModalProps = React.ComponentProps<typeof Modal>;

interface EditSuiteModalProps extends ModalProps {
  suites: DbCreateSuite[];
}

type Inputs = InferSchema<typeof SuiteInfoSchema>;
type InputsII = InferSchema<typeof EditSuiteInfoSchema>;

type SuitesRow = InputsII["suites"][number];

const DefaultValues = {
  id: "new-element",
  suite_cost: "",
  suite_number: "",
  suite_size: "",
  suite_type: { label: "", value: "" },
  timing: { label: "", value: "" },
};

const convertSuite = (suites: DbSuite[]) =>
  suites.map(({ suite_cost, suite_number, suite_size, suite_type, timing, id }) => ({
    suite_cost: String(suite_cost),
    suite_number,
    suite_size,
    suite_type: JSON.parse(suite_type),
    timing: JSON.parse(timing),
    id: String(id),
  }));

export const EditSuiteModal = ({ suites, ...props }: EditSuiteModalProps) => {
  const cachedSuite = useRef(convertSuite(suites));
  const queryClient = useQueryClient();
  const requestStatus = useRef(false);

  const { control, handleSubmit, register, formState, reset } = useForm<Inputs>({
    resolver: zodResolver(EditSuiteInfoSchema),
    mode: "onChange",
    defaultValues: {
      suites: cachedSuite.current,
    },
  });

  const { fields, append, remove } = useFieldArray<Inputs>({
    control,
    name: "suites",
  });

  const onFormSubmit: SubmitHandler<InputsII> = async (data) => {
    const { suites } = data;

    const sendRequest = async ({ id: suiteId, ...payload }: SuitesRow) => {
      try {
        await onBoardingService.updateSuite({
          data: payload,
          suiteId,
        });
      } catch (error) {
        requestStatus.current = true;
        Alert.error(`Error updating suite information for ${payload.suite_number}`);
      }
    };

    try {
      const res = await Promise.allSettled(suites.map(sendRequest));
      if (!requestStatus.current) {
        Alert.success("Suites Updated Successfully");
        queryClient.invalidateQueries({ queryKey: ["get-user-details"] });
      }
    } catch (error) {
      Alert.error("An error occurred while updating one or more suites");
      console.error("At least one request failed", error);
    } finally {
      requestStatus.current = false;
    }
  };

  useEffect(() => {
    const suiteII = convertSuite(suites);
    cachedSuite.current = suiteII;
    reset({
      suites: suiteII,
    });
  }, [suites]);

  return (
    <Modal {...props}>
      <Modal.Body enableBottomSheet className="pb-4 md:max-w-[1100px]">
        <Modal.Title title="Make changes to the suites in this space" />
        <Modal.Content className="py-0">
          <div className="pb-10">
            <form onSubmit={handleSubmit(onFormSubmit as any, onFormError)}>
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
                {false && (
                  <Button
                    type="button"
                    className="mt-4 flex max-w-[140px] items-center justify-center gap-4 bg-[#333333] max-sm:py-3 max-sm:text-sm"
                    onClick={() => append(DefaultValues)}
                  >
                    {Icons.Plus} Add Field
                  </Button>
                )}
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
