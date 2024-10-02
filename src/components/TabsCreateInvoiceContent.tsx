import { Button } from "./Button"
import { TextInput } from "./InputComponents"
import { SelectComponent } from "./SelectComponent"
import { Client } from "@/types"
import CreateInvoiceForm from "./CreateInvoiceForm"
import { CreateUserCard } from "./CreateUserCard"

export default function TabsCreateInvoiceContent({ Clients }: { Clients: Client[] }) {
    return (
        <CreateUserCard {...{ title: 'Invoice', subTitle: 'Create Invoice' }}>
            <CreateInvoiceForm Clients={Clients} />
        </CreateUserCard>
    )
}


