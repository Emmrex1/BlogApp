import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { Form } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../../share/InputField/InputField";
import { toast } from "sonner";

const FormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    toast.success("Signed up successfully");
    // TODO: Send data to backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-4xl font-extrabold text-center text-indigo-600 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Join us and explore new possibilities
        </p>

        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
            <InputField
              label="Username"
              name="username"
              placeholder="Enter your username"
            />
            <InputField
              label="Email"
              name="email"
              placeholder="Enter your email"
            />
            <InputField
              label="Password"
              name="password"
              placeholder="Enter your password"
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

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
            >
              Sign Up
            </Button>
          </Form>
        </FormProvider>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-4 text-sm text-gray-400">or sign up with</span>
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
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
