export type Prompt = {
  id: string;
  title: string;
  prompt: string;
  tag: string;
  createdAt: string;
};

export type PromptFormData = Omit<Prompt, "id" | "createdAt">;
