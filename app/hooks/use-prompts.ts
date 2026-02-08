"use client";

import { useState, useEffect, useCallback } from "react";
import type { Prompt, PromptFormData } from "@/app/types/prompt";
import {
  getPrompts,
  createPrompt,
  updatePrompt,
  deletePrompt,
} from "@/app/lib/storage";

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const reload = useCallback(() => {
    setPrompts(getPrompts());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const add = useCallback(
    (data: PromptFormData) => {
      createPrompt(data);
      reload();
    },
    [reload]
  );

  const update = useCallback(
    (id: string, data: PromptFormData) => {
      updatePrompt(id, data);
      reload();
    },
    [reload]
  );

  const remove = useCallback(
    (id: string) => {
      deletePrompt(id);
      reload();
    },
    [reload]
  );

  return { prompts, isLoaded, add, update, remove, reload };
}
