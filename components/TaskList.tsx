import React from "react";
import { TaskCard } from "./TaskCard";
import { RefreshCcw, BookOpen, Target } from "lucide-react";

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

  if (Object.keys(grouped).length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {Object.entries(grouped).map(([topic, topicTasks]) => {
        const completedCount = topicTasks.filter((t) => t.completed).length;
        const percent = topicTasks.length ? (completedCount / topicTasks.length) * 100 : 0;
        
        return (
          <div key={topic} className="group">
            {/* Topic Header */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-t-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{topic}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Target className="w-4 h-4" />
                      <span>{topicTasks.length} tasks • {completedCount} completed</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Progress Circle */}
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-white/10"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-purple-400"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${percent}, 100`}
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{Math.round(percent)}%</span>
                    </div>
                  </div>
                  
                  {/* Regenerate Button */}
                  {onRegenerate && (
                    <button
                      type="button"
                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group/btn"
                      title="Regenerate tasks for this topic"
                      onClick={() => onRegenerate(topic)}
                    >
                      <RefreshCcw className="w-5 h-5 text-gray-400 group-hover/btn:text-white group-hover/btn:rotate-180 transition-all duration-300" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{completedCount}/{topicTasks.length} completed</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Tasks List */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 border-t-0 rounded-b-2xl p-6 space-y-3">
              {topicTasks.map((task, index) => (
                <div
                  key={task.id}
                  className="transform transition-all duration-300 hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <TaskCard
                    task={task}
                    onToggleCompleted={onToggleCompleted}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
