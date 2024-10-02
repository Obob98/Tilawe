"use client"

import React from "react"

import { Button } from "@/components/Button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/DropdownMenu"
import { Caret } from "@/assets/SVGComponents"

export const DropdownMenuRadioExample = () => {
    const [sort, setSort] = React.useState("alpha")
    return (
        <div className="flex justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button {...{ style: { background: '#fa4040', borderRadius: '4px', fontSize: '12px', paddingBlock: '12px' } }}>Area 25 Shop <Caret /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Sorting</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                            <DropdownMenuRadioItem value="alpha" hint="A–Z">
                                Alphabetical
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="alpha-reverse" hint="Z-A">
                                Reverse Alphabetical
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="asc" hint="1-99">
                                Created At
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}