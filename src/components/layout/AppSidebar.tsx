
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  ClipboardList, 
  GraduationCap,
  Settings,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';

const mainNav = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Students Directory', icon: Users, href: '/students' },
  { name: 'Admit New Student', icon: UserPlus, href: '/students/new' },
  { name: 'Activity Ledger', icon: ClipboardList, href: '/logs' },
];

const adminNav = [
  { name: 'Settings', icon: Settings, href: '#' },
  { name: 'Support', icon: HelpCircle, href: '#' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-border/50 shadow-sm">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-headline text-lg font-bold text-primary leading-tight">Pillai University</h1>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Institutional Control</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2">Management</SidebarGroupLabel>
          <SidebarMenu>
            {mainNav.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href} className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200",
                    pathname === item.href ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "hover:bg-muted"
                  )}>
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4 py-2">System</SidebarGroupLabel>
          <SidebarMenu>
            {adminNav.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link href={item.href} className="flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6">
        <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
          <p className="text-xs font-semibold text-muted-foreground mb-1">Authenticated as</p>
          <p className="text-sm font-bold truncate">Registrar Office</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
