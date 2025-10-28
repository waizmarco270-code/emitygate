
'use server';

import { genkit } from 'genkit';
import { firebase } from '@genkit-ai/firebase';
import { googleAI } from '@genkit-ai/google-genai';
import { firebaseConfig } from '@/firebase/config';

// Import flows so that they are registered with Genkit.
import '@/ai/flows/summarize-team-feedback.ts';
import '@/ai/flows/ai-application-review.ts';

genkit({
  plugins: [
    googleAI(),
    firebase({
      projectId: firebaseConfig.projectId,
      // The following are required for local testing with Firestore.
      firestore: {
        host: '127.0.0.1',
        port: 8080,
        ssl: false,
      },
      auth: {
        host: '127.0.0.1',
        port: 9099,
      },
    }),
  ],
  // Log developer-friendly errors.
  dev: {
    logLevel: 'debug',
  },
  // Provide a temporary directory for local file storage.
  tmpDir: '/tmp/genkit',
});
