
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { StudentForm } from '@/components/students/StudentForm';

export default function NewStudentPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-8 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <SidebarTrigger />
          <div className="h-6 w-px bg-border mx-2" />
          <h2 className="font-headline text-xl font-bold text-primary">Student Admission</h2>
        </header>

        <main className="p-8 max-w-4xl mx-auto">
          <StudentForm mode="create" />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
