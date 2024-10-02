'use client';

import Link from 'next/link';
// import {
//   CheckIcon,
//   ClockIcon,
//   CurrencyDollarIcon,
//   UserCircleIcon,
// } from '@heroicons/react/24/outline';
import { Button } from '@/ui/button';
import { createEmployee } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { Branch, Client, Invoice } from '@/types';
import { TextInput } from './InputComponents';

type InitialState = {
    errors: {
        firstName?: string[] | undefined;
        lastName?: string[] | undefined;
        branchID?: string[] | undefined;
        // BranchID?: string[] | undefined;
    };
    message: string;
}

export default function AddEmployeeForm({ Branches }: { Branches: Branch[] }) {
    const initialState: InitialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createEmployee, initialState);

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 border border-[#e0e0e0] p-4 md:p-6">
                <div className="flex gap-8 items-center mb-4">
                    <div className='flex-1'>
                        <TextInput {...{ placeholder: "First Name", name: "firstName", id: 'firstname', type: 'text' }} />
                        <div id="FirstName-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.firstName &&
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
                            {state.errors?.lastName &&
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
                        <select
                            id="Branch"
                            name="branchID"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                            aria-describedby="Client-error"
                        >
                            <option value="" disabled>
                                Select a Client
                            </option>
                            {Branches.map((branch, index) => (
                                <option key={index} value={branch._id}>
                                    {branch.address}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div id="Client-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.branchID &&
                            state.errors.branchID.map((error: string, index: number) => (
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
