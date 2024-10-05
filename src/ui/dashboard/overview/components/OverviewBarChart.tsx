"use client"

import { BarChart } from "@/tremorComponents/BarChart"



export const OverviewBarChart = ({ chartdata }: {
  chartdata: {
    date: string;
    Lilongwe: number;
    Blantyre: number;
    Mzuzu: number;
  }[]
}) => (
  <BarChart
    className="h-80"
    data={chartdata}
    index="date"
    categories={["Lilongwe", "Blantyre", "Mzuzu"]}
    valueFormatter={(number: number) =>
      `MK${Intl.NumberFormat("malawi").format(number / 100).toString()}m`
    }
    onValueChange={(v) => console.log(v)}
  />
)