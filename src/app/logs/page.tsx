
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { fetchLogs } from '@/app/actions/studentActions';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, UserPlus, Trash2, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function ActivityLedgerPage() {
  const logs = await fetchLogs();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-8 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <SidebarTrigger />
          <div className="h-6 w-px bg-border mx-2" />
          <h2 className="font-headline text-xl font-bold text-primary">Institutional Activity Ledger</h2>
        </header>

        <main className="p-8 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="font-headline text-2xl">Audit Trail</CardTitle>
                  <CardDescription>Full history of administrative operations performed on student records.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-[100px]">Action</TableHead>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <Badge variant="outline" className={cn(
                            "flex items-center gap-1.5 w-fit",
                            log.action === 'Created' ? "border-green-500 text-green-700 bg-green-50" :
                            log.action === 'Updated' ? "border-blue-500 text-blue-700 bg-blue-50" : "border-red-500 text-red-700 bg-red-50"
                          )}>
                            {log.action === 'Created' && <UserPlus className="w-3 h-3" />}
                            {log.action === 'Updated' && <Edit className="w-3 h-3" />}
                            {log.action === 'Deleted' && <Trash2 className="w-3 h-3" />}
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs font-bold">{log.admissionNumber}</TableCell>
                        <TableCell className="text-sm font-medium">{log.description}</TableCell>
                        <TableCell className="text-muted-foreground text-xs">{new Date(log.timestamp).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
