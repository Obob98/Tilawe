'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import InvoiceModel from './db/models/InvoiceModel'
import { ObjectId } from 'mongodb'
import { EmployeeModel, SalaryModel, SupplierModel } from './db/models'
// import { signIn } from '@/auth'
// import { AuthError } from 'next-auth'

const CreateInvoiceFormSchema = z.object({
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
})


export type createInvoiceState = {
    errors?: {
        customerId?: string[]
        amount?: string[]
        status?: string[]
    }
    message?: string | null
}

const CreateInvoice = CreateInvoiceFormSchema.omit({ id: true, date: true })
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
    return { message: `successfully created invoice`, success: true }
}

const UpdateInvoice = CreateInvoiceFormSchema.omit({ id: true, date: true })
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

const CreateEmployeeFormSchema = z.object({
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
    salary: z.string({
        invalid_type_error: 'Please select salary',
    })
        .trim(),
    branchID: z.string({
        invalid_type_error: 'Please select branch.',
    }),
    reportsTo: z.string({
        invalid_type_error: 'Please select branch.',
    }),
})

export type createEmployeeState = {
    errors?: {
        firstName?: string[]
        lastName?: string[]
        branchID?: string[]
        salary?: string[]
        reportsTo?: string[]
    }
    message?: string | null
}

export async function createEmployee(prevState: createEmployeeState, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateEmployeeFormSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        branchID: formData.get('branchID'),
        salary: formData.get('salary'),
        reportsTo: formData.get('reportsTo'),
    })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        }
    }

    // Prepare data for insertion into the database
    const { firstName, lastName, branchID, salary, reportsTo } = validatedFields.data

    const { amount } = await SalaryModel.findById(new ObjectId(salary))
    const salaryAmount = Number(amount)

    const newEmployee = await EmployeeModel.create({ firstname: firstName, lastname: lastName, branch_id: new ObjectId(branchID), salary: salaryAmount, reports_to: new ObjectId(reportsTo) })

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/create')
    return { message: `added ${firstName} ${lastName} successfully`, success: true }
}

const CreateSupplierFormSchema = z.object({
    name: z.string({
        invalid_type_error: 'Please enter first name.',
    })
        .min(3, { message: 'Name must be at least 3 characters long.' })
        .trim()
    ,
    contact: z.string({
        invalid_type_error: 'Please enter contact.',
    })
        .min(8, { message: 'contact must be at least 8 characters long.' })
        .trim()
    ,
    address: z.string({
        invalid_type_error: 'Please enter address',
    })
        .min(6, { message: 'address info must be at least 6 characters long.' })
        .trim()
})

export type createSupplierState = {
    errors?: {
        name?: string[]
        contact?: string[]
        address?: string[]
    }
    message?: string | null
}

export async function createSupplier(prevState: createSupplierState, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateSupplierFormSchema.safeParse({
        name: formData.get('name'),
        contact: formData.get('contact'),
        address: formData.get('address'),
    })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        }
    }

    // Prepare data for insertion into the database
    const { name, contact, address } = validatedFields.data


    const newSupplier = await SupplierModel.create({ name, contact, address })

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/create')
    return { message: `added ${name} successfully`, success: true }
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