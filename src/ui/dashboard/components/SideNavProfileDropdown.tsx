"use client"

import {
  DropdownMenu,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTrigger,
  DropdownMenuTrigger,
} from "@/tremorComponents/DropdownMenu"
import { cx } from "@/lib/utils"
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuIconWrapper,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/tremorComponents/DropdownMenu"
import { deleteInvoice } from "@/actions/invoiceActions"
import { RiMore2Line, RiLogoutBoxLine, RiColorFilterLine, RiSunLine, RiMoonLine, RiComputerLine } from "@remixicon/react";
import { useState } from "react"
import { DoubleCaret } from "@/assets/SVGComponents"
import { signOut } from "next-auth/react"

export default function SideNavProfileDropdown() {
  const [sort, setSort] = useState("alpha")


  return (
    <div className={cx("w-full md:flex items-center justify-start hidden")}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='w-full gap-4 flex items-center justify-between px-4 py-4 border-t border-t-[#e0e0e0] hover:bg-gray-100'
          >
            <div className='w-10 h-10 rounded-full bg-slate-200 grid place-content-center'>UN</div>
            <p className='flex-1 text-left'>User Name</p>

            <DoubleCaret {...{ strokeWidth: 0.1 }} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent >
          <DropdownMenuLabel>Tilawe Meat Merchants</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuSubMenu>
              <DropdownMenuSubMenuTrigger>
                <span className="flex items-center gap-x-2">
                  <RiColorFilterLine className="size-4 text-inherit" />
                  <span>Theme</span>
                </span>
              </DropdownMenuSubMenuTrigger>
              <DropdownMenuSubMenuContent>
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  <DropdownMenuRadioItem value="alpha" >
                    <span className="w-full flex items-center gap-x-1 justify-between">
                      <span>Light</span>
                      <RiSunLine className="size-4 text-inherit" />
                    </span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="alpha-reverse" >
                    <span className="w-full flex items-center gap-x-1 justify-between">
                      <span>Dark</span>
                      <RiMoonLine className="size-4 text-inherit" />
                    </span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="asc" >
                    <span className="w-full flex items-center gap-x-1 justify-between">
                      <span>System</span>
                      <RiComputerLine className="size-4 text-inherit" />
                    </span>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>

              </DropdownMenuSubMenuContent>
            </DropdownMenuSubMenu>
            <DropdownMenuItem >
              <span className="flex items-center gap-x-2">
                <RiLogoutBoxLine className="size-4 text-inherit" />
                <button onClick={() => signOut()}>Sign out</button>
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <form action={deleteInvoiceWithId} className="w-full ">
      <button type="submit" className=" w-full text-start">Delete</button>
    </form>
  )
}