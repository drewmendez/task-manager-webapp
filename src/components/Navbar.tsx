import { auth } from "@/config/firebase";
import SignInDialog from "./SignInDialog";
import { useAuthState } from "react-firebase-hooks/auth";

import LogOut from "./LogOut";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const signedInUser = user?.email;

  return (
    <header className="fixed top-0 z-10 w-full border-b shadow-xl">
      <nav className="o container flex items-center justify-between py-5">
        <h1 className="text-2xl font-bold">TaskM</h1>
        {user ? (
          <div className="flex items-center gap-5">
            <p>
              Signed in as <span className="font-semibold">{signedInUser}</span>
            </p>
            <LogOut />
          </div>
        ) : (
          <SignInDialog />
        )}
      </nav>
    </header>
  );
}
