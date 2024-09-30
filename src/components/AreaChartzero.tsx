"use client"

import { AreaChart } from "@/components/AreaChart"

const chartdata = [
  {
    date: "Jan 23",
    Lilongwe: 2890,
    Blantyre: 2338,
  },
  {
    date: "Feb 23",
    Lilongwe: 2756,
    Blantyre: 2103,
  },
  {
    date: "Mar 23",
    Lilongwe: 3322,
    Blantyre: 2194,
  },
  {
    date: "Apr 23",
    Lilongwe: 3470,
    Blantyre: 2108,
  },
  {
    date: "May 23",
    Lilongwe: 3475,
    Blantyre: 1812,
  },
  {
    date: "Jun 23",
    Lilongwe: 3129,
    Blantyre: 1726,
  },
  {
    date: "Jul 23",
    Lilongwe: 3490,
    Blantyre: 1982,
  },
  {
    date: "Aug 23",
    Lilongwe: 2903,
    Blantyre: 2012,
  },
  {
    date: "Sep 23",
    Lilongwe: 2643,
    Blantyre: 2342,
  },
  {
    date: "Oct 23",
    Lilongwe: 2837,
    Blantyre: 2473,
  },
  {
    date: "Nov 23",
    Lilongwe: 2954,
    Blantyre: 3848,
  },
  {
    date: "Dec 23",
    Lilongwe: 3239,
    Blantyre: 3736,
  },
]

export const AreaChartHero = () => (
  <AreaChart
    className="h-80"
    data={chartdata}
    index="date"
    categories={["Lilongwe", "Blantyre"]}
    valueFormatter={(number: number) =>
      `$${Intl.NumberFormat("malawi").format(number).toString()}`
    }
    onValueChange={(v) => console.log(v)}
  />
)