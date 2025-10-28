'use server';

/**
 * @fileOverview Summarizes team feedback using AI.
 *
 * - summarizeTeamFeedback - A function that summarizes the feedback.
 * - SummarizeTeamFeedbackInput - The input type for the summarizeTeamFeedback function.
 * - SummarizeTeamFeedbackOutput - The return type for the summarizeTeamFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTeamFeedbackInputSchema = z.object({
  feedback: z.string().describe('The feedback to summarize.'),
});
export type SummarizeTeamFeedbackInput = z.infer<typeof SummarizeTeamFeedbackInputSchema>;

const SummarizeTeamFeedbackOutputSchema = z.object({
  summary: z.string().describe('The summary of the feedback.'),
});
export type SummarizeTeamFeedbackOutput = z.infer<typeof SummarizeTeamFeedbackOutputSchema>;

export async function summarizeTeamFeedback(input: SummarizeTeamFeedbackInput): Promise<SummarizeTeamFeedbackOutput> {
  return summarizeTeamFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTeamFeedbackPrompt',
  input: {schema: SummarizeTeamFeedbackInputSchema},
  output: {schema: SummarizeTeamFeedbackOutputSchema},
  prompt: `You are an expert at summarizing feedback from a team.

  Summarize the following feedback:

  {{{feedback}}}`,
});

const summarizeTeamFeedbackFlow = ai.defineFlow(
  {
    name: 'summarizeTeamFeedbackFlow',
    inputSchema: SummarizeTeamFeedbackInputSchema,
    outputSchema: SummarizeTeamFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
