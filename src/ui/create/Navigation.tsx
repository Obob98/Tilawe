'use client'

import { Button } from "@/components/Button";
import { usePathname } from "next/navigation";

export default function Navigation() {

    return (
        <>
            <Button {...{ variant: 'custom', className: `rounded-none text-primarys shadow-none ${'border-b-2 border-b-primary'} ` }}>
                User
            </Button>
            <Button {...{ variant: 'custom', className: `rounded-none text-primarys shadow-none ${'border-b-2 border-b-primary'} ` }}>
                User
            </Button>
        </>
    )
}
