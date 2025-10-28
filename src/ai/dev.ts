import { config } from 'dotenv';
config();

import { genkit } from 'genkit';
import { firebase } from '@genkit-ai/firebase';

import '@/ai/flows/summarize-team-feedback.ts';
import '@/ai/flows/ai-application-review.ts';

genkit({
  plugins: [
    firebase({
      projectId: process.env.GENKIT_FIREBASE_PROJECT_ID,
    }),
  ],
});
