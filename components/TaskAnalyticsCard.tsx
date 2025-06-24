import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { BookOpen, Target, CheckCircle, TrendingUp } from "lucide-react";

export function TaskAnalyticsCard({ tasks }: { tasks: { topic: string; completed: boolean }[] }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const topics = Array.from(new Set(tasks.map((t) => t.topic)));
  const totalTopics = topics.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      icon: BookOpen,
      value: totalTopics,
      label: "Learning Topics",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/20",
    },
    {
      icon: Target,
      value: totalTasks,
      label: "Total Tasks",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/20",
    },
    {
      icon: CheckCircle,
      value: completedTasks,
      label: "Completed",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/20",
    },
    {
      icon: TrendingUp,
      value: `${completionRate}%`,
      label: "Success Rate",
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-500/20",
    },
  ];

  return (
    <div className="w-full max-w-6xl mb-8">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20">
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">Learning Analytics</h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
                
                {/* Progress indicator for completion rate */}
                {stat.label === "Success Rate" && totalTasks > 0 && (
                  <div className="mt-3">
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
                        style={{ width: `${completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {totalTasks > 0 && (
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Keep up the great work!</p>
                <p className="text-gray-400 text-sm">
                  You've completed {completedTasks} out of {totalTasks} tasks across {totalTopics} topics.
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                  {completionRate}%
                </div>
                <div className="text-xs text-gray-400">Complete</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
