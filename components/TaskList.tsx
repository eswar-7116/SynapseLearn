import React from "react";
import { TaskCard } from "./TaskCard";
import { ProgressBar } from "./ProgressBar";
import { RefreshCcw } from "lucide-react";

export type Task = {
  id: string;
  userId: string;
  title: string;
  topic: string;
  completed: boolean;
  createdAt: string;
};

export function TaskList({
  tasks,
  onToggleCompleted,
  onEdit,
  onDelete,
  onRegenerate,
}: {
  tasks: Task[];
  onToggleCompleted?: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onRegenerate?: (topic: string) => void;
}) {
  // Group tasks by topic
  const grouped = tasks.reduce<Record<string, Task[]>>((acc, task) => {
    if (!acc[task.topic]) acc[task.topic] = [];
    acc[task.topic].push(task);
    return acc;
  }, {});

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      {Object.entries(grouped).map(([topic, topicTasks]) => {
        const completedCount = topicTasks.filter((t) => t.completed).length;
        const percent = topicTasks.length ? (completedCount / topicTasks.length) * 100 : 0;
        return (
          <div key={topic} className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold">{topic}</h2>
                {onRegenerate && (
                  <button
                    type="button"
                    className="ml-2 text-xl hover:rotate-90 transition-transform"
                    title="Regenerate tasks for this topic"
                    onClick={() => onRegenerate(topic)}
                  >
                    <RefreshCcw className="w-4 h-4 cursor-pointer" />
                  </button>
                )}
              </div>
              <ProgressBar percent={percent} />
            </div>
            <ul className="space-y-2">
              {topicTasks.map((task) => (
                <li key={task.id}>
                  <TaskCard
                    task={task}
                    onToggleCompleted={onToggleCompleted}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
} 