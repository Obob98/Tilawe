import { Branch, Employee } from "@/types"
import { Button } from "./Button"
import { TextInput } from "./InputComponents"
import { SelectComponent } from "./SelectComponent"
import { CreateUserCard } from "./CreateUserCard"
import AddEmployeeForm from "./AddEmployeeForm"
import { FetchSalariesReturnType } from "@/lib/dbdirect"
import AddSupplierForm from "./AddSupplierForm"


const selectRoleData = [
    {
        value: "companymanager",
        label: "Company Manager",
    },
    {
        value: "shopmanager",
        label: "Shop Manager",
    },
    {
        value: "buyers",
        label: "Buyers",
    },
]

const selectSalaryData = [
    {
        value: "1200000",
        label: "MK1,2000,000.00",
    },
    {
        value: "700000",
        label: "MK700,000.00",
    },
    {
        value: "400000",
        label: "MK400,000.00",
    },
]

export default function TabsCreateUserContent({ Branches, Salaries, Employees }: { Branches: Branch[], Salaries: FetchSalariesReturnType[], Employees: Employee[] }) {
    return (
        <div className="w-full space-y-8">

            <CreateUserCard {...{ title: 'Employee', subTitle: 'Add Employee' }}>
                <AddEmployeeForm {...{ Branches, Salaries, Employees }} />
            </CreateUserCard>

            <CreateUserCard {...{ title: 'Supplier', subTitle: 'Add Supplier' }}>
                <AddSupplierForm />
            </CreateUserCard>

            {/* <AddEmployee {...{ Branches }} /> */}

            {/* <AddSupplier /> */}
        </div>
    )
}


function AddEmployee({ Branches }: { Branches: Branch[] }) {
    const selectBranchesData = Branches.map(branch => (
        {
            value: branch._id as string,
            label: branch.address as string,
        }
    ))

    return (
        <div className="flex gap-0 flex-col bg-white p-2 rounded-md border border-[#e0e0e0] shadow-sm max-w-[800px]">
            <div className="flex-1 p-8 flex gap-2 items-center justify-between">
                <h2 className="text-xl font-bold text-gray-600">Employee</h2>
                <p className="text-gray-500 text-sm">Add employee</p>
            </div>
            <form className="w-full max-w-[800px] block space-y-4  items-start justify-start flex-[2] border border-[#e0e0e0] bg-gray-50 p-4 rounded-md">
                <div className="flex gap-8 items-center">
                    <TextInput {...{ placeholder: "First Name" }} />
                    <TextInput {...{ placeholder: "Last Name" }} />
                </div>
                <SelectComponent {...{ data: selectBranchesData, placeholder: 'Select Branch' }} />
                <div className="flex gap-8 items-center">
                    <SelectComponent {...{ data: selectRoleData, placeholder: 'Select Role' }} />
                    <SelectComponent {...{ data: selectSalaryData, defaultValue: '', placeholder: 'Select Salary' }} />
                </div>
                <div className="flex gap-4 items-center justify-end">
                    <Button {...{ variant: 'secondary', className: 'rounded-full' }}>
                        cancel
                    </Button>
                    <Button {...{ variant: 'primary', className: 'rounded-full' }}>
                        create
                    </Button>
                </div>
            </form>
        </div>
    )
}

function AddSupplier() {
    return (
        <div className="flex gap-0 flex-col bg-white p-2 rounded-md border border-[#e0e0e0] shadow-sm max-w-[800px]">
            <div className="flex-1 p-8 flex gap-2 items-center justify-between">
                <h2 className="text-xl font-bold text-gray-600">Supplier</h2>
                <p className="text-gray-500 text-sm">Add Supplier</p>
            </div>
            <form className="w-full max-w-[800px] block space-y-4  items-start justify-start flex-[2] border border-[#e0e0e0] bg-gray-50 p-4 rounded-md">
                <div className="flex gap-8 items-center">
                    <TextInput {...{ placeholder: "First Name" }} />
                    <TextInput {...{ placeholder: "Last Name" }} />
                </div>
                <TextInput {...{ placeholder: "Phone Number" }} />
                <TextInput {...{ placeholder: "Address" }} />
                <div className="flex gap-4 items-center justify-end">
                    <Button {...{ variant: 'secondary' }}>
                        cancel
                    </Button>
                    <Button {...{ variant: 'primary' }}>
                        create
                    </Button>
                </div>
            </form>
        </div>
    )
}