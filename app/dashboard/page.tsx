'use client';

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { TaskList, Task } from '@/components/TaskList';
import { useEffect, useState } from 'react';
import { EditTaskModal } from '@/components/EditTaskModal';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TaskAnalyticsCard } from '@/components/TaskAnalyticsCard';

export default function DashboardPage() {
  return (
    <>
      <SignedIn>
        <DashboardContent />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

function DashboardContent() {
  const [topic, setTopic] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  async function fetchTasks() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      if (!res.ok) throw new Error("Failed to generate tasks");
      // The backend returns the saved tasks for this topic
      const newTasks = await res.json();
      setTasks((prev) => [...prev, ...newTasks]);
      setTopic("");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleCompleted(task: Task) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      await fetchTasks();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(task: Task) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");
      await fetchTasks();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(task: Task) {
    setEditTask(task);
    setEditModalOpen(true);
  }

  async function handleEditSave(newTitle: string) {
    if (!editTask) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/tasks/${editTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      setEditModalOpen(false);
      setEditTask(null);
      await fetchTasks();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleEditCancel() {
    setEditModalOpen(false);
    setEditTask(null);
  }

  async function handleRegenerate(topic: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      if (!res.ok) throw new Error("Failed to regenerate tasks");
      await fetchTasks();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Filtering logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <main className="flex flex-col items-center min-h-screen p-8 bg-gradient-to-b from-white to-slate-100 dark:from-black dark:to-slate-900">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-xl mb-8">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., Learn Python)"
          className="flex-1 px-4 py-2 rounded border border-gray-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900"
          disabled={loading}
        />
        <Button type="submit" disabled={loading || !topic.trim()}>
          {loading ? "Loading..." : "Generate Tasks"}
        </Button>
      </form>
      <TaskAnalyticsCard tasks={tasks} />
      <Tabs value={filter} onValueChange={v => setFilter(v as typeof filter)} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
        </TabsList>
      </Tabs>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <TaskList
        tasks={filteredTasks}
        onToggleCompleted={handleToggleCompleted}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onRegenerate={handleRegenerate}
      />
      <EditTaskModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        task={editTask}
        onSave={handleEditSave}
        onCancel={handleEditCancel}
      />
    </main>
  );
} 