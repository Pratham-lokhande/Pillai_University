'use client';

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DashboardStats } from '@/lib/types';

interface AnalyticsChartsProps {
  stats: DashboardStats;
}

export function AnalyticsCharts({ stats }: AnalyticsChartsProps) {
  const COLORS = ['#2a4e96', '#1ab5e5', '#34d399', '#f59e0b', '#8b5cf6'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="shadow-sm overflow-hidden border-none bg-white">
        <CardHeader>
          <CardTitle className="font-headline text-lg">Enrollment by Course</CardTitle>
          <CardDescription>Distribution of students across departments</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] pb-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.studentsByCourse}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="course" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#f1f3f8' }} 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-sm overflow-hidden border-none bg-white">
        <CardHeader>
          <CardTitle className="font-headline text-lg">Year Wise Breakdown</CardTitle>
          <CardDescription>Academic progression statistics</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats.studentsByYear.map(y => ({ name: `Year ${y.year}`, value: y.count }))}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {stats.studentsByYear.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
