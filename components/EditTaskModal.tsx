import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function EditTaskModal({ open, onOpenChange, task, onSave, onCancel }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: { title: string } | null;
  onSave: (title: string) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = React.useState(task?.title || "");

  React.useEffect(() => {
    setTitle(task?.title || "");
  }, [task]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim()) {
      onSave(title.trim());
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900"
            placeholder="Task title"
            autoFocus
          />
          <DialogFooter className="gap-2">
            <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
            <Button type="submit" disabled={!title.trim()}>Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 