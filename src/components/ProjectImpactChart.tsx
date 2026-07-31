import { useTranslation } from "react-i18next";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ProjectMetric } from "@/data/projectsData";

interface ProjectImpactChartProps {
  metrics: ProjectMetric[];
  title: string;
  caption?: string;
}

const ProjectImpactChart = ({ metrics, title, caption }: ProjectImpactChartProps) => {
  const { t } = useTranslation();

  const data = metrics.map((metric) => ({
    name: t(`projectsPage.metrics.${metric.key}`),
    Avant: metric.before,
    Après: metric.after,
    unit: metric.unit,
  }));

  return (
    <div className="my-12 rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-card">
      <h3 className="font-display text-lg lg:text-xl font-bold text-foreground mb-1 text-center">
        {title}
      </h3>
      {caption && (
        <p className="text-muted-foreground text-xs lg:text-sm text-center mb-6 max-w-xl mx-auto">
          {caption}
        </p>
      )}
      <div className="h-64 lg:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval={0}
              height={50}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                fontSize: "0.8rem",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "0.8rem" }} />
            <Bar dataKey="Avant" fill="hsl(var(--muted-foreground))" radius={[6, 6, 0, 0]} maxBarSize={36} />
            <Bar dataKey="Après" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectImpactChart;