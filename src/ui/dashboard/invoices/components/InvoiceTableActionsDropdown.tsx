"use client"

import { ReactNode } from "react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/tremorComponents/DropdownMenu"
import { Elipsis } from "@/assets/SVGComponents"
import { cx } from "@/lib/utils"
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuIconWrapper,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/tremorComponents/DropdownMenu"
import Link from "next/link"
import { deleteInvoice } from "@/actions/invoiceActions"
import { RiDeleteBin2Line, RiEdit2Line } from "@remixicon/react";

export default function InvoiceTableActionsDropdown({ id }: { id: string }) {
  return (
    <div className={cx("w-fit flex items-center justify-start")}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          < button className="cursor-pointer" >
            <Elipsis />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <Link
              href={`/dashboard/invoices/${id}/edit`}
              className="w-full">
              <DropdownMenuItem className="w-full flex items-center gap-x-1 justify-between" >
                Update Invoice
                <DropdownMenuIconWrapper>
                  <RiEdit2Line className="size-4 text-inherit" />
                </DropdownMenuIconWrapper>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={e => e.stopPropagation()} >
              <span className="w-full  flex items-center gap-x-1 justify-between">
                <DeleteInvoice {...{ id }} />
                <DropdownMenuIconWrapper>
                  <RiDeleteBin2Line className="size-4 text-inherit" />
                </DropdownMenuIconWrapper>
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
    <form action={deleteInvoiceWithId} className="w-full">
      <button type="submit" className=" w-full text-start">Delete</button>
    </form>
  )
}