'use client';

import { Button } from '@/tremorComponents/Button';
import { createInvoice } from '@/actions/invoiceActions';
import { useFormState } from 'react-dom';
import { Client } from '@/types';
import { useEffect, useRef } from 'react';
import { useToast } from '@/customHooks/useToast';
import { Toaster } from '@/ui/dashboard/components/Toaster';
import CustomSelect from '@/ui/dashboard/components/CustomSelect';

export default function CreateInvoiceForm({ Clients }: { Clients: Client[] }) {
    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createInvoice, initialState);
    const { toast } = useToast()

    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        if (state?.message && state.success) {
            toast({
                title: "Success",
                description: state.message,
                variant: "success",
                duration: 10000,
            })
        }

        if (formRef.current) {
            formRef.current.reset();
        }
    }, [state])

    return (
        <form action={dispatch} ref={formRef} >
            <Toaster />
            <div className="rounded-md bg-gray-50 border border-[#e0e0e0] p-4 md:p-6">
                {/* Customer Name */}
                <div className="mb-4">
                    <div className="relative">
                        <CustomSelect {...{ id: "Client", name: "customerId" }}>
                            <option value="" disabled>
                                Select a Client
                            </option>
                            {Clients.map((Client) => (
                                <option key={Client._id} value={Client._id}>
                                    {Client.firstname}
                                    {' '}
                                    {Client.lastname}
                                </option>
                            ))}
                        </CustomSelect>
                        {/* <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
                    </div>
                    <div id="Client-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.customerId &&
                            state.errors.customerId.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* Invoice Amount */}
                <div className="mb-4">
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                step="0.01"
                                placeholder="Enter MWK amount"
                                className="peer block w-full rounded-md border border-gray-300 py-2 pl-12 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="amount-error"
                            />
                            <div className="pointer-events-none absolute left-3 top-1/2 h-fit w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-900 flex gap-1 items-center">
                                <div>MK</div>
                                <div>|</div>
                            </div>
                        </div>
                        <div id="amount-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.amount &&
                                state.errors.amount.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Invoice Status */}
                <fieldset>
                    {/* <legend className="mb-2 block text-sm font-medium">
                        Set the invoice status
                    </legend> */}
                    <div className="rounded-full border border-gray-300 bg-white px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="pending"
                                    name="status"
                                    type="radio"
                                    value="pending"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    aria-describedby="status-error"
                                />
                                <label
                                    htmlFor="pending"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium bg-gray-50 border border-gray-500/30 text-gray-900"
                                >
                                    Pending
                                    {/* <ClockIcon className="h-4 w-4" /> */}
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="paid"
                                    name="status"
                                    type="radio"
                                    value="paid"
                                    className="h-4 w-4 cursor-pointer border border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="paid"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full  px-3 py-1.5 text-xs font-medium bg-emerald-50 border border-emerald-400 text-emerald-900"
                                >
                                    Paid
                                    {/* <CheckIcon className="h-4 w-4" /> */}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div id="Client-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.status &&
                            state.errors.status.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </fieldset>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Button type="submit" {...{ className: 'rounded-full hover:bg-primary hover:text-white', variant: 'secondary' }}>Create Invoice</Button>
            </div>
        </form>
    );
}