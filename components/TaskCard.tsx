import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2 } from "lucide-react";
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
      className={`flex items-center gap-4 p-4 rounded shadow bg-white dark:bg-slate-800 transition-opacity border border-gray-200 dark:border-slate-700 ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggleCompleted?.(task)}
        className="mr-2"
      />
      <span
        className={`flex-1 text-lg ${task.completed ? "line-through text-gray-400" : ""}`}
      >
        {task.title}
      </span>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => onEdit?.(task)}
        aria-label="Edit task"
      >
        <Pencil className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => onDelete?.(task)}
        aria-label="Delete task"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </Button>
    </div>
  );
} 