"use client"

import { barChartFormatCurrency } from "@/lib/utils";
import { BarChart } from "@/tremorComponents/BarChart"



export const OverviewBarChart = ({ chartdata }: {
  chartdata: {
    date: string;
    Lilongwe?: number;
    Blantyre?: number;
    Mzuzu?: number;
  }[]
}) => (
  <BarChart
    className="h-80"
    data={chartdata}
    index="date"
    categories={["Lilongwe", "Blantyre", "Mzuzu"]}
    valueFormatter={barChartFormatCurrency}
    onValueChange={(v) => console.log(v)}
  />
)