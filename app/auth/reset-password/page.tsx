"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { resetPassword } from "@/actions/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleResetPassword = async () => {
    if (!formData.confirmPassword || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("password", formData.password);
      formDataToSend.append("confirmPassword", formData.confirmPassword);
      const response = await resetPassword(
        formDataToSend,
        searchParams.get("code") as string
      );
      if (response.status === "Success") {
        toast.success("Password reseted successfully");
        router.push("/auth/login");
      } else {
        toast.error(response.status || "Password reset failed");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Password reset failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex mt-20 items-center justify-center p-4">
      <div className="w-[30%] max-w-sm space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
        </div>
        <div className="flex gap-2 flex-col">
          <label htmlFor="password" className="text-sm">
            New Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <label htmlFor="confirmPassword" className="text-sm">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Button
            className="mx-auto mt-4"
            onClick={handleResetPassword}
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin" /> : "Reset Password"}
          </Button>
        </div>
      </div>
    </div>
  );
}
