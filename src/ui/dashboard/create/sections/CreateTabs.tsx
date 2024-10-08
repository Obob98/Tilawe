'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/tremorComponents/Tabs"
import { CreatUserIcon, InvoiceIcon } from "@/assets/SVGComponents"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import TabsCreateUserContent from "../components/TabsCreateUserContent"
import TabsCreateInvoiceContent from "../components/TabsCreateInvoiceContent"
import { Branch, Client, Employee } from "@/types"
import { FetchSalariesReturnType } from "@/lib/dbdirect"



export default function CreateTabs({ Clients, Branches, Salaries, Employees }: { Clients: Client[], Branches: Branch[], Salaries: FetchSalariesReturnType[], Employees: Employee[] }) {
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
                                <TabsTrigger value="createUser" className="inline-flex gap-1 group">
                                    <a href="#createUser" className="hidden group-data-[state=active]:block overflow-hidden">
                                        <CreatUserIcon {...{ color: '#fa4040', width: "1.3em" }} />
                                    </a>
                                    <a href="#createUser" className="hidden group-data-[state=inactive]:block overflow-hidden">
                                        <CreatUserIcon {...{ color: '#606060', width: "1.3em" }} />
                                    </a>
                                    <a href="#createUser">
                                        User
                                    </a>
                                </TabsTrigger>
                                <TabsTrigger value="createInvoice" className="inline-flex gap-2 group">
                                    <a href="#createInvoice" className="hidden group-data-[state=active]:block overflow-hidden">
                                        <InvoiceIcon {...{ color: '#fa4040' }} />
                                    </a>
                                    <a href="#createInvoice" className="hidden group-data-[state=inactive]:block overflow-hidden">
                                        <InvoiceIcon {...{ color: '#606060' }} />
                                    </a>
                                    <a href="#createInvoice">
                                        Invoice
                                    </a>
                                </TabsTrigger>
                            </TabsList>
                            <div className="mt-4 px-8 py-4">
                                <TabsContent value="createUser">
                                    <TabsCreateUserContent {...{ Branches, Salaries, Employees }} />
                                </TabsContent>
                                <TabsContent value="createInvoice">
                                    <TabsCreateInvoiceContent {...{ Clients }} />
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