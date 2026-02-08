"use client";

import { useState, useEffect } from "react";
import type { Prompt, PromptFormData } from "@/app/types/prompt";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";

interface PromptFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PromptFormData) => void;
  editingPrompt?: Prompt | null;
}

export function PromptForm({
  open,
  onOpenChange,
  onSubmit,
  editingPrompt,
}: PromptFormProps) {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    if (editingPrompt) {
      setTitle(editingPrompt.title);
      setPrompt(editingPrompt.prompt);
      setTag(editingPrompt.tag);
    } else {
      setTitle("");
      setPrompt("");
      setTag("");
    }
  }, [editingPrompt, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTag = tag.replace(/^#/, "").trim();
    onSubmit({ title: title.trim(), prompt: prompt.trim(), tag: cleanTag });
    onOpenChange(false);
  };

  const isEditing = !!editingPrompt;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Prompt" : "Create Prompt"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update your prompt details below."
              : "Add a new prompt to your collection."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Code Reviewer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write your prompt here..."
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag">Tag</Label>
            <Input
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="#coding"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Save Changes" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
