import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BrainCircuit,
  CheckCircle2,
  RefreshCw,
  BarChart3,
} from "lucide-react";

export default function Home() {
  const features = [
    { icon: <BrainCircuit className="w-5 h-5 mr-2 text-white" />, text: "AI-Generated Tasks" },
    { icon: <CheckCircle2 className="w-5 h-5 mr-2 text-green-400" />, text: "Progress Tracking" },
    { icon: <RefreshCw className="w-5 h-5 mr-2 text-orange-400" />, text: "Task Regeneration" },
    { icon: <BarChart3 className="w-5 h-5 mr-2 text-indigo-400" />, text: "Learning Analytics" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse [animation-delay:0.5s]"></div>
      </div>

      {/* Floating Nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-white">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-slide-up">
            Synapse<span className="text-purple-400">Learn</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed animate-slide-up [animation-delay:0.2s]">
            Transform any topic into <span className="text-purple-400 font-semibold">actionable learning tasks</span> with AI
          </p>

          {/* Description */}
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto animate-slide-up [animation-delay:0.3s]">
            Enter "Learn React" and get 5 beginner-friendly tasks instantly. Track progress, edit tasks, and master anything step by step.
          </p>

          {/* CTA */}
          <div className="animate-slide-up [animation-delay:0.5s]">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="text-lg cursor-pointer px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                Start Learning Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-16 animate-slide-up [animation-delay:0.7s]">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-default"
              >
                {feature.icon}
                <span className="text-sm font-medium text-gray-300">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-8 text-sm text-gray-400 animate-fade-in [animation-delay:1s]">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span>Powered by Artificial Intelligence</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse [animation-delay:0.5s]"></div>
            <span>Secure Authentication</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse [animation-delay:1s]"></div>
            <span>Fully Responsive</span>
          </div>
        </div>
      </div>
    </main>
  );
}
