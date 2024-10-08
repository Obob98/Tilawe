import Link from 'next/link';

import logo from '@/../public/logo.png'
import Image from 'next/image';

export default async function SideNavLogoArea() {

    return (
        <Link
            className="w-full flex gap-2 items-center px-4 py-4 md:border-b md:border-[#e0e0e0]"
            href="/dashboard"
        >
            <div className='w-12 h-12 rounded-md bg-primary overflow-hidden'>
                <Image
                    src={logo}
                    alt='company logo'
                    width={1000}
                    height={1000}
                    className='w-full object-cover object-center'
                />
            </div>
            <div className='flex-1 overflow-hidden'>
                <p className='font-[500] hidden md:block text-ellipsis whitespace-nowrap text-sm'>Tilawe Meat Merchants</p>
            </div>
            {/* <DoubleCaret {...{ strokeWidth: 0.1 }} /> */}
        </Link>
    )
}
