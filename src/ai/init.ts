import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// This file is not marked with 'use server' and can be safely
// imported by other server-side code.
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  model: 'googleai/gemini-2.5-flash',
  dev: {
    logLevel: 'debug',
  },
  tmpDir: '/tmp/genkit',
});
