import { PaymentInfoSchema } from "@/utils/schema/details";
import { InferSchema } from "@/utils/schema/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Title,
  Text,
  Input,
  Button,
} from "@the_human_cipher/components-library";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  onSubmit(): void;
}

const fields = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Please enter your first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Please enter your last name",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "(999) 999-9999",
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "Davemariam@gmail.com",
    type: "email",
  },
  {
    name: "bio",
    label: "Bio",
    placeholder: "Tell us about your business",
    className: "md:col-span-2",
  },
];

type Inputs = InferSchema<typeof PaymentInfoSchema>;

const PaymentInformation = ({ onSubmit }: Props) => {
  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(PaymentInfoSchema),
  });

  const onFormSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmit();
  };

  const unWrapErrors = (key: keyof Inputs) => {
    const err = formState.errors[key]?.message;
    console.log(err);
    return err ? String(err) : undefined;
  };

  const assertError = (key: keyof Inputs): boolean => {
    return Boolean(formState.errors[key]?.message);
  };

  return (
    <section className="mx-auto max-w-[960px]">
      <form onSubmit={handleSubmit(onFormSubmit)} className="my-4 mt-16">
        <Title weight="bold" level={2}>
          Add payment information
        </Title>

        <div className="mx-auto mt-10 max-w-sm space-y-6">
          <Input
            className="!py-4"
            label="Card Number"
            placeholder="0000   0000   0000   0000"
            {...register("cardNumber")}
            isError={assertError("cardNumber")}
            hint={unWrapErrors("cardNumber")}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              className="!py-4 text-center"
              label="Expiry Date"
              placeholder="MM/YY"
              {...register("expiryDate")}
              isError={assertError("expiryDate")}
              hint={unWrapErrors("expiryDate")}
            />
            <Input
              className="!py-4 text-center"
              label="CVV"
              placeholder="•••"
              {...register("cvv")}
              isError={assertError("cvv")}
              hint={unWrapErrors("cvv")}
            />
          </div>
          <Input
            className="!py-4"
            label="Card Holders Name"
            placeholder="Please enter Name on Card"
            {...register("nameOfCard")}
            isError={assertError("nameOfCard")}
            hint={unWrapErrors("nameOfCard")}
          />
        </div>
        <Button type="submit" className="mx-auto mt-16 block max-w-sm" primary>
          Finish
        </Button>
      </form>
    </section>
  );
};

export default PaymentInformation;
