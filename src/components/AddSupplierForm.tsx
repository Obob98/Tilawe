'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { Button } from '@/ui/button';
import { createEmployee, createSupplier } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { Branch, Employee, } from '@/types';
import { TextInput } from './InputComponents';
import { FetchSalariesReturnType } from '@/lib/dbdirect';
import { useToast } from "@/lib/useToast"
import { Toaster } from "@/components/Toaster"
import CustomSelect from './CustomSelect';


export default function AddSupplierForm() {

    const { toast } = useToast()

    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createSupplier, initialState);

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
            <div className="rounded-md bg-gray-50 border border-[#e0e0e0] p-4 md:p-6 space-y-4">
                <div className='flex-1'>
                    <TextInput {...{ placeholder: "Supplier Name", name: "name", id: 'name', type: 'text' }} />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        {(state?.errors && state.errors?.name) &&
                            state.errors.name.map((error: string, index: number) => (
                                <p className="mt-2 text-sm text-red-500" key={index}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <div className='flex-1'>
                    <TextInput {...{ placeholder: "Supplier Contact", name: "contact", id: 'contact' }} />
                    <div id="contact-error" aria-live="polite" aria-atomic="true">
                        {(state?.errors && state.errors?.contact) &&
                            state.errors.contact.map((error: string, index: number) => (
                                <p className="mt-2 text-sm text-red-500" key={index}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <div className='flex-1'>
                    <TextInput {...{ placeholder: "Supplier Adrress", name: "address", id: 'address' }} />
                    <div id="address-error" aria-live="polite" aria-atomic="true">
                        {(state?.errors && state.errors?.address) &&
                            state.errors.address.map((error: string, index: number) => (
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
