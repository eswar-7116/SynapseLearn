import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export function TaskAnalyticsCard({ tasks }: { tasks: { topic: string; completed: boolean }[] }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const topics = Array.from(new Set(tasks.map((t) => t.topic)));
  const totalTopics = topics.length;
  // Placeholder for streak
  // const longestStreak = 0;

  return (
    <Card className="w-full max-w-2xl mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{totalTopics}</span>
            <span className="text-xs text-gray-500">Topics</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{totalTasks}</span>
            <span className="text-xs text-gray-500">Total Tasks</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{completedTasks}</span>
            <span className="text-xs text-gray-500">Completed</span>
          </div>
          {/* <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{longestStreak}</span>
            <span className="text-xs text-gray-500">Longest Streak</span>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
} 