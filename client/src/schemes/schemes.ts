import { z } from "zod";

export const taskFormScheme = z.object({
  title: z
    .string()
    .min(1, "Название обязательно")
    .max(100, "Слишком длинное название"),
  description: z
    .string()
    .min(1, "Описание обязательно")
    .max(500, "Описание слишком длинное"),
  project: z.string().min(1, "Выберите проект"),
  priority: z.enum(["Low", "Medium", "High"], {
    errorMap: () => ({ message: "Выберите приоритет" }),
  }),
  status: z.enum(["Выполнить", "В работе", "Готово"], {
    errorMap: () => ({ message: "Выберите статус" }),
  }),
  assignee: z.string().min(1, "Выберите исполнителя"),
});

export type TaskFormValues = z.infer<typeof taskFormScheme>;
