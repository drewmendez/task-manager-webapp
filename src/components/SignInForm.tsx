import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/config/firebase";

import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { PasswordInput } from "./ui/password-input";
import { Button } from "./ui/button";

interface SignUpForm {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpForm>();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = async () => {
    try {
      const { email, password } = getValues();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="grid gap-5" onSubmit={handleSubmit(handleSignIn)}>
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
            {...register("password", { required: "This field is required" })}
          />
          {errors.password && (
            <i className="text-xs text-red-500">{errors.password.message}</i>
          )}
        </div>
        <Button className="w-full">Sign In</Button>
      </form>
      <p className="text-center text-sm">or sign in with:</p>
      <Button variant="secondary" onClick={signInWithGoogle}>
        {" "}
        <img
          src="https://w7.pngwing.com/pngs/989/129/png-transparent-google-logo-google-search-meng-meng-company-text-logo-thumbnail.png"
          className="size-9"
        />{" "}
        Google
      </Button>
    </>
  );
}
