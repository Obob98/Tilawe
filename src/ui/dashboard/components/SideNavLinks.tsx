'use client'

import NavLinks from '@/ui/dashboard/components/nav-links';
import { analyticsLinks, worksSpaceLinks, CEOAnalyticsLinks, CEOWorksSpaceLinks, adminAnalyticsLinks, adminworksSpaceLinks } from '@/lib/constants';
import useClientSession from '@/customHooks/useClientSession';

export default function SideNavLinks({ role }: { role: string }) {

    return (
        <>
            {
                role === "Company Manager" && (
                    <>
                        <small className='text-gray-400 pl-6 text-[12px] hidden md:block'>Overview</small>
                        <NavLinks {...{ links: CEOAnalyticsLinks }} />
                        <div className='bg-[#e0e0e0] w-full h-[1px]'></div>
                        <small className='text-gray-400 pl-6 text-[12px] pt-4 hidden md:block'>Work Space</small>
                        <NavLinks {...{ links: CEOWorksSpaceLinks }} />
                    </>
                )

            }
            {
                role === "Admin" && (
                    <>
                        <small className='text-gray-400 pl-6 text-[12px] hidden md:block'>Analytics</small>
                        <NavLinks {...{ links: adminAnalyticsLinks }} />
                        <div className='bg-[#e0e0e0] w-full h-[1px]'></div>
                        <small className='text-gray-400 pl-6 text-[12px] pt-4 hidden md:block'>Work Space</small>
                        <NavLinks {...{ links: adminworksSpaceLinks }} />
                    </>
                )

            }
        </>
    )
}
