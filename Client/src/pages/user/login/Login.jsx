
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, ArrowLeft } from "lucide-react";
import { useLoginUserMutation } from "@/redux/features/auth/AuthApi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "@/redux/features/auth/AuthSlice";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub} from "react-icons/fa";
import { toast } from "sonner";


const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();

      if (!response?.user) {
        throw new Error("User data missing from response");
      }

      dispatch(setUser({ user: response.user }));
      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/");
      }, 300); 
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.data?.message || error.message || "Login failed");
    }
  };
  
  

  return (
    <div className=" min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg p-8 space-y-6">
        <div className="flex items-center space-x-3 mb-8">
          <Link to="/">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">
            Sign In to <span className="text-blue-600">Emmrex Blog App</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Eye className="h-4 w-4 text-gray-400" />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loginLoading}>
            {loginLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/register">
              <button className="text-blue-600 hover:underline">Sign Up</button>
            </Link>
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="text-center font-medium text-gray-600">
            Continue with
          </h4>
          <div className="flex flex-row items-center justify-center gap-3">
            <button className="border border-gray-300 py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100">
              <FcGoogle className="text-xl" />
            </button>
            <button className="border border-gray-300 py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100">
              <FaFacebook className="text-xl text-blue-600" />
            </button>
            <button className="border border-gray-300 py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100">
              <FaGithub className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
