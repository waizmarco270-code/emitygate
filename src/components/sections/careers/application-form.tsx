'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { reviewApplicationAction } from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const formSchema = z.object({
  jobDescription: z.string().min(50, 'Job description must be at least 50 characters.'),
  coverLetter: z.string().min(100, 'Cover letter must be at least 100 characters.'),
  resume: z.any().refine(file => file?.length === 1, 'Resume is required.'),
});

type AIReviewResult = {
  feedback: string;
  overallScore: number;
} | null;

const defaultJobDescription = "Senior Frontend Engineer at EmityGate\n\nResponsibilities:\n- Develop and maintain the user interface for our next-generation applications.\n- Collaborate with product and design teams to create a world-class user experience.\n- Write clean, efficient, and maintainable code using Next.js, React, and Tailwind CSS.\n\nQualifications:\n- 5+ years of experience in frontend development.\n- Expertise in React and its ecosystem.\n- Strong understanding of modern web technologies and best practices.";

export default function ApplicationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AIReviewResult>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: defaultJobDescription,
      coverLetter: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('jobDescription', values.jobDescription);
    formData.append('coverLetter', values.coverLetter);
    formData.append('resume', values.resume[0]);

    const response = await reviewApplicationAction(formData);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      setError(response.error || 'An unknown error occurred.');
    }
    setIsLoading(false);
  };
  
  const scoreColor = (score: number) => {
    if (score > 85) return 'text-green-400';
    if (score > 60) return 'text-yellow-400';
    return 'text-red-400';
  }

  return (
    <Card className="border-primary/20 shadow-xl shadow-primary/5">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Sparkles className="text-primary" /> AI Recruiter Assistant
        </CardTitle>
        <CardDescription>Get instant feedback on your application materials from our AI.</CardDescription>
      </CardHeader>
      <CardContent>
        {!result && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste the job description here..." rows={8} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Cover Letter</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us why you're a legend in the making..." rows={8} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                   <FormItem>
                    <FormLabel>Your Resume (PDF)</FormLabel>
                    <FormControl>
                      <Input type="file" accept=".pdf" {...form.register('resume')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Analyze My Application
              </Button>
            </form>
          </Form>
        )}

        {isLoading && !result && (
            <div className="text-center p-8">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Our AI is reviewing your materials... this may take a moment.</p>
            </div>
        )}

        {error && (
            <div className="mt-6 p-4 bg-destructive/10 border border-destructive/50 rounded-md text-destructive flex items-center gap-3">
                <AlertTriangle />
                <p>{error}</p>
            </div>
        )}

        {result && (
            <div className="space-y-6 animate-page-enter">
                 <h3 className="font-headline text-2xl text-center">Analysis Complete</h3>
                <div className="text-center">
                    <p className="text-muted-foreground">Overall Score</p>
                    <p className={`font-headline text-7xl ${scoreColor(result.overallScore)}`}>
                        {result.overallScore}
                        <span className="text-4xl">%</span>
                    </p>
                    <Progress value={result.overallScore} className="mt-2 w-1/2 mx-auto" />
                </div>
                <Card className="bg-background/50">
                    <CardHeader><CardTitle>AI Feedback</CardTitle></CardHeader>
                    <CardContent className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap font-body">
                       <p>{result.feedback}</p>
                    </CardContent>
                </Card>
                <Button onClick={() => { setResult(null); form.reset(); }} className="w-full">
                    Review Another Application
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
