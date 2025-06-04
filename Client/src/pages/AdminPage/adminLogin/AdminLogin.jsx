import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, ArrowLeft } from "lucide-react";
import axios from "axios";
import { setAdmin } from "@/redux/features/auth/AdminAuthSlice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin, token } = useSelector((state) => state.adminAuth);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (admin && token) {
      navigate("/emmrexadmin/dashboard", { replace: true });
    }
  }, [admin, token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4005/api/auth/admin-login",
        data
      );
      const { user, token } = response.data;

      if (user.role !== "admin") {
        toast.error("You are not authorized as admin.");
        return;
      }

      dispatch(setAdmin({ admin: user, token }));

      toast.success("Welcome, Admin!");
      navigate("/emmrexadmin/dashboard");
    } catch (error) {
      toast.error("Invalid admin credentials.");
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
            Sign In to <span className="text-blue-600">Emmrex Blog App AdminPage</span>
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
              <button type="button" className="text-sm text-blue-600">
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <Button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Eye className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
