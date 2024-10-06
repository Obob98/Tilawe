import { Schema } from 'mongoose'
import {
    string, ObjectId
} from 'mongoose'

export type BranchType = "Office" | "Shop" | "Factory" | "Storage"

type defs = {
    [key: string]: any
    _id?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface Branch extends defs {
    address?: string
    city?: string
    branch_type: BranchType
}

export interface User extends defs {
    _id: string
    username: string
    email: string
    role: string // ObjectId
}

export interface UserRole extends defs {
    role: 'Admin' | 'Company Manager' | "Supply Chain Manager" | "Branch Manager" | "Procurement Manager"
}


export interface Client extends defs {
    firstname: string
    lastname: string
    address?: string
    email: string
    contact: string
}

export interface Employee extends defs {
    firstname: string
    lastname: string
    job_title?: string
    email: string
    salary?: number
    reports_to?: string //ObjectId
    branch_id: string //ObjectId
}

export interface Inventory extends defs {
    branch_id: string //ObjectId
    product_id: string //ObjectId
    quantity: number
}

export interface Invoice extends defs {
    client_id: string //ObjectId
    amount: number
    due_date?: string | Date
    status: 'paid' | 'pending'
}

export interface Item extends defs {
    name: string
    type: string
}

export interface PaymentMethod extends defs {
    name: 'Mpamba' | 'Airtel Money' | 'Bank' | 'Cash'
}

export interface Payment extends defs {
    amount: number
    invoice_id: string //ObjectId
    client_id: string //ObjectId
    payment_method_id: string //ObjectId
}

export interface Product extends defs {
    name: string
    type: 'Meat Product' | 'Grocery'
    price: number
}

export interface ProductSold extends defs {
    sales_transaction_id: string //ObjectId
    quantity: number
    unit_price: number
    product_id: string //ObjectId
}

export interface PurchasedItem extends defs {
    purchase_transaction_id: string //ObjectId
    quantity: number
    unit_price: number
    item_id: string //ObjectId
}

export interface PurchaseTransaction extends defs {
    purchase_total: number
    supplier_id: string //ObjectId
}

export interface Revenue extends defs {
    month: string,
    revenue: number
}

export interface SalesTransaction extends defs {
    purchase_total: number,
    branch_id: string //ObjectId,
}

export interface Supplier extends defs {
    name: string
    contact: string
    address?: string
}

export interface Salary extends defs {
    amount: number
    grade: string
}

export type TilaweDatabaseEntity = Branch | Client | Employee | Invoice | Inventory | Item | PaymentMethod | Payment | Product | ProductSold | PurchasedItem | PurchaseTransaction | Supplier | Revenue | SalesTransaction | Salaries | User | UserRole