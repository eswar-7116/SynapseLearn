import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <SignUp />
    </main>
  );
} 