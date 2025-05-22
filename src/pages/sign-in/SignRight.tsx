import loginBg from "@/assets/images/login.jpg";

const SignRight = () => {
  return (
    <div className="relative flex flex-col items-center justify-center rounded-md overflow-hidden w-[calc(100%-2rem)] h-[calc(100vh-2rem)]">
      <img
        src={loginBg}
        alt="Login Background"
        className="w-full h-full object-cover"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-login-gradient opacity-70"></div>

      <div className="absolute z-10 text-center px-6">
        <h2 className="text-2xl font-bold text-white">Welcome back!</h2>
        <p className="text-base text-white mt-2">
          The easier writing seems, the more effort the writer puts into the
          process.
        </p>
      </div>
    </div>
  );
};

export default SignRight;
