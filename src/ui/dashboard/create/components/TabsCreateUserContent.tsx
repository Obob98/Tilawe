import { Branch, Employee } from "@/types"
import { CreateUserCard } from "./CreateUserCard"
import AddEmployeeForm from "./AddEmployeeForm"
import { FetchSalariesReturnType } from "@/lib/dbdirect"
import AddSupplierForm from "./AddSupplierForm"

export default function TabsCreateUserContent({ Branches, Salaries, Employees }: { Branches: Branch[], Salaries: FetchSalariesReturnType[], Employees: Employee[] }) {
    return (
        <div className="w-full space-y-8">

            <CreateUserCard {...{ title: 'Employee', subTitle: 'Add Employee' }}>
                <AddEmployeeForm {...{ Branches, Salaries, Employees }} />
            </CreateUserCard>

            <CreateUserCard {...{ title: 'Supplier', subTitle: 'Add Supplier' }}>
                <AddSupplierForm />
            </CreateUserCard>

        </div>
    )
}