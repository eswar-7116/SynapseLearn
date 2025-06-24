"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { TaskList, Task } from "@/components/TaskList";
import { useEffect, useState } from "react";
import { EditTaskModal } from "@/components/EditTaskModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskAnalyticsCard } from "@/components/TaskAnalyticsCard";
import { Sparkles, Plus, Brain, Target } from "lucide-react";

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
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );

  async function fetchTasks() {
    const prevTasks = tasks;
    setLoading(true);
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (e: any) {
      console.error(e.message);
      setTasks(prevTasks);
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
    const prevTasks = tasks;
    setLoading(true);
    try {
      const res = await fetch("/api/generate-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      if (!res.ok) throw new Error("Failed to generate tasks");
      const newTasks = await res.json();
      setTasks((prev) => [...prev, ...newTasks]);
      setTopic("");
    } catch (e: any) {
      console.error(e.message);
      setTasks(prevTasks);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleCompleted(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    const prevTasks = tasks;
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));

    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: updatedTask.completed }),
      });
      if (!res.ok) throw new Error("Failed to update task");
    } catch (e: any) {
      console.error(e.message);
      setTasks(prevTasks);
      // Rollback on error
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    }
  }

  async function handleDelete(task: Task) {
    const prevTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t.id !== task.id));

    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");
    } catch (e: any) {
      console.error(e.message);
      setTasks(prevTasks);
      // Rollback
      setTasks(prevTasks);
    }
  }

  function handleEdit(task: Task) {
    setEditTask(task);
    setEditModalOpen(true);
  }

  async function handleEditSave(newTitle: string) {
    if (!editTask) return;
    const updatedTask = { ...editTask, title: newTitle };
    const prevTasks = [...tasks];
    setTasks((prev) =>
      prev.map((t) => (t.id === editTask.id ? updatedTask : t))
    );
    setEditModalOpen(false);
    setEditTask(null);

    try {
      const res = await fetch(`/api/tasks/${editTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!res.ok) throw new Error("Failed to update task");
    } catch (e: any) {
      console.error(e.message);
      setTasks(prevTasks);
      // Rollback
      setTasks(prevTasks);
    }
  }

  function handleEditCancel() {
    setEditModalOpen(false);
    setEditTask(null);
  }

  async function handleRegenerate(topic: string) {
    const prevTasks = tasks;
    setLoading(true);
    try {
      const res = await fetch("/api/generate-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      if (!res.ok) throw new Error("Failed to regenerate tasks");
      await fetchTasks();
    } catch (e: any) {
      console.error(e.message);
      setTasks(prevTasks);
    } finally {
      setLoading(false);
    }
  }

  // Filtering logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse [animation-delay:0.5s]"></div>
      </div>

      <div className="relative z-10 p-8 text-white">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Learning Dashboard
              </h1>
              <p className="text-gray-300 mt-1">
                Transform ideas into actionable learning paths
              </p>
            </div>
          </div>

          {/* Topic Generation Form */}
          <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 mb-8 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">
                Generate New Learning Path
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a topic (e.g., Learn React, Master Python, Study Machine Learning)"
                  className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 text-white placeholder-gray-400 transition-all duration-200"
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Target className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading || !topic.trim()}
                className="cursor-pointer px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Generating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Generate Tasks
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Analytics Card */}
          <TaskAnalyticsCard tasks={tasks} />

          {/* Filter Tabs */}
          <div className="mb-8">
            <Tabs
              value={filter}
              onValueChange={(v) => setFilter(v as typeof filter)}
            >
              <TabsList className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 p-1 rounded-xl">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-slate-700/80 data-[state=active]:text-white text-gray-300 rounded-lg px-6 py-2 transition-all duration-200"
                >
                  All Tasks
                </TabsTrigger>
                <TabsTrigger
                  value="incomplete"
                  className="data-[state=active]:bg-slate-700/80 data-[state=active]:text-white text-gray-300 rounded-lg px-6 py-2 transition-all duration-200"
                >
                  In Progress
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:bg-slate-700/80 data-[state=active]:text-white text-gray-300 rounded-lg px-6 py-2 transition-all duration-200"
                >
                  Completed
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Tasks List */}
          {tasks.length === 0 && !loading ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 flex items-center justify-center border border-purple-500/20">
                <Brain className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Ready to start learning?
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Enter any topic above and let AI generate personalized learning
                tasks to help you master new skills step by step.
              </p>
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onToggleCompleted={handleToggleCompleted}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onRegenerate={handleRegenerate}
            />
          )}
        </div>
      </div>

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
