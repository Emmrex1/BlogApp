import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendMessageMutation } from "@/redux/features/contactUs/ContactUsApi";
import { useNavigate } from "react-router-dom";

// Zod schema for validation
const FormSchema = z.object({
  name: z.string().min(2, { message: "Name is too short." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(2, { message: "Subject is too short." }),
  message: z
    .string()
    .min(6, { message: "Message must be at least 6 characters long." }),
});

const ContactUs = () => {
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data) => {
    console.log("Form data sent to API:", data);
    try {
      await sendMessage(data).unwrap();
      toast.success("Message sent successfully!");
      reset();
      navigate("/thankyuu");
    } catch (error) {
      console.error("Send message failed:", error);
      toast.error("Failed to send message.");
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        Contact Us
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" {...register("subject")} />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            rows="5"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
            {...register("message")}
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-8 py-3 rounded-md text-white font-semibold ${
            isLoading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
};

export default ContactUs;
