
import Link from 'next/link';
import Image from 'next/image';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  Eye, 
  Edit, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  ArrowUpDown
} from 'lucide-react';
import { fetchStudents } from '@/app/actions/studentActions';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export default async function StudentsDirectory({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const search = typeof searchParams.search === 'string' ? searchParams.search : '';
  const course = typeof searchParams.course === 'string' ? searchParams.course : 'all';
  const year = typeof searchParams.year === 'string' ? searchParams.year : 'all';
  const gender = typeof searchParams.gender === 'string' ? searchParams.gender : 'all';
  const sortBy = (typeof searchParams.sortBy === 'string' ? searchParams.sortBy : 'createdAt') as any;
  const sortOrder = (typeof searchParams.sortOrder === 'string' ? searchParams.sortOrder : 'desc') as any;

  const { data: students, total, totalPages } = await fetchStudents({
    page,
    search,
    course,
    year,
    gender,
    sortBy,
    sortOrder,
    limit: 10
  });

  const getSortLink = (field: string) => {
    const newOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    return `?search=${search}&course=${course}&year=${year}&gender=${gender}&sortBy=${field}&sortOrder=${newOrder}&page=1`;
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-8 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <div className="h-6 w-px bg-border mx-2" />
            <h2 className="font-headline text-xl font-bold text-primary">Unified Student Directory</h2>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/students/new">
              <Plus className="w-4 h-4 mr-2" />
              New Admission
            </Link>
          </Button>
        </header>

        <main className="p-8 space-y-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              {/* Filter Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div className="relative lg:col-span-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <form action="/students" method="get">
                    <Input 
                      name="search" 
                      defaultValue={search} 
                      placeholder="Search ID, Name or Email..." 
                      className="pl-10" 
                    />
                    <input type="hidden" name="course" value={course} />
                    <input type="hidden" name="year" value={year} />
                    <input type="hidden" name="gender" value={gender} />
                  </form>
                </div>
                
                <form action="/students" method="get" className="contents">
                  <input type="hidden" name="search" value={search} />
                  
                  <Select name="course" defaultValue={course}>
                    <SelectTrigger>
                      <SelectValue placeholder="Course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Information Technology">Information Technology</SelectItem>
                      <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select name="year" defaultValue={year}>
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="1">Year 1</SelectItem>
                      <SelectItem value="2">Year 2</SelectItem>
                      <SelectItem value="3">Year 3</SelectItem>
                      <SelectItem value="4">Year 4</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button type="submit" variant="secondary" className="w-full">
                    Apply Filters
                  </Button>
                </form>
              </div>

              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-[80px]">Photo</TableHead>
                      <TableHead>
                        <Link href={getSortLink('admissionNumber')} className="flex items-center hover:text-primary transition-colors">
                          Admission ID <ArrowUpDown className="ml-2 w-3 h-3" />
                        </Link>
                      </TableHead>
                      <TableHead>
                        <Link href={getSortLink('name')} className="flex items-center hover:text-primary transition-colors">
                          Student Name <ArrowUpDown className="ml-2 w-3 h-3" />
                        </Link>
                      </TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-48 text-center text-muted-foreground">
                          No records found matching current criteria.
                        </TableCell>
                      </TableRow>
                    ) : (
                      students.map((student) => (
                        <TableRow key={student.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell>
                            <div className="w-10 h-10 rounded-full overflow-hidden border relative bg-muted">
                              {student.photoUrl ? (
                                <Image 
                                  src={student.photoUrl} 
                                  alt={student.name} 
                                  fill 
                                  className="object-cover"
                                  data-ai-hint="student portrait"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                                  {student.name.charAt(0)}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs font-bold">{student.admissionNumber}</TableCell>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="font-normal">{student.course}</Badge>
                          </TableCell>
                          <TableCell>Year {student.year}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{student.email}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-primary">
                                <Link href={`/students/${student.id}`}>
                                  <Eye className="w-4 h-4" />
                                </Link>
                              </Button>
                              <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-accent">
                                <Link href={`/students/${student.id}/edit`}>
                                  <Edit className="w-4 h-4" />
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{students.length}</span> of <span className="font-medium">{total}</span> records
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild disabled={page <= 1}>
                    <Link href={`?search=${search}&course=${course}&year=${year}&gender=${gender}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page - 1}`}>
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Link>
                  </Button>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    Page {page} of {totalPages || 1}
                  </div>
                  <Button variant="outline" size="sm" asChild disabled={page >= totalPages}>
                    <Link href={`?search=${search}&course=${course}&year=${year}&gender=${gender}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page + 1}`}>
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
