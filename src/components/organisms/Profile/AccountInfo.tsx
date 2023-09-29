import { AccountInoSchema } from "@/utils/schema/details";
import { type InferSchema } from "@/utils/schema/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Title,
  Text,
  Input,
  Button,
} from "@the_human_cipher/components-library";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  onSubmit(): void;
}

type Inputs = InferSchema<typeof AccountInoSchema>;

type Name = keyof Inputs;

/**
 * totally useless codes, just wanted to do some ts magic
 */
type Label = {
  [Key in Name]: Key extends `account${infer A}` ? `Account ${A}` : Key;
}[Name];

type Field = {
  name: Name;
  label: LoosenString<Label>;
  placeholder: LoosenString<`Please enter your ${Lowercase<Label>}`>;
};

const fields: Field[] = [
  {
    name: "accountName",
    label: "Account Name",
    placeholder: "Please enter your account name",
  },
  {
    name: "accountNumber",
    label: "Account Number",
    placeholder: "Please enter your account number",
  },
  {
    name: "routingNumber",
    label: "Routing Number",
    placeholder: "Please enter your routing number",
  },
];

const AccountInformation = ({ onSubmit }: Props) => {
  const { register, formState, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(AccountInoSchema),
    mode: "onChange",
  });

  const onFormSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmit();
  };

  const getFormError = (key: keyof Inputs) => {
    const err = formState.errors[key]?.message;
    return err ? String(err) : undefined;
  };

  return (
    <section className="mx-auto max-w-[960px]">
      <div className="my-4 mt-16">
        <Title weight="bold" level={2}>
          Perfect, Enter where payments will be sent
        </Title>
        <form className="md:ml-4" onSubmit={handleSubmit(onFormSubmit)}>
          <div>
            <Text className="my-5 block font-bold">Bank Details</Text>
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2 md:gap-y-10">
            {fields.map((field) => (
              <Input
                {...field}
                key={field.name}
                className="py-3"
                {...register(field.name)}
                hint={getFormError(field.name)}
                isError={Boolean(getFormError(field.name))}
              />
            ))}
          </div>
          <Button
            type="submit"
            className="mx-auto mt-10 block max-w-xs"
            primary
          >
            Finish
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AccountInformation;
