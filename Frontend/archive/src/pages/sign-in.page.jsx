import { SignIn } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignIn />
    </main>
  );
}
