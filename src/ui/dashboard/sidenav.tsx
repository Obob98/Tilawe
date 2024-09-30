'use client'

import Link from 'next/link';
import NavLinks from '@/ui/dashboard/nav-links';
import { Caret } from '@/assets/SVGComponents';
import { analyticsLinks, worksSpaceLinks } from '@/lib/constants';

export default function SideNav() {
  return (
    <div className="w-full flex h-full flex-col bg-white border-r border-r-[#e0e0e0] shadow-lg">
      <Link
        className="flex gap-4 items-center px-4 py-4 border-b border-[#e0e0e0]"
        href="/"
      >
        <div className='w-12 h-12 bg-[#b9b9b9] rounded-md'></div>
        <p className='flex-1 font-semibold '>TILAWE MEAT MECHANTS</p>
        <div className=''>
          <Caret {...{ styles: '-rotate-90' }} />
          <Caret {...{ styles: 'rotate-90' }} />
        </div>
      </Link>
      <div className="w-full flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 pt-8">
        <small className='text-gray-400 pl-6'>Analytics</small>
        <NavLinks {...{ links: analyticsLinks }} />
        <div className='bg-[#e0e0e0] w-full h-[1px]'></div>
        <small className='text-gray-400 pl-6 pt-4'>Work Space</small>
        <NavLinks {...{ links: worksSpaceLinks }} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div className='flex gap-4 items-center justify-between px-4 py-4 border-t border-t-[#e0e0e0]'>
          <div className='w-10 h-10 rounded-full bg-slate-200 grid place-content-center'>UN</div>
          <p className='flex-1'>User Name</p>
          <Caret />
        </div>
        {/* <form >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:opacity-90 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form> */}
      </div>
    </div>
  );
}
