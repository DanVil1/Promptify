"use client";

import type { Prompt } from "@/app/types/prompt";
import { PromptCard } from "./prompt-card";

interface PromptListProps {
  prompts: Prompt[];
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
  onTagClick: (tag: string) => void;
}

export function PromptList({
  prompts,
  onEdit,
  onDelete,
  onTagClick,
}: PromptListProps) {
  if (prompts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No prompts yet.</p>
        <p className="text-muted-foreground text-sm mt-1">
          Click &quot;New Prompt&quot; to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 xl:columns-3 gap-4 space-y-4">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          onEdit={onEdit}
          onDelete={onDelete}
          onTagClick={onTagClick}
        />
      ))}
    </div>
  );
}
