
'use server';

import { z } from 'zod';
import { aiApplicationReview } from '@/ai/flows/ai-application-review';
import { getAdminFirestore } from '@/firebase/admin';

const formSchema = z.object({
  jobDescription: z.string(),
  coverLetter: z.string(),
  resume: z.instanceof(File),
});

export async function reviewApplicationAction(formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    const validatedData = formSchema.parse(data);

    const { jobDescription, coverLetter, resume } = validatedData;
    
    if (resume.type !== 'application/pdf') {
      return { success: false, error: 'Resume must be a PDF file.' };
    }

    const fileBuffer = await resume.arrayBuffer();
    const base64String = Buffer.from(fileBuffer).toString('base64');
    const resumeDataUri = `data:application/pdf;base64,${base64String}`;
    
    const result = await aiApplicationReview({
        jobDescription,
        coverLetter,
        resumeDataUri
    });

    return { success: true, data: result };

  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
        return { success: false, error: "Validation failed: " + error.errors.map(e => e.message).join(', ') };
    }
    return { success: false, error: 'An unexpected error occurred on the server.' };
  }
}


const vaultPassphraseSchema = z.string();

export async function checkVaultPassphrase(passphrase: string) {
  try {
    const validatedPassphrase = vaultPassphraseSchema.parse(passphrase);
    const correctPassphrase = "empire";

    if (validatedPassphrase === correctPassphrase) {
        return { success: true, error: null };
    } else {
        return { success: false, error: 'ACCESS DENIED' };
    }
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
