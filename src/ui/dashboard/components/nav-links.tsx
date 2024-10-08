'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/utils';

export default function NavLinks({ links, showNotificationBadge }: {
  links: {
    name: string;
    href: string;
    icon: ({ color }: {
      color?: string | undefined;
    }) => JSX.Element;
  }[],
  showNotificationBadge?: boolean
}) {
  const pathname = usePathname()
  const viewdRef = useRef(false)

  useEffect(() => {
    if (!viewdRef?.current) {
      viewdRef.current = true
    }
  }, [])

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
              <div className='relative'>
                {
                  (link.name === "Notifications" && showNotificationBadge && !viewdRef.current) &&
                  <div className={cx('absolute w-3 h-3 -top-[2px] -left-[2px] rounded-full bg-primary ', pathname === link.href && 'bg-white')}></div>
                }
                <link.icon {...{ color: pathname === link.href ? '#fff' : '#000' }} />
              </div>
              <p className="hidden md:block text-sm">{link.name}</p>
            </div>

          </Link>
        );
      })}
    </>
  );
}
