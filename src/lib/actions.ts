
'use server';

import { z } from 'zod';
import { aiApplicationReview } from '@/ai/flows/ai-application-review';
import { getAdminFirestore, getAdminAuth } from '@/firebase/admin';
import type { UserProfile } from './types';
import fs from 'fs/promises';
import path from 'path';

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
    const correctPassphrase = "waizdev@vault";

    if (validatedPassphrase === correctPassphrase) {
        return { success: true, error: null };
    } else {
        return { success: false, error: 'ACCESS DENIED' };
    }
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

const updateRoleSchema = z.object({
  targetUserId: z.string(),
  role: z.enum(['founder', 'admin', 'user']),
  currentUserId: z.string(),
});

export async function updateUserRoleAction(data: {targetUserId: string, role: 'founder' | 'admin' | 'user', currentUserId: string}) {
  try {
    const { targetUserId, role, currentUserId } = updateRoleSchema.parse(data);
    const db = getAdminFirestore();

    // Verify the user making the request is the Founder
    const currentUserDoc = await db.collection('users').doc(currentUserId).get();
    const currentUserProfile = currentUserDoc.data() as UserProfile;
    if (!currentUserProfile || !currentUserProfile.isFounder) {
        throw new Error('Only the Founder can change roles.');
    }
    
    if (targetUserId === currentUserId && role !== 'founder') {
        throw new Error('The Founder cannot revoke their own Founder status.');
    }

    const targetUserRef = db.collection('users').doc(targetUserId);

    let newRoles = {
      isAdmin: false,
      isFounder: false,
    };

    if (role === 'admin') {
      newRoles.isAdmin = true;
    } else if (role === 'founder') {
      newRoles.isFounder = true;
    }
    
    await targetUserRef.update(newRoles);

    // Update custom claims for auth-based rules if needed in future
    await getAdminAuth().setCustomUserClaims(targetUserId, {
      isAdmin: newRoles.isAdmin,
      isFounder: newRoles.isFounder,
    });


    return { success: true, message: `User role updated to ${role}.` };
  } catch (error: any) {
    console.error('Role update failed:', error);
    return { success: false, error: error.message || 'An unexpected server error occurred.' };
  }
}

export async function getEnvContentAction(): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), '.env.local');
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error("Failed to read .env.local file:", error);
    return "Error: Could not read .env.local file. Ensure it exists in the project root.";
  }
}
