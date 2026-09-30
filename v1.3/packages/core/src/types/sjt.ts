import { z } from 'zod';

export const ParameterKeySchema = z.enum([
  'empathy',
  'conscientiousness',
  'collaborative_spirit',
  'emotional_agility',
  'curiosity',
  'creative_initiative',
  'motivation'
]);

export const SjtOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  keys: z.record(ParameterKeySchema, z.number().int().min(0).max(3))
});

export const SjtScenarioSchema = z.object({
  id: z.string(),
  act: z.number(),
  act_title: z.any().optional(),
  setup: z.string(),
  options: z.array(SjtOptionSchema).min(3)
});

export const SjtConfigSchema = z.object({
  sjt_version: z.string(),
  scenarios: z.array(SjtScenarioSchema)
});

export type SjtConfig = z.infer<typeof SjtConfigSchema>;
export type SjtOption = z.infer<typeof SjtOptionSchema>;
export type ParameterKey = z.infer<typeof ParameterKeySchema>;
