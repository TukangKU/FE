/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { LoginType, loginSchema, userLogin } from "@/utils/apis/auth";
import Logo from "@/assets/tukangku.svg";
import { useToken } from "@/utils/contexts/token";
import { useToast } from "@/components/ui/use-toast";
import CustomFormField from "@/components/custom-formfield";

const Login = () => {
  const { changeToken, changeRole, changeId } = useToken();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginType) {
    try {
      const result = await userLogin(data);
      changeToken(result.data.token);
      changeRole(result.data.role)
      changeId(result.data.id)
      console.log("role", result.data.role)
      toast({
        description: "Selamat datang kembali di TukangKU",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <div className="lg:flex lg:flex-row lg:gap-10 font-poppins">
      <div className="w-[40%] min-h-screen bg-auth-image bg-cover hidden lg:block">
        <div className="w-full bg-black/50 z-2 h-full relative">
          <div className="flex flex-col p-6 justify-between font-bold text-white absolute w-full h-full">
            <img
              src={Logo}
              alt="Logo TukangKU"
              className="mx-auto pt-20 xl:w-44"
            />
            <div className="">
              <h1 className="text-2xl xl:text-4xl">Bebaskan Waktu Anda,</h1>
              <p className="text-md xl:text-xl">
                Percayakan Urusan <br /> Perbaikan Kepada <br />
                Kami!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 md:p-20 lg:p-0 lg:w-[50%]">
        <div className="flex flex-col items-center justify-center lg:flex-none lg:items-start">
          <img src={Logo} alt="Logo TukangKU" className="w-28 lg:hidden pt-6" />
          <h1 className="font-bold lg:mx-0 pt-6 lg:pt-16 text-2xl lg:text-4xl relative lg:after:content-[''] lg:after:bg-tukangku lg:after:h-[3px] lg:after:w-[80px] lg:after:left-0 lg:after:-bottom-[10px] lg:after:rounded-xl lg:after:absolute">
            Login
          </h1>
          <div className="h-[40px]"></div>
          <p>Masuk sekarang dan nikmati layanan kami</p>
        </div>
        <Form {...form}>
          <form
            className="space-y-6 pt-10"
            data-testid="form-login"
            onSubmit={form.handleSubmit(onSubmit)}>
            <CustomFormField control={form.control} name="email" label="Email">
              {(field) => (
                <Input
                  data-testid="input-email"
                  placeholder="name@mail.com"
                  type="email"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  {...field}
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="password"
              label="Password">
              {(field) => (
                <Input
                  data-testid="input-password"
                  placeholder="Password"
                  type="password"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  {...field}
                />
              )}
            </CustomFormField>
            <Button
              data-testid="btn-submit"
              type="submit"
              className="bg-tukangku hover:bg-tukangku/80 w-[100%] lg:text-lg"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Submit"
              )}
            </Button>
            <div className="flex justify-between items-center">
              <div className="bg-black w-[42%] h-[0.5px]"></div>
              <p>Atau</p>
              <div className="bg-black w-[42%] h-[0.5px]"></div>
            </div>
            <Button
              className="w-full lg:text-lg"
              onClick={() => navigate("/register")}>
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
