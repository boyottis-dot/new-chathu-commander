import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { forecastData } from "@/lib/mock-data-operations";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

const fmt = (n: number) => `${(n / 1000000).toFixed(1)}M`;

export default function Forecasting() {
  const actual = forecastData.filter(f => f.actualRevenue !== undefined);
  const projected = forecastData;

  const totalProjectedRev = projected.reduce((s, f) => s + f.projectedRevenue, 0);
  const totalActualRev = actual.reduce((s, f) => s + (f.actualRevenue || 0), 0);
  const totalProjectedProfit = projected.reduce((s, f) => s + f.projectedProfit, 0);
  const accuracy = actual.length > 0 ? Math.round((actual.reduce((s, f) => s + Math.min((f.actualRevenue || 0) / f.projectedRevenue, f.projectedRevenue / (f.actualRevenue || 1)), 0) / actual.length) * 100) : 0;

  const chartData = forecastData.map(f => ({
    month: f.month.split(" ")[0].slice(0, 3),
    projectedRevenue: f.projectedRevenue / 1000000,
    actualRevenue: f.actualRevenue ? f.actualRevenue / 1000000 : undefined,
    projectedProfit: f.projectedProfit / 1000000,
    actualProfit: f.actualProfit ? f.actualProfit / 1000000 : undefined,
    projectedExpenses: f.projectedExpenses / 1000000,
    actualExpenses: f.actualExpenses ? f.actualExpenses / 1000000 : undefined,
  }));

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">Financial Forecasting</h1><p className="text-muted-foreground">Revenue projections, expense forecasts, and scenario planning</p></div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Projected Annual Revenue</p><p className="text-xl font-bold">MWK {fmt(totalProjectedRev)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Actual YTD Revenue</p><p className="text-xl font-bold text-green-400">MWK {fmt(totalActualRev)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Projected Annual Profit</p><p className="text-xl font-bold">MWK {fmt(totalProjectedProfit)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Forecast Accuracy</p><p className="text-xl font-bold text-primary">{accuracy}%</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Revenue: Projected vs Actual</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} /><stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `${v}M`} />
                <Tooltip formatter={(v: number) => `MWK ${v.toFixed(1)}M`} />
                <Legend />
                <Area type="monotone" dataKey="projectedRevenue" name="Projected" stroke="hsl(var(--primary))" fill="url(#projGrad)" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="actualRevenue" name="Actual" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Profit: Projected vs Actual</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `${v}M`} />
                <Tooltip formatter={(v: number) => `MWK ${v.toFixed(1)}M`} />
                <Legend />
                <Bar dataKey="projectedProfit" name="Projected Profit" fill="hsl(var(--primary))" opacity={0.5} radius={[4, 4, 0, 0]} />
                <Bar dataKey="actualProfit" name="Actual Profit" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Monthly Breakdown</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                <th className="p-3 text-left text-muted-foreground font-medium">Month</th>
                <th className="p-3 text-right text-muted-foreground font-medium">Proj. Revenue</th>
                <th className="p-3 text-right text-muted-foreground font-medium">Actual Revenue</th>
                <th className="p-3 text-right text-muted-foreground font-medium">Variance</th>
                <th className="p-3 text-right text-muted-foreground font-medium">Proj. Profit</th>
                <th className="p-3 text-right text-muted-foreground font-medium">Actual Profit</th>
              </tr></thead>
              <tbody>
                {forecastData.map(f => {
                  const revVar = f.actualRevenue ? ((f.actualRevenue - f.projectedRevenue) / f.projectedRevenue * 100).toFixed(1) : "—";
                  return (
                    <tr key={f.month} className="border-b border-border last:border-0">
                      <td className="p-3 font-medium">{f.month}</td>
                      <td className="p-3 text-right">MWK {fmt(f.projectedRevenue)}</td>
                      <td className="p-3 text-right">{f.actualRevenue ? `MWK ${fmt(f.actualRevenue)}` : "—"}</td>
                      <td className={`p-3 text-right ${typeof revVar === "string" && revVar !== "—" && parseFloat(revVar) >= 0 ? "text-green-400" : typeof revVar === "string" && revVar !== "—" ? "text-red-400" : "text-muted-foreground"}`}>{revVar !== "—" ? `${parseFloat(revVar as string) >= 0 ? "+" : ""}${revVar}%` : "—"}</td>
                      <td className="p-3 text-right">MWK {fmt(f.projectedProfit)}</td>
                      <td className="p-3 text-right">{f.actualProfit ? `MWK ${fmt(f.actualProfit)}` : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
