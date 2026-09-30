import { z } from 'zod';

export const InputTypeSchema = z.enum(['mouse', 'touch', 'keyboard', 'pen', 'assistive']);

export const BaseEventSchema = z.object({
  seq: z.number().int(),
  t_ms: z.number(),
  ts: z.string().datetime(),
  session_id: z.string().uuid(),
  screen: z.string(),
  game: z.string(),
  action: z.string(),
  input_type: InputTypeSchema,
  state: z.record(z.string(), z.any()),
  data: z.record(z.string(), z.any())
});

export const GameEventSchema = BaseEventSchema.extend({
  trial: z.string().optional()
});

export type BaseEvent = z.infer<typeof BaseEventSchema>;
export type GameEvent = z.infer<typeof GameEventSchema>;
