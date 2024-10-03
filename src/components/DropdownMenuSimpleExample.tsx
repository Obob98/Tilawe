
"use client"

import React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu"
import { Elipsis } from "@/assets/SVGComponents"
import Link from "next/link"
import { deleteInvoice } from "@/lib/actions"

export const DropdownMenuSimpleExample = ({ id }: { id: string }) => {
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            <Elipsis />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem hint="Pro">
              <Link
                href={`/dashboard/invoices/${id}/edit`}
              >
                Update Invoice
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem shortcut="⌘T">
              <DeleteInvoice {...{ id }} />
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