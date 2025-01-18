"use client";

import { signUp } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //handle signUp function
  const handleSignup = async () => {
    //form validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("confirmPassword", formData.confirmPassword);
    setIsLoading(true);
    const result = await signUp(formDataToSend);
    setIsLoading(false);
    if (result.status === "error") {
      alert(result.status);
    } else {
      console.log(result.data);
      alert("Sign up successful");
      redirect("/auth/login");
    }
  };
  return (
    <div className="flex mt-20 items-center justify-center p-4">
      <div className="w-[30%] max-w-sm space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to our platform!</h1>
          <p className="text-muted-foreground">Sign up to get started</p>
        </div>
        <div className="flex gap-2 flex-col">
          <label htmlFor="username" className="text-sm">Username</label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <label htmlFor="email" className="text-sm">Email</label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <label htmlFor="password" className="text-sm">Password</label>
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
          <label htmlFor="confirmPassword" className="text-sm">Confirm Password</label>
          <div className="relative">
            <Input
              id="password"
              name="password"
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
          <Button className="mx-auto mt-4" onClick={handleSignup}>
            {isLoading ? (
              <p className="animate-pulse">Loading...</p>
            ) : (
              <p>Sign up</p>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
