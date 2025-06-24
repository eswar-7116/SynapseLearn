import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-white to-slate-100 dark:from-black dark:to-slate-900">
      <h1 className="text-5xl font-bold mb-4 tracking-tight">SynapseLearn</h1>
      <p className="mb-8 text-xl text-gray-600 dark:text-gray-300 text-center max-w-xl">
        Learn by doing — AI-generated tasks for any topic.
      </p>
      <Link href="/dashboard">
        <Button size="lg" className="text-lg px-8 py-4">Get Started</Button>
      </Link>
    </main>
  );
}
