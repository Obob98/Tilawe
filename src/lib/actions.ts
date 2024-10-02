'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import InvoiceModel from './db/models/InvoiceModel'
import { ObjectId } from 'mongodb'
import { EmployeeModel } from './db/models'
// import { signIn } from '@/auth'
// import { AuthError } from 'next-auth'

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than MK0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
    firstName: z.string({
        invalid_type_error: 'Please enter first name.',
    })
        .min(3, { message: 'First name must be at least 3 characters long.' })
        .trim()
    ,
    lastName: z.string({
        invalid_type_error: 'Please enter last name.',
    })
        .min(3, { message: 'Last name must be at least 3 characters long.' })
        .trim(),
    branchID: z.string({
        invalid_type_error: 'Please select branch.',
    }),
})

export type createInvoiceState = {
    errors?: {
        customerId?: string[]
        amount?: string[]
        status?: string[]
    }
    message?: string | null
}

const CreateInvoice = FormSchema.omit({ id: true, date: true, firstName: true, lastName: true, branchID: true })
export async function createInvoice(prevState: createInvoiceState, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        }
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data
    const amountInCents = Math.round(amount * 100)
    const date = new Date().toISOString().split('T')[0]

    console.log({ customerId })

    const newInvoice = await InvoiceModel.create({ client_id: new ObjectId(customerId), amount: amountInCents, status, due_date: date, })
    console.log({ newInvoice })


    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true })
export async function updateInvoice(
    id: string,
    due_date: string,
    prevState: createInvoiceState,
    formData: FormData,
) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        }
    }

    const { customerId, amount, status } = validatedFields.data
    const amountInCents = Math.round(amount * 100)

    try {
        console.log({ id, customerId, amount: amountInCents, status, due_date })
        const updatedInvoice = await InvoiceModel.findOneAndUpdate({ _id: id }, { customerId, amount: amountInCents, status, due_date })

        console.log({ updatedInvoice })
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' }
    }

    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}

export async function deleteInvoice(id: string) {
    // throw new Error('Failed to Delete Invoice')
    try {
        await InvoiceModel.findOneAndDelete(new ObjectId(id))
        revalidatePath('/dashboard/invoices')
        return { message: 'Deleted Invoice.' }
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' }
    }
}

export type createEmployeeState = {
    errors?: {
        firstName?: string[]
        lastName?: string[]
        branchID?: string[]
    }
    message?: string | null
}

const CreateEmployee = FormSchema.omit({ id: true, date: true, customerId: true, amount: true, status: true })
export async function createEmployee(prevState: createEmployeeState, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateEmployee.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        branchID: formData.get('branchID'),
    })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        }
    }

    // Prepare data for insertion into the database
    const { firstName, lastName, branchID } = validatedFields.data

    console.log({ firstName, lastName, branchID })

    const newEmployee = await EmployeeModel.create({ firstname: firstName, lastname: lastName, branch_id: new ObjectId(branchID), salary: 80000000 })
    console.log({ newEmployee })


    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        // await signIn('credentials', formData)
    } catch (error) {
        // if (error instanceof AuthError) {
        //     switch (error.type) {
        //         case 'CredentialsSignin':
        //             return 'Invalid credentials.'
        //         default:
        //             return 'Something went wrong.'
        //     }
        // }
        throw error
    }
}