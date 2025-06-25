import { z } from 'zod';

export const symptomSchema = z.object({
  painLevel: z.number().min(1).max(10),
  painLocations: z.array(z.string()).min(1, "Select at least one pain area"),
  additionalSymptoms: z.array(z.string()).optional(),
  notes: z.string().optional()
});

export const cycleSchema = z.object({
  startDate: z.date(),
  duration: z.number().min(3).max(10),
  intensity: z.number().min(1).max(5)
});