"use client";

import { useState, useMemo } from "react";
import { Plus, Search, Layers } from "lucide-react";
import { usePrompts } from "@/app/hooks/use-prompts";
import { PromptList } from "@/app/components/prompt/prompt-list";
import { PromptForm } from "@/app/components/prompt/prompt-form";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import type { Prompt, PromptFormData } from "@/app/types/prompt";

export default function HomePage() {
  const { prompts, isLoaded, add, update, remove } = usePrompts();

  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return prompts;
    const q = search.toLowerCase();
    return prompts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
    );
  }, [prompts, search]);

  const handleSubmit = (data: PromptFormData) => {
    if (editingPrompt) {
      update(editingPrompt.id, data);
    } else {
      add(data);
    }
    setEditingPrompt(null);
  };

  const handleEdit = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setFormOpen(true);
  };

  const handleTagClick = (tag: string) => {
    setSearch(tag);
  };

  const handleOpenChange = (open: boolean) => {
    setFormOpen(open);
    if (!open) setEditingPrompt(null);
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Layers className="h-8 w-8" />
          <h1 className="text-3xl font-bold tracking-tight">PromptDeck</h1>
        </div>
        <p className="text-muted-foreground">
          Your personal collection of AI prompts.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search prompts by title, content, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setFormOpen(true)} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          New Prompt
        </Button>
      </div>

      {/* Results count */}
      {search && (
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{search}&quot;
          <button
            className="ml-2 underline hover:text-foreground"
            onClick={() => setSearch("")}
          >
            Clear
          </button>
        </p>
      )}

      {/* Prompt Grid */}
      <PromptList
        prompts={filtered}
        onEdit={handleEdit}
        onDelete={remove}
        onTagClick={handleTagClick}
      />

      {/* Create / Edit Dialog */}
      <PromptForm
        open={formOpen}
        onOpenChange={handleOpenChange}
        onSubmit={handleSubmit}
        editingPrompt={editingPrompt}
      />
    </div>
  );
}
