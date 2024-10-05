'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';



export default function NavLinks({ links }: {
  links: {
    name: string;
    href: string;
    icon: ({ color }: {
      color?: string | undefined;
    }) => JSX.Element;
  }[]
}) {
  const pathname = usePathname()

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className='flex gap-4 w-full pr-4'
          >
            <div className={clsx(
              'w-1 h-full rounded-r-3xl',
              {
                'bg-primary': pathname === link.href
              }
            )}></div>
            <div className={clsx(
              'w-full h-[48px] flex gap-2 items-center px-4 rounded-md hover:bg-gray-100',
              {
                'text-white bg-primary hover:bg-primary': pathname === link.href,
              },
            )}>
              <link.icon {...{ color: pathname === link.href ? '#fff' : '#000' }} />
              <p className="hidden md:block text-sm">{link.name}</p>
            </div>

          </Link>
        );
      })}
    </>
  );
}
