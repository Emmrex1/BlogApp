import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Form, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import InputField from "@/share/InputField/InputField";
import { useState } from "react";
import { useLoginUserMutation } from "@/redux/features/auth/AuthApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/AuthSlice"; 

const FormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  remember: z.boolean().optional(),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const dispatch = useDispatch(); 
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      dispatch(setUser({ user: response.user })); 
      toast.success("Login Successful");
      // console.log(response)
      navigate("/");
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-4xl font-extrabold text-center text-indigo-600 mb-2">
          Sign In
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Welcome back! Log in to your account
        </p>

        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
            <InputField
              label="Email"
              name="email"
              placeholder="you@example.com"
            />
            <InputField
              label="Password"
              name="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              rightIcon={
                <span
                  onClick={togglePassword}
                  className="text-sm text-blue-500 cursor-pointer hover:underline"
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              }
            />

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" {...methods.register("remember")} />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              disabled={loginLoading}
              type="submit"
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
            >
              {loginLoading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </FormProvider>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-4 text-sm text-gray-400">or continue with</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full border-gray-300"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full text-blue-600 border-gray-300"
          >
            <FaFacebook className="text-xl" />
            Continue with Facebook
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full text-gray-800 border-gray-300"
          >
            <FaGithub className="text-xl" />
            Continue with GitHub
          </Button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
