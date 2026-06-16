
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { createStudentAction, updateStudentAction } from '@/app/actions/studentActions';
import { Loader2, Save, RotateCcw, ImageIcon } from 'lucide-react';
import { Student } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100),
  course: z.string().min(1, 'Course is required'),
  year: z.string().min(1, 'Year is required'),
  dateOfBirth: z.string().refine((val) => {
    const dob = new Date(val);
    return dob <= new Date();
  }, 'Date of birth cannot be in the future'),
  email: z.string().email('Invalid institutional email'),
  mobileNumber: z.string().regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
  gender: z.enum(['Male', 'Female', 'Other']),
  address: z.string().min(5, 'Please provide a complete address'),
  photoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

interface StudentFormProps {
  initialData?: Student;
  mode: 'create' | 'edit';
}

export function StudentForm({ initialData, mode }: StudentFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      course: initialData.course,
      year: initialData.year.toString(),
      dateOfBirth: initialData.dateOfBirth,
      email: initialData.email,
      mobileNumber: initialData.mobileNumber,
      gender: initialData.gender,
      address: initialData.address,
      photoUrl: initialData.photoUrl || '',
    } : {
      name: '',
      course: '',
      year: '1',
      dateOfBirth: '',
      email: '',
      mobileNumber: '',
      gender: 'Male',
      address: '',
      photoUrl: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const payload = {
        ...values,
        year: parseInt(values.year),
      };

      if (mode === 'create') {
        await createStudentAction(payload);
        toast({ title: 'Registration Successful', description: `${values.name} has been enrolled.` });
      } else if (mode === 'edit' && initialData) {
        await updateStudentAction(initialData.id, payload);
        toast({ title: 'Record Updated', description: `Student data for ${values.name} has been synchronized.` });
      }
      router.push('/students');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Operation Failed',
        description: 'An error occurred while processing the student record.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-12">
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              {mode === 'create' ? 'Personal Information' : 'Update Biographical Data'}
            </CardTitle>
            <CardDescription>Verified academic and identity details.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Registrar's name as per ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender identity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institutional Email</FormLabel>
                  <FormControl>
                    <Input placeholder="student@pillai.edu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="10 digit contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Residential Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Full street address and locality..." className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Academic Details</CardTitle>
            <CardDescription>Departmental and enrollment categorization.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department / Course</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Computer Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enrollment Year</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Current study year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="photoUrl"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Profile Photo Link</FormLabel>
                  <div className="flex gap-4 items-center">
                    <FormControl>
                      <Input placeholder="https://picsum.photos/..." className="flex-1" {...field} />
                    </FormControl>
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border">
                      <ImageIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90 min-w-[150px]" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {mode === 'create' ? 'Submit Enrollment' : 'Save Changes'}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
