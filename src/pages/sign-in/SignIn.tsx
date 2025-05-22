import { useState } from "react";
import { Button } from "@/components/ui/button";
import SignRight from "./SignRight";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { UserLogin } from "@/types";
import { useLogin } from "@/hooks/admin/use-login";
import { cn } from "@/lib/utils";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: signIn } = useLogin();

  const onSubmit: SubmitHandler<UserLogin> = (data) => {
    // console.log(data);
    signIn(data);
  };

  return (
    <div className="flex min-h-screen bg-white p-4 w-full">
      <div className="grid grid-cols-2 w-full place-items-center">
        {/* Left */}
        <div className="flex flex-col items-center mb-10">
          <div className="">
            <h3 className="text-2xl font-semibold text-textColor">Sign In</h3>
            <p className="text-base text-descColor mt-2">
              Enter your email and password to sign in
            </p>
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col mt-10 gap-5 w-[432px]"
            >
              <div>
                <input
                  type="text"
                  {...register("username", {
                    required: "username is required",
                  })}
                  className={cn(
                    "inputs",
                    errors.username
                      ? "ring-red-500 focus:ring-red-500"
                      : "focus:ring-activeInput"
                  )}
                  placeholder="Username"
                />
                {errors.username && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.username.message as string}
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  autoComplete="off"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  className={cn(
                    "inputs pr-10",
                    errors.password
                      ? "ring-red-500 focus:ring-red-500"
                      : "focus:ring-activeInput"
                  )}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? (
                    <Eye className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {errors.password && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.password.message as string}
                  </span>
                )}
              </div>
              <Button
                type="submit"
                className="h-[47px] bg-mainBtnColor hover:bg-header/90 hoverEffect shadow-textColor mt-12 rounded-[8px] font-bold "
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>

        <SignRight />
      </div>
    </div>
  );
};

export default SignIn;
