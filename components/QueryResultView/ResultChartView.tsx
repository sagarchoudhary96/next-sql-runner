"use client";

import { TableData } from "@/types";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CHART_COLORS } from "@/lib/constants";

interface ResultChartViewProps {
  tableData: TableData;
}

const ResultChartView = ({ tableData }: ResultChartViewProps) => {
  const { rows, metadata } = tableData;

  // Transform data for bar chart
  const chartData = useMemo(() => {
    if (!rows.length) return [];
    const columns = metadata.columns;
    // For bar charts, we need numerical data
    const numericalColumns = columns.filter(
      (col) => typeof rows[0][col.name] === "number"
    );

    if (numericalColumns.length === 0) return [];

    // Take first 20 rows to avoid overwhelming the chart
    const limitedRows = rows.slice(0, 20);

    return limitedRows.map((row, index) => {
      const dataPoint: Record<string, number | string> = { index };
      numericalColumns.forEach((col) => {
        dataPoint[col.name] = row[col.name] as string;
      });
      return dataPoint;
    });
  }, [rows, metadata.columns]);

  if (!chartData.length) {
    return (
      <Card className="flex flex-1 overflow-hidden gap-2 py-2">
        <CardHeader className="px-2 sm:px-6">
          <CardTitle>Chart Visualization</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden flex flex-col px-2">
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            No numerical data available for bar chart
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" className="text-sm" />
            <YAxis className="text-xs" />
            <Tooltip />
            {metadata.columns
              .filter((col) => typeof chartData[0]?.[col.name] === "number")
              .map((col, index) => (
                <Bar
                  key={col.name}
                  dataKey={col.name}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResultChartView;
