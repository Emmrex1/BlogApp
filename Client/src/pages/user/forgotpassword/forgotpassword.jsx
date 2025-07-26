import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MailIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useForgotPasswordMutation } from "@/redux/features/auth/AuthApi";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data.email).unwrap();
      toast.success("✅ Reset link sent! Check your email.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err?.data?.message || "❌ Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl space-y-5"
      >
        {/* Header */}
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Forgot Password
          </h1>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Enter your registered email. We’ll send a password reset link.
        </p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-5"
        >
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className={`w-full border px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                {...register("email")}
              />
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute right-3 top-2.5"
              >
                <MailIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </motion.div>
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-all duration-200 disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
            {isLoading ? "Sending..." : "Send Reset Link"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
