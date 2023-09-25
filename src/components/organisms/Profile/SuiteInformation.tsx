import SuiteInfoInputRow from "@/components/molecules/SuiteInfoInputRow";
import { InferSchema } from "@/utils/schema/helpers";
import { SuiteInfoSchema } from "@/utils/schema/details";
import { Button } from "@the_human_cipher/components-library";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

interface Props {
  onSubmit(): void;
}

type Inputs = InferSchema<typeof SuiteInfoSchema>;

const SuiteInformation = ({ onSubmit }: Props) => {
  const { control, register, handleSubmit } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "suiteInfo",
    }
  );

  const onFormSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        {fields.map((field) => (
          <SuiteInfoInputRow key={field.id} />
        ))}
        <Button type="button" onClick={append}>
          Add Field
        </Button>
      </div>
    </form>
  );
};

export default SuiteInformation;
