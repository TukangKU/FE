/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { RegisterType, registerSchema, userRegister } from "@/utils/apis/auth";
import Logo from "@/assets/tukangku.svg";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ClientBlack from "@/assets/clientblack.svg";
import Pekerja from "@/assets/pekerjablack.svg";
import { useToast } from "@/components/ui/use-toast";
import CustomFormField from "@/components/custom-formfield";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repassword: "",
      
    },
  });

  async function onSubmit(data: RegisterType) {
    try {
      const result = await userRegister(data);
      toast({
        description: result.message,
      });
      navigate("/login");
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
      <div className="w-[40%] min-h-screen hidden lg:block">
        <div className="w-[40%] min-h-screen bg-auth-image bg-cover fixed hidden lg:block">
          <div className="w-[100%] min-h-screen bg-black/50 z-2 relative">
            <div className="flex flex-col p-6 justify-between font-bold text-white absolute w-full h-full">
              <img
                src={Logo}
                alt="Logo TukangKU"
                className="mx-auto pt-20 xl:w-44"
              />
              <div>
                <h1 className="text-2xl xl:text-4xl">Bebaskan Waktu Anda,</h1>
                <p className="text-md xl:text-xl">
                  Percayakan Urusan <br /> Perbaikan Kepada <br />
                  Kami!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 md:p-20 lg:p-0 lg:w-[50%]">
        <div className="flex flex-col items-center justify-center lg:flex-none lg:items-start">
          <img src={Logo} alt="Logo TukangKU" className="w-28 lg:hidden pt-6" />
          <h1 className="font-bold lg:mx-0 pt-6 lg:pt-10 text-2xl lg:text-4xl relative lg:after:content-[''] lg:after:bg-tukangku lg:after:h-[3px] lg:after:w-[110px] lg:after:left-0 lg:after:-bottom-[10px] lg:after:rounded-xl lg:after:absolute">
            Register
          </h1>
          <div className="h-[20px]"></div>
          <p>Silahkan pilih peran Anda</p>
        </div>
        <Form {...form}>
          <form
            className="space-y-6 pt-3 pb-10"
            data-testid="form-register"
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1">
                      <div className="flex flex-row gap-3 lg:gap-10">
                        <div className="w-[360px] h-[150px] lg:h-[180px] xl:h-[200px] border-2 border-black rounded-lg hover:border-tukangku">
                          <FormItem className="flex flex-col space-x-3 space-y-0 p-3">
                            <FormControl>
                              <RadioGroupItem value="client" />
                            </FormControl>
                            <FormLabel className="flex flex-col items-center justify-center font-bold text-lg lg:text-xl">
                              <img
                                src={ClientBlack}
                                alt="Client"
                                className="w-16 lg:w-24 pb-3"
                              />
                              <p>Client</p>
                            </FormLabel>
                          </FormItem>
                        </div>
                        <div className="w-[360px] h-[150px] lg:h-[180px] xl:h-[200px] border-2 border-black rounded-lg  hover:border-tukangku">
                          <FormItem className="flex flex-col space-x-3 space-y-0 p-3">
                            <FormControl>
                              <RadioGroupItem value="worker" />
                            </FormControl>
                            <FormLabel className="flex flex-col items-center justify-center font-bold text-lg lg:text-xl">
                              <img
                                src={Pekerja}
                                alt="Worker"
                                className="w-16 lg:w-24 pb-3"
                              />
                              <p>Worker</p>
                            </FormLabel>
                          </FormItem>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CustomFormField
              control={form.control}
              name="username"
              label="Username">
              {(field) => (
                <Input
                  data-testid="input-username"
                  placeholder="John Doe"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  {...field}
                />
              )}
            </CustomFormField>
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
            <CustomFormField
              control={form.control}
              name="repassword"
              label="Retype Password">
              {(field) => (
                <Input
                  placeholder="Retype Password"
                  type="password"
                  data-testid="input-repassword"
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
              onClick={() => navigate("/login")}>
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
