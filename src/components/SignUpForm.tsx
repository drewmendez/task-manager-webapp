import { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { PasswordInput } from "./ui/password-input";
import { Button } from "./ui/button";

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm({
  setIsSignInView,
}: {
  setIsSignInView: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = useForm<SignUpForm>();

  const handleSignUp = async () => {
    try {
      const { email, password } = getValues();
      await createUserWithEmailAndPassword(auth, email, password);
      setIsSignInView(true);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("email", {
          type: "manual",
          message: "This email is already registered",
        });
      } else {
        console.error("Firebase error: ", error.code, error.message);
      }
    }
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(handleSignUp)}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && (
          <i className="text-xs text-red-500">{errors.email.message}</i>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          autoComplete="new-password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password should be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <i className="text-xs text-red-500">{errors.password.message}</i>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <PasswordInput
          id="confirm-password"
          autoComplete="new-password"
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (val: string) => {
              if (watch("password") != val) {
                return "Passwords must match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <i className="text-xs text-red-500">
            {errors.confirmPassword.message}
          </i>
        )}
      </div>
      <Button className="w-full">Sign Up</Button>
    </form>
  );
}
