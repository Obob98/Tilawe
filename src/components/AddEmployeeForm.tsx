'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { Button } from '@/ui/button';
import { createEmployee } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { Branch, Employee, } from '@/types';
import { TextInput } from './InputComponents';
import { FetchSalariesReturnType } from '@/lib/dbdirect';
import { useToast } from "@/lib/useToast"
import { Toaster } from "@/components/Toaster"
import CustomSelect from './CustomSelect';


export default function AddEmployeeForm({ Branches, Salaries, Employees }: { Branches: Branch[], Salaries: FetchSalariesReturnType[], Employees: Employee[] }) {

    const { toast } = useToast()

    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createEmployee, initialState);

    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        if (state?.message && state.success) {
            toast({
                title: "Success",
                description: state.message,
                variant: "success",
                duration: 10000,
            })
            if (formRef.current) {
                formRef.current.reset();
            }
        }

    }, [state])

    return (
        <form action={dispatch} ref={formRef} >
            <Toaster />
            <div className="rounded-md bg-gray-50 border border-[#e0e0e0] p-4 md:p-6">
                <div className="flex gap-8 items-center mb-4">
                    <div className='flex-1'>
                        <TextInput {...{ placeholder: "First Name", name: "firstName", id: 'firstname', type: 'text' }} />
                        <div id="FirstName-error" aria-live="polite" aria-atomic="true">
                            {(state?.errors && state.errors?.firstName) &&
                                state.errors.firstName.map((error: string, index: number) => (
                                    <p className="mt-2 text-sm text-red-500" key={index}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                    <div className='flex-1'>
                        <TextInput {...{ placeholder: "Last Name", name: "lastName", id: 'lastname' }} />
                        <div id="LastName-error" aria-live="polite" aria-atomic="true">
                            {(state?.errors && state.errors?.lastName) &&
                                state.errors.lastName.map((error: string, index: number) => (
                                    <p className="mt-2 text-sm text-red-500" key={index}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <CustomSelect {...{ id: "Branch", name: "branchID" }} >
                            <option value="" disabled>
                                Select a Branch
                            </option>
                            {Branches.map((branch, index) => (
                                <option key={index} value={branch._id}>
                                    {branch.address}
                                </option>
                            ))}
                        </CustomSelect>
                    </div>
                    <div id="Client-error" aria-live="polite" aria-atomic="true">
                        {(state?.errors && state.errors?.branchID) &&
                            state.errors.branchID.map((error: string, index: number) => (
                                <p className="mt-2 text-sm text-red-500" key={index}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <CustomSelect {...{ id: "Salary", name: "salary" }} >
                            <option value="" disabled>
                                Select Salary
                            </option>
                            {Salaries.map((salary, index) => (
                                <option key={index} value={salary._id}>
                                    {salary.grade + ' - ' + salary.amount}
                                </option>
                            ))}
                        </CustomSelect>
                    </div>
                    <div id="Client-error" aria-live="polite" aria-atomic="true">
                        {(state?.errors && state.errors?.salary) &&
                            state.errors.salary.map((error: string, index: number) => (
                                <p className="mt-2 text-sm text-red-500" key={index}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <div className="mb-4">
                    <CustomSelect {...{ id: "reports_to", name: "reportsTo" }}>
                        <option value="" disabled>
                            Reports To
                        </option>
                        {Employees.map((employee, index) => (
                            <option
                                key={index}
                                value={employee._id}
                                className='hover:bg-primary'
                            >
                                {employee.firstname + ' - ' + employee.lastname}
                            </option>
                        ))}
                    </CustomSelect>
                    <div id="reports_to-error" aria-live="polite" aria-atomic="true">
                        {(state?.errors && state.errors?.reportsTo) &&
                            state.errors.reportsTo.map((error: string, index: number) => (
                                <p className="mt-2 text-sm text-red-500" key={index}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/invoices"
                    className="flex h-10 items-center rounded-full bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Invoice</Button>
            </div>
        </form>
    );
}
