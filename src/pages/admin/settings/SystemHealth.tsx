import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, AlertTriangle, CheckCircle, XCircle, Users, Zap, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { systemServices, errorRateHistory, activeUsersRealtime, recentIncidents } from "@/lib/mock-data-health";

const statusConfig = {
  operational: { label: "Operational", color: "bg-green-500", badge: "default" as const, icon: CheckCircle },
  degraded: { label: "Degraded", color: "bg-yellow-500", badge: "secondary" as const, icon: AlertTriangle },
  outage: { label: "Outage", color: "bg-destructive", badge: "destructive" as const, icon: XCircle },
};

const severityBadge = {
  critical: "destructive" as const,
  warning: "secondary" as const,
};

const SystemHealth = () => {
  const operational = systemServices.filter(s => s.status === "operational").length;
  const degraded = systemServices.filter(s => s.status === "degraded").length;
  const outages = systemServices.filter(s => s.status === "outage").length;
  const avgLatency = Math.round(systemServices.filter(s => s.latency > 0).reduce((a, s) => a + s.latency, 0) / systemServices.filter(s => s.latency > 0).length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">System Health</h1>
        <p className="text-muted-foreground">Real-time platform monitoring and incident tracking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10"><CheckCircle className="h-5 w-5 text-green-500" /></div>
              <div>
                <p className="text-2xl font-bold text-foreground">{operational}</p>
                <p className="text-xs text-muted-foreground">Operational</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10"><AlertTriangle className="h-5 w-5 text-yellow-500" /></div>
              <div>
                <p className="text-2xl font-bold text-foreground">{degraded}</p>
                <p className="text-xs text-muted-foreground">Degraded</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10"><XCircle className="h-5 w-5 text-destructive" /></div>
              <div>
                <p className="text-2xl font-bold text-foreground">{outages}</p>
                <p className="text-xs text-muted-foreground">Outages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><Zap className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold text-foreground">{avgLatency}ms</p>
                <p className="text-xs text-muted-foreground">Avg Latency</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="services">
        <TabsList>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="errors">Error Rate</TabsTrigger>
          <TabsTrigger value="users">Active Users</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5" />Service Status</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uptime (30d)</TableHead>
                    <TableHead>Latency</TableHead>
                    <TableHead>Last Incident</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemServices.map((svc) => {
                    const cfg = statusConfig[svc.status];
                    return (
                      <TableRow key={svc.name}>
                        <TableCell className="font-medium">{svc.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${cfg.color}`} />
                            <Badge variant={cfg.badge}>{cfg.label}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>{svc.uptime}%</TableCell>
                        <TableCell>{svc.latency > 0 ? `${svc.latency}ms` : "—"}</TableCell>
                        <TableCell className="text-muted-foreground">{svc.lastIncident}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors">
          <Card>
            <CardHeader><CardTitle>Error Rate & Request Volume (24h)</CardTitle></CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={errorRateHistory}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="time" className="text-xs" />
                    <YAxis yAxisId="left" className="text-xs" />
                    <YAxis yAxisId="right" orientation="right" className="text-xs" />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                    <Line yAxisId="left" type="monotone" dataKey="rate" stroke="hsl(var(--destructive))" name="Error Rate %" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="requests" stroke="hsl(var(--primary))" name="Requests" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Active Users (Real-time)</CardTitle></CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activeUsersRealtime}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="time" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                    <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />Recent Incidents</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Started</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentIncidents.map((inc) => (
                    <TableRow key={inc.id}>
                      <TableCell className="font-mono text-xs">{inc.id}</TableCell>
                      <TableCell className="font-medium">{inc.title}</TableCell>
                      <TableCell><Badge variant={severityBadge[inc.severity]}>{inc.severity}</Badge></TableCell>
                      <TableCell>
                        <Badge variant={inc.status === "resolved" ? "outline" : "secondary"}>
                          {inc.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{inc.service}</TableCell>
                      <TableCell className="text-muted-foreground">{new Date(inc.startedAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemHealth;
