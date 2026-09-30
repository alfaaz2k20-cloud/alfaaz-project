import { z } from 'zod';

export const ParameterDefinitionSchema = z.object({
  name: z.string(),
  definition: z.string()
});

export const ParametersConfigSchema = z.record(
  z.string(),
  ParameterDefinitionSchema
);

export type ParameterDefinition = z.infer<typeof ParameterDefinitionSchema>;
export type ParametersConfig = z.infer<typeof ParametersConfigSchema>;
