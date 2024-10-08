'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/tremorComponents/Tabs"
import { CreatUserIcon, InvoiceIcon } from "@/assets/SVGComponents"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import TabsReviewCenterContent from "./TabsReviewCenterContent"
import { RiCoinsLine, RiUser2Line, RiClockwise2Line, RiAB } from "@remixicon/react";


export default function ReviewCenterTabs() {
    const [currentsection, setCurrentSection] = useState('')

    useEffect(() => {

        setCurrentSection('createUser')

        if (typeof window !== 'undefined') {
            if (window.location.hash === '#createUser') {
                setCurrentSection('createUser')
            }
            if (window.location.hash === '#createInvoice') {

                setCurrentSection('createInvoice')
            }
        }
    }, [currentsection])

    const pathname = usePathname()



    return (
        <>
            {
                currentsection.length
                    ? (
                        <Tabs defaultValue={currentsection}>
                            <TabsList variant="line" className="bg-white shadow-sm pt-[52px] px-8 gap-8 sticky top-0 z-40">
                                <TabsTrigger value="Financial" className="inline-flex gap-1 group">
                                    <a href="#createUser">
                                        <RiCoinsLine className="size-4 text-inherit" />
                                    </a>
                                    <a href="#createUser">
                                        Financial
                                    </a>
                                </TabsTrigger>
                                <TabsTrigger value="Project" className="inline-flex gap-1 group">
                                    <a href="#createUser">
                                        <RiClockwise2Line className="size-4 text-inherit" />
                                    </a>
                                    <a href="#createUser">
                                        Project
                                    </a>
                                </TabsTrigger>
                                <TabsTrigger value="Personal" className="inline-flex gap-1 group">
                                    <a href="#createUser">
                                        <RiUser2Line className="size-4 text-inherit" />
                                    </a>
                                    <a href="#createUser">
                                        Personal
                                    </a>
                                </TabsTrigger>
                                <TabsTrigger value="Other" className="inline-flex gap-2 group">
                                    <a href="#createInvoice">
                                        <RiAB className="size-4 text-inherit" />
                                    </a>
                                    <a href="#createInvoice">
                                        Other
                                    </a>
                                </TabsTrigger>
                            </TabsList>
                            <div className="mt-4 px-8 py-4">
                                <TabsContent value="Financial">
                                    <TabsReviewCenterContent placeholder="No financial documents to review at the moment" />
                                </TabsContent>
                                <TabsContent value="Project">
                                    <TabsReviewCenterContent placeholder="No project documents to review at the moment" />
                                </TabsContent>
                                <TabsContent value="Personal">
                                    <TabsReviewCenterContent placeholder="No personal request to review at the moment" />
                                </TabsContent>
                                <TabsContent value="Other">
                                    <TabsReviewCenterContent placeholder="Nothing to review at the moment" />
                                </TabsContent>
                            </div>
                        </Tabs>
                    )
                    : (
                        <div className="absolute top-10 left-10">
                            <p>Loading...</p>
                        </div>
                    )
            }
        </>
    )
}