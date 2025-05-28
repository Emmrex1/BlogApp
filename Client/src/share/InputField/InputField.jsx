import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const InputField = ({ label, name, placeholder, type = "text", rightIcon }) => {
  const { control } = useFormContext();

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="relative">
            <input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              className={`w-full px-4 py-2 pr-16 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
            {rightIcon && (
              <div className="absolute inset-y-0 right-3 flex items-center text-sm cursor-pointer">
                {rightIcon}
              </div>
            )}
            {error && (
              <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default InputField;
