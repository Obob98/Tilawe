'use client'

import NavLinks from '@/ui/dashboard/components/nav-links';
import { analyticsLinks, worksSpaceLinks } from '@/lib/constants';
import SideNavProfileDropdown from './SideNavProfileDropdown';
import Link from 'next/link';
import logo from '@/../public/logo.jpeg'
import Image from 'next/image';
import { RiMenu2Line } from "@remixicon/react";
import { Card } from '@/tremorComponents/Card';

export default function SideNav() {
  return (
    <Card className="w-full h-full flex flex-row md:flex-col  sticky top-0 left-0 p-0 rounded-none">

      <Link
        className=" flex gap-2 items-center px-4 py-4 md:border-b md:border-[#e0e0e0]"
        href="/dashboard"
      >
        <div className='w-12 h-12 rounded-md bg-primary'>
          <Image
            src={logo}
            alt='company logo'
            width={1000}
            height={1000}
            className='w-full object-cover object-center'
          />
        </div>
        <p className='flex-1 font-bold text-xs hidden md:block'>TILAWE MEAT MECHANTS</p>
        {/* <DoubleCaret {...{ strokeWidth: 0.1 }} /> */}
      </Link>

      <div className="w-full h-full gap-2 grow flex-row  md:flex-col  pt-8 hidden md:flex">
        <small className='text-gray-400 pl-6 text-[12px] hidden md:block'>Analytics</small>
        <NavLinks {...{ links: analyticsLinks }} />
        <div className='bg-[#e0e0e0] w-full h-[1px]'></div>
        <small className='text-gray-400 pl-6 text-[12px] pt-4 hidden md:block'>Work Space</small>
        <NavLinks {...{ links: worksSpaceLinks }} />
      </div>

      <SideNavProfileDropdown />
    </Card >
  );
}
