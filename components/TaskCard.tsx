import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, CheckCircle2, Circle } from "lucide-react";
import React from "react";
import type { Task } from "./TaskList";

export function TaskCard({
  task,
  onToggleCompleted,
  onEdit,
  onDelete,
}: {
  task: Task;
  onToggleCompleted?: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}) {
  return (
    <div
      className={`group relative flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-[1.01] ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      {/* Completion Status */}
      <button
        onClick={() => onToggleCompleted?.(task)}
        className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-all duration-200 group/check"
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.completed ? (
          <CheckCircle2 className="w-5 h-5 text-green-400 group-hover/check:text-green-300 transition-colors duration-200" />
        ) : (
          <Circle className="w-5 h-5 text-gray-400 group-hover/check:text-purple-400 transition-colors duration-200" />
        )}
      </button>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <span
          className={`block text-base font-medium transition-all duration-300 ${
            task.completed 
              ? "line-through text-gray-400" 
              : "text-white group-hover:text-purple-100"
          }`}
        >
          {task.title}
        </span>
        {task.createdAt && (
          <span className="text-xs text-gray-500 mt-1 block">
            Created {new Date(task.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEdit?.(task)}
          className="h-8 w-8 p-0 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group/edit"
          aria-label="Edit task"
        >
          <Pencil className="w-3.5 h-3.5 text-gray-400 group-hover/edit:text-blue-400 transition-colors duration-200" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDelete?.(task)}
          className="h-8 w-8 p-0 rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-200 group/delete"
          aria-label="Delete task"
        >
          <Trash2 className="w-3.5 h-3.5 text-gray-400 group-hover/delete:text-red-400 transition-colors duration-200" />
        </Button>
      </div>

      {/* Completion Gradient */}
      {task.completed && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl pointer-events-none" />
      )}

      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
