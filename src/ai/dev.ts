'use server';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Initialize Genkit and register flows.
// This file is used by the Genkit development server.
genkit({
  plugins: [
    googleAI(),
  ],
  model: 'googleai/gemini-2.5-flash',
  dev: {
    logLevel: 'debug',
  },
  tmpDir: '/tmp/genkit',
});


// Import flows so that they are registered with Genkit.
import '@/ai/flows/summarize-team-feedback.ts';
import '@/ai/flows/ai-application-review.ts';
import '@/ai/flows/process-founder-log.ts';
