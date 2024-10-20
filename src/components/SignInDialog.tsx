import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function SignInDialog() {
  const [isSignInView, setIsSignInView] = useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onCloseAutoFocus={() => {
          setIsSignInView(true);
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-center">TaskM</DialogTitle>
          <DialogDescription className="text-center">
            Sign in to continue
          </DialogDescription>
        </DialogHeader>
        {isSignInView ? (
          <SignInForm />
        ) : (
          <SignUpForm setIsSignInView={setIsSignInView} />
        )}

        <div className="flex gap-1 justify-self-center">
          {isSignInView && <p className="text-sm">No account yet?</p>}

          <button
            className="text-sm underline transition hover:text-slate-400"
            onClick={() => setIsSignInView(!isSignInView)}
          >
            {isSignInView ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
