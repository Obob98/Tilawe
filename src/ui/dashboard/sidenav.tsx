'use client'

import Link from 'next/link';
import NavLinks from '@/ui/dashboard/nav-links';
import { Caret, Elipsis } from '@/assets/SVGComponents';
import { analyticsLinks, worksSpaceLinks } from '@/lib/constants';

export default function SideNav() {
  return (
    <div className="w-full flex h-full flex-col bg-white border-r border-r-[#e0e0e0] shadow-sm sticky top-0 left-0">
      <Link
        className="flex gap-4 items-center px-4 py-4 border-b border-[#e0e0e0]"
        href="/"
      >
        <div className='w-12 h-12 bg-[#b9b9b9] rounded-md'></div>
        <p className='flex-1 font-bold '>TILAWE MEAT MECHANTS</p>
        <div className=''>
          <Caret {...{ styles: '-rotate-90' }} />
          <Caret {...{ styles: 'rotate-90' }} />
        </div>
      </Link>
      <div className="w-full h-full flex gap-2 grow flex-row  md:flex-col  pt-8">
        <small className='text-gray-400 pl-6 text-[12px]'>Analytics</small>
        <NavLinks {...{ links: analyticsLinks }} />
        <div className='bg-[#e0e0e0] w-full h-[1px]'></div>
        <small className='text-gray-400 pl-6 text-[12px] pt-4'>Work Space</small>
        <NavLinks {...{ links: worksSpaceLinks }} />
      </div>
      <button

        className=' gap-4 flex items-center justify-between px-4 py-4 border-t border-t-[#e0e0e0] hover:bg-gray-100'
      >
        <div className='w-10 h-10 rounded-full bg-slate-200 grid place-content-center'>UN</div>
        <p className='flex-1 text-left'>User Name</p>
        <Elipsis />
      </button>
    </div>
  );
}
