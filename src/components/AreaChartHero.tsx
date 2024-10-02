"use client"

import { AreaChart } from "@/components/AreaChart"
import { AvailableChartColors } from "@/lib/chartUtils"

const chartdata = [
  {
    date: "Jan 23",
    Lilongwe: 28,
    Blantyre: 23,
    Mzuzu: 24
  },
  {
    date: "Feb 23",
    Lilongwe: 27,
    Blantyre: 21,
    Mzuzu: 28
  },
  {
    date: "Mar 23",
    Lilongwe: 33,
    Blantyre: 21,
    Mzuzu: 29
  },
  {
    date: "Apr 23",
    Lilongwe: 34,
    Blantyre: 21,
    Mzuzu: 25
  },
  {
    date: "May 23",
    Lilongwe: 34,
    Blantyre: 18,
    Mzuzu: 27
  },
  {
    date: "Jun 23",
    Lilongwe: 31,
    Blantyre: 17,
    Mzuzu: 26
  },
  {
    date: "Jul 23",
    Lilongwe: 34,
    Blantyre: 19,
    Mzuzu: 24
  },
  {
    date: "Aug 23",
    Lilongwe: 29,
    Blantyre: 20,
    Mzuzu: 27
  },
  {
    date: "Sep 23",
    Lilongwe: 26,
    Blantyre: 23,
    Mzuzu: 22
  },
  {
    date: "Oct 23",
    Lilongwe: 28,
    Blantyre: 24,
    Mzuzu: 26
  },
  {
    date: "Nov 23",
    Lilongwe: 29,
    Blantyre: 38,
    Mzuzu: 25
  },
  {
    date: "Dec 23",
    Lilongwe: 32,
    Blantyre: 37,
    Mzuzu: 29
  },
]

export const AreaChartHero = () => (
  <AreaChart
    className="h-80"
    data={chartdata}
    index="date"
    colors={AvailableChartColors}
    categories={["Lilongwe", "Blantyre", "Mzuzu"]}
    valueFormatter={(number: number) =>
      `MK${Intl.NumberFormat("malawi").format(number).toString()}m`
    }
    onValueChange={(v) => console.log(v)}
  />
)