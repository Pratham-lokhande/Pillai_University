
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  User, 
  GraduationCap, 
  Edit,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { fetchStudentById, generateSummaryAction } from '@/app/actions/studentActions';
import { Badge } from '@/components/ui/badge';

export default async function StudentDetailsPage({ params }: { params: { id: string } }) {
  const student = await fetchStudentById(params.id);

  if (!student) {
    notFound();
  }

  const aiSummary = await generateSummaryAction(student);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-8 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <div className="h-6 w-px bg-border mx-2" />
            <Button variant="ghost" size="sm" asChild className="-ml-2">
              <Link href="/students">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Directory
              </Link>
            </Button>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href={`/students/${student.id}/edit`}>
              <Edit className="w-4 h-4 mr-2" />
              Modify Record
            </Link>
          </Button>
        </header>

        <main className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Profile Card */}
            <div className="space-y-6">
              <Card className="overflow-hidden border-none shadow-lg bg-white">
                <div className="h-32 bg-primary relative">
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-2xl border-4 border-white overflow-hidden bg-muted shadow-md">
                    {student.photoUrl ? (
                      <Image 
                        src={student.photoUrl} 
                        alt={student.name} 
                        fill 
                        className="object-cover"
                        data-ai-hint="student photo"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-3xl font-bold">
                        {student.name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
                <CardContent className="pt-16 pb-8 text-center">
                  <h1 className="font-headline text-2xl font-bold mb-1">{student.name}</h1>
                  <p className="text-sm font-mono text-muted-foreground font-semibold tracking-wider mb-4">{student.admissionNumber}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="secondary">{student.course}</Badge>
                    <Badge variant="outline">Year {student.year}</Badge>
                  </div>
                </CardContent>
                <div className="border-t p-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-accent" />
                    <span className="truncate">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-accent" />
                    <span>{student.mobileNumber}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="line-clamp-2">{student.address}</span>
                  </div>
                </div>
              </Card>

              <Card className="border-none shadow-md bg-accent text-accent-foreground overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <CardTitle className="text-lg font-headline">AI Profile Summary</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed opacity-90">
                    {aiSummary}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Detailed Info & Timeline */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Comprehensive Record</CardTitle>
                  <CardDescription>Verified academic and personal metadata</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-muted"><User className="w-5 h-5 text-primary" /></div>
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Gender Identity</p>
                          <p className="font-medium">{student.gender}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-muted"><Calendar className="w-5 h-5 text-primary" /></div>
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Date of Birth</p>
                          <p className="font-medium">{new Date(student.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-muted"><GraduationCap className="w-5 h-5 text-primary" /></div>
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Academic Status</p>
                          <Badge className="bg-green-500 hover:bg-green-600">Active Enrollment</Badge>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-muted"><Calendar className="w-5 h-5 text-primary" /></div>
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Record Created</p>
                          <p className="font-medium">{new Date(student.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Performance Quick View</CardTitle>
                  <CardDescription>Visual data on student performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-xl bg-muted/20 m-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">Attendance & Grade Visualization</p>
                    <p className="text-[10px] text-muted-foreground mt-1">(Module under construction - Next Phase)</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-between p-6 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-sm font-medium">System reports this record is synchronized with the University Central Database.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
