import { v4 as uuidv4 } from "uuid";
import type { Prompt, PromptFormData } from "@/app/types/prompt";

const STORAGE_KEY = "prompt-decker-prompts";

function read(): Prompt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Prompt[]) : [];
  } catch {
    return [];
  }
}

function write(prompts: Prompt[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

export function getPrompts(): Prompt[] {
  return read().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPromptById(id: string): Prompt | undefined {
  return read().find((p) => p.id === id);
}

export function createPrompt(data: PromptFormData): Prompt {
  const prompt: Prompt = {
    id: uuidv4(),
    ...data,
    createdAt: new Date().toISOString(),
  };
  const all = read();
  all.push(prompt);
  write(all);
  return prompt;
}

export function updatePrompt(
  id: string,
  data: PromptFormData
): Prompt | undefined {
  const all = read();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  all[idx] = { ...all[idx], ...data };
  write(all);
  return all[idx];
}

export function deletePrompt(id: string): boolean {
  const all = read();
  const filtered = all.filter((p) => p.id !== id);
  if (filtered.length === all.length) return false;
  write(filtered);
  return true;
}
