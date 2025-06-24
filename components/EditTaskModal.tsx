import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit3, Save, X } from "lucide-react";

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
      <DialogContent className="sm:max-w-md bg-slate-900/95 backdrop-blur-md border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20">
              <Edit3 className="w-5 h-5 text-purple-400" />
            </div>
            Edit Task
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Task Title
            </label>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-200"
                placeholder="Enter task description..."
                autoFocus
              />
            </div>
          </div>
          
          <DialogFooter className="gap-3 pt-4 border-t border-white/10">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={onCancel}
              className="px-6 py-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!title.trim()}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 will-change-transform hover:from-purple-700 hover:to-blue-700 border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
