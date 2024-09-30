"use client"

import { AreaChart } from "@/components/AreaChart"

const chartdata = [
  {
    date: "Jan 23",
    Lilongwe: 28,
    Blantyre: 23,
  },
  {
    date: "Feb 23",
    Lilongwe: 27,
    Blantyre: 21,
  },
  {
    date: "Mar 23",
    Lilongwe: 33,
    Blantyre: 21,
  },
  {
    date: "Apr 23",
    Lilongwe: 34,
    Blantyre: 21,
  },
  {
    date: "May 23",
    Lilongwe: 34,
    Blantyre: 18,
  },
  {
    date: "Jun 23",
    Lilongwe: 31,
    Blantyre: 17,
  },
  {
    date: "Jul 23",
    Lilongwe: 34,
    Blantyre: 19,
  },
  {
    date: "Aug 23",
    Lilongwe: 29,
    Blantyre: 20,
  },
  {
    date: "Sep 23",
    Lilongwe: 26,
    Blantyre: 23,
  },
  {
    date: "Oct 23",
    Lilongwe: 28,
    Blantyre: 24,
  },
  {
    date: "Nov 23",
    Lilongwe: 29,
    Blantyre: 38,
  },
  {
    date: "Dec 23",
    Lilongwe: 32,
    Blantyre: 37,
  },
]

export const AreaChartHero = () => (
  <AreaChart
    className="h-80"
    data={chartdata}
    index="date"
    categories={["Lilongwe", "Blantyre"]}
    valueFormatter={(number: number) =>
      `MK${Intl.NumberFormat("malawi").format(number).toString()}m`
    }
    onValueChange={(v) => console.log(v)}
  />
)