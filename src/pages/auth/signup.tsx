import { Button, Input } from "@the_human_cipher/components-library";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { useEffect } from "react";
import Link from "next/link";

import Banner from "image/loginBanner.png";
import Logo from "public/logoDark.png";
import { AiFillCheckCircle } from "react-icons/ai";
import { LoginSchema } from "@/utils/schema/login";
import { useSignup } from "@/utils/hooks/auth";


type Inputs = z.infer<typeof LoginSchema>;

const SignUp = () => {
  const { mutate, status, error, isError } = useSignup()
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<Inputs>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      mutate(data)
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  };
  useEffect(() => {
    if (status === "error") {
      toast.error((error as AxiosError).message);
    }

    if (status === "success") {
      toast.success("Sign up successful");
      router.push("/auth/login");
    }
  }, [ status, error ])


  const unWrapErrors = (key: keyof Inputs) => {
    return formState.errors[ key ]?.message;
  };

  const assertError = (key: keyof Inputs): boolean => {
    return Boolean(formState.errors[ key ]?.message);
  };

  return (
    <section className="min-h-screen grid grid-flow-row-dense grid-cols-1 grid-rows-1 md:grid-cols-6">
      <div className="flex flex-col items-center justify-start h-full w-full col-span-4 mx-auto my-auto px-3 pb-5 pt-14">
        <Image
          src={Logo}
          className="ml-6 max-w-[200px] justify-self-start self-start"
          alt=""
          priority
        />
        <div className="max-w-screen-xs w-full my-auto">
          <div className="text-left text-custom-black mb-8">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Sign Up</h1>
            <p className="sm:text-xl">Fill the form to sign up </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-custom-black">
            <Input
              label="Email"
              placeholder="Please enter your email"
              type="text"
              {...register("email")}
              isError={assertError("email")}
              hint={unWrapErrors("email")}
            />
            <div className="space-y-6">
              <Input
                label="Password"
                placeholder="Please enter Password"
                type="password"
                {...register("password")}
                isError={assertError("password")}
                hint={unWrapErrors("password") || "Must be 8 characters contain at least one uppercase and digit "}
              />
              <div className="text-sm">
                Already have an account?
                <Link href="/auth/login" className="underline">
                  Login
                </Link>
              </div>
              <div>
                <Button primary>Login</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <header
        style={{ backgroundImage: `url(${ Banner.src })` }}
        className="hidden md:col-span-2 h-full items-end justify-center bg-cover bg-center md:flex"
      >
      </header>
    </section>
  );
};

export default SignUp;
