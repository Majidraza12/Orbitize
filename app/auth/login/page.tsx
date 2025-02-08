"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);

      const response = await login(formDataToSend);

      if (response.status === "Success") {
        toast.success("Logged in successfully");
        router.push("/dashboard");
      } else {
        toast.error(response.status || "Login failed");
      }
    } catch (error) {
      toast.error(error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex mt-20 items-center justify-center p-4">
      <div className="w-[30%] max-w-sm space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">Login to continue</p>
        </div>
        <div className="flex gap-2 flex-col">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <label htmlFor="password" className="text-sm">
            Password
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
          <Button
            className="mx-auto mt-4"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin" /> : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
}
