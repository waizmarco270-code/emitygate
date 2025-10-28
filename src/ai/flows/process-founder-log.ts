
'use server';

/**
 * @fileOverview Processes a founder's log entry to extract insights.
 *
 * - processFounderLog - A function that analyzes the log entry.
 * - ProcessFounderLogInput - The input type for the function.
 * - ProcessFounderLogOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessFounderLogInputSchema = z.object({
  logEntry: z.string().describe("The founder's raw text entry for their journal."),
});
export type ProcessFounderLogInput = z.infer<typeof ProcessFounderLogInputSchema>;

const ProcessFounderLogOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the log entry.'),
  actionItems: z.array(z.string()).describe('A list of clear, actionable items extracted from the log.'),
  sentiment: z.string().describe('The overall sentiment of the entry (e.g., "Optimistic", "Concerned", "Strategic").'),
});
export type ProcessFounderLogOutput = z.infer<typeof ProcessFounderLogOutputSchema>;

export async function processFounderLog(input: ProcessFounderLogInput): Promise<ProcessFounderLogOutput> {
  return processFounderLogFlow(input);
}

const prompt = ai.definePrompt({
  name: 'processFounderLogPrompt',
  input: {schema: ProcessFounderLogInputSchema},
  output: {schema: ProcessFounderLogOutputSchema},
  prompt: `You are Kairos, an AI strategist and personal scribe to the Founder of a vast tech empire. Your purpose is to distill the Founder's raw thoughts into structured, actionable intelligence.

  Analyze the following log entry. Provide a brief summary, extract any explicit or implicit action items, and determine the overall sentiment.

  Log Entry:
  {{{logEntry}}}
  
  Your output must be a JSON object conforming to the specified schema.
  - The summary should be a few sentences.
  - Action items should be clear, concise, and start with a verb.
  - Sentiment should be a single, descriptive word.`,
});

const processFounderLogFlow = ai.defineFlow(
  {
    name: 'processFounderLogFlow',
    inputSchema: ProcessFounderLogInputSchema,
    outputSchema: ProcessFounderLogOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
