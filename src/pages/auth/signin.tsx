import { Button, Input } from "@the_human_cipher/components-library";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import Banner from "image/loginBanner.png";
import Logo from "public/logoDark.png";
import { LoginSchema } from "@/utils/schema/login";
import Link from "next/link";
import authService from "@/utils/apis/auth";
import Alert from "@/utils/base/alerts";

type Inputs = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<Inputs>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const { callbackUrl } = router.query;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await authService.login(data);

      if (res.onboarded) {
        if (!callbackUrl) return router.push("/");

        return router.push(String(callbackUrl));
      }

      return router.push("/user/profile/update?step=personal-information");
    } catch (error) {
      Alert.error(error);
    }
  };

  const unWrapErrors = (key: keyof Inputs) => {
    return formState.errors[key]?.message;
  };

  const assertError = (key: keyof Inputs): boolean => {
    return Boolean(formState.errors[key]?.message);
  };

  const { isSubmitting } = formState;

  return (
    <section className="grid min-h-screen grid-flow-row-dense grid-cols-1 grid-rows-1 md:grid-cols-7">
      <div className="col-span-4 mx-auto my-auto flex h-full w-full flex-col items-center justify-start px-3 pb-5 pt-14">
        <Image
          src={Logo}
          className="ml-6 max-w-[200px] self-start justify-self-start"
          alt=""
          priority
        />
        <div className="my-auto w-full max-w-screen-xs">
          <div className="mb-8 text-left text-custom-black">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Login</h1>
            <p className="sm:text-xl">Fill the form to login</p>
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
                hint={unWrapErrors("password")}
              />
              <div className="text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="underline">
                  {" "}
                  SignUp
                </Link>
              </div>
              <div>
                <Button type="submit" loading={isSubmitting}>
                  Login
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <header
        style={{ backgroundImage: `url(${Banner.src})` }}
        className="relative hidden h-full items-end justify-center bg-cover bg-center md:col-span-3 md:flex"
      >
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.61) 41.8%, rgba(0, 0, 0, 0.61) 100%)",
          }}
          className="absolute inset-0"
        />
      </header>
    </section>
  );
};

export default LoginPage;
