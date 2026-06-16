import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  UserPlus,
  ClipboardList
} from 'lucide-react';
import { fetchStats, fetchLogs } from '@/app/actions/studentActions';
import { cn } from '@/lib/utils';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts';

export default async function Dashboard() {
  const stats = await fetchStats();
  const recentLogs = (await fetchLogs()).slice(0, 5);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-8 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <SidebarTrigger />
          <div className="h-6 w-px bg-border mx-2" />
          <h2 className="font-headline text-xl font-bold text-primary">Academic Dashboard</h2>
        </header>

        <main className="p-8 space-y-8 animate-in fade-in duration-500">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-primary text-primary-foreground border-none shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Total Enrollment</CardTitle>
                <Users className="w-5 h-5 opacity-70" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalStudents}</div>
                <div className="flex items-center text-xs mt-1 opacity-80">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +12% from last semester
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Courses</CardTitle>
                <GraduationCap className="w-5 h-5 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.studentsByCourse.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Across all departments</p>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Retention Rate</CardTitle>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground mt-1">Year-over-year stability</p>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Records</CardTitle>
                <Activity className="w-5 h-5 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <p className="text-xs text-muted-foreground mt-1">Requiring verification</p>
              </CardContent>
            </Card>
          </div>

          {/* Visual Analytics Section */}
          <AnalyticsCharts stats={stats} />

          {/* Activity Logs Table */}
          <Card className="shadow-sm border-none bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline text-lg">Recent Administrative Activity</CardTitle>
                <CardDescription>Audit trail of system changes</CardDescription>
              </div>
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-4 p-4 rounded-xl border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className={cn(
                      "p-2 rounded-lg",
                      log.action === 'Created' ? "bg-green-100 text-green-700" :
                      log.action === 'Updated' ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                    )}>
                      {log.action === 'Created' ? <UserPlus className="w-4 h-4" /> : 
                       log.action === 'Updated' ? <Activity className="w-4 h-4" /> : <ClipboardList className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-bold text-sm">{log.description}</p>
                        <span className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">ID: {log.admissionNumber}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
