
import { Check, CheckCircle } from "lucide-react";
import React from "react";


interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-700">
      <CheckCircle className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
