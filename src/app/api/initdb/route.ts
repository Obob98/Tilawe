import { Model } from "mongoose";
import { Decimal128, ObjectId } from 'mongodb'

import sampleData from "@/dev/sampleData";
import connectDB from "@/lib/db/config/connectDB";
import EmployeeModel from "@/lib/db/models/EmployeeModel";
import ProductModel from "@/lib/db/models/ProductModel";
import BranchModel from "@/lib/db/models/BranchModel";
import { TilaweDatabaseEntity } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import InvoiceModel from "@/lib/db/models/InvoiceModel";
import ClientModel from "@/lib/db/models/ClientModel";
import PaymentModel from "@/lib/db/models/PaymentModel";
import ProductSoldModel from "@/lib/db/models/ProductSoldModel";
import SupplierModel from "@/lib/db/models/SupplierModel";
import PurchaseTransactionModel from "@/lib/db/models/PurchaseTransactionModel";
import ItemModel from "@/lib/db/models/ItemModel";
import PurchasedItemsModel from "@/lib/db/models/PurchasedItemModel";
import PaymentMethodModel from "@/lib/db/models/PaymentMethodModel";
import RevenueModel from "@/lib/db/models/RevenueModel";
import SalesTransactionModel from "@/lib/db/models/SalesTransactionModel";
import asyncHandler from "@/middleware/asyncHandler";
import errorHandler from "@/middleware/errorHandler";
import InventoryModel from "@/lib/db/models/InventoryModel";


export async function GET(req: NextRequest) {

    try {
        connectDB()

        SeedDataBase()

        return NextResponse.json({ message: 'seeding successfull' })
    } catch (error) {
        errorHandler(error, '', '', '',)
        console.log('error in API text route', error)

        return NextResponse.json(
            { error: 'some server error' },
            { status: 500 }
        )
    }

}


export async function POST(req: NextRequest) {

    try {
        connectDB()

        SeedDataBase()

        return NextResponse.json({ message: 'seeding successfull' })
    } catch (error) {
        errorHandler(error, '', '', '',)
        console.log('error in API text route', error)

        return NextResponse.json(
            { error: 'some server error' },
            { status: 500 }
        )
    }

}

async function SeedDataBase() {
    await populateRevenue()
    await populateBranches()
    await populateClients()
    await populateSuppliers()
    await populateItems()
    await populateProducts()
    await populatePaymentMethods()
    await populateInvoices()
    await populateEnventory()
    await populateSalesTransactions()
    await populateProductsSold()
    await populatePurchaseTransactions()
    await populatePurchaseItems()
    await populatePayments()
    await populateEmployees()

    return true
}

const { branches, clients, employees, inventory, invoices, items, payments, paymentMethods, products, productsSold, purchasedItems, salesTransactions, purchaseTransactions, suppliers, revenue
} = sampleData

async function populateRevenue() {
    const data = await RevenueModel.insertMany(revenue)

    return data
}


async function populateBranches() {
    const data = await BranchModel.insertMany(branches)

    return data
}


async function populateClients() {
    const data = await ClientModel.insertMany(clients)

    return data
}


async function populateSuppliers() {
    const data = await SupplierModel.insertMany(suppliers)

    return data
}

async function populateItems() {
    const data = await ItemModel.insertMany(items)

    return data
}

async function populateProducts() {
    const data = await ProductModel.insertMany(products)

    return data
}

async function populatePaymentMethods() {
    const data = await PaymentMethodModel.insertMany(paymentMethods)

    return data
}

async function populateEnventory() {
    let data = []
    for (let inventoryItem of inventory) {

        const { quantity } = inventoryItem

        const product_id = await randomID(ProductModel)
        const branch_id = await randomID(BranchModel)

        const newInventoryItem = { product_id, quantity, branch_id, }


        const res = await InventoryModel.create(newInventoryItem)

        data.push(res)
    }

    return data
}

async function populateSalesTransactions() {
    let data = []
    for (let salesTransaction of salesTransactions) {

        const { purchase_total } = salesTransaction

        const branch_id = await randomID(BranchModel)

        const newSalesTransaction = { branch_id, purchase_total }

        const res = await SalesTransactionModel.create(newSalesTransaction)

        data.push(res)
    }

    return data
}

async function populateProductsSold() {
    let data = []
    for (let productSold of productsSold) {

        const { quantity, unit_price } = productSold

        const product_id = await randomID(ProductModel)
        const sales_transaction_id = await randomID(SalesTransactionModel)

        const newSalesTransaction = { product_id, quantity, sales_transaction_id, unit_price }

        const res = await ProductSoldModel.create(newSalesTransaction)

        data.push(res)
    }

    return data
}

async function populatePurchaseTransactions() {
    let data = []
    for (let purchaseTransaction of purchaseTransactions) {

        const { purchase_total } = purchaseTransaction

        const supplier_id = await randomID(SupplierModel)

        const newPurchaseTransaction = { purchase_total, supplier_id }

        const res = await PurchaseTransactionModel.create(newPurchaseTransaction)

        data.push(res)
    }

    return data
}

async function populatePurchaseItems() {
    let data = []
    for (let purchasedItem of purchasedItems) {

        const { quantity, unit_price } = purchasedItem

        const item_id = await randomID(ItemModel)
        const purchase_transaction_id = await randomID(PurchaseTransactionModel)

        const newPurchaseItem = { item_id, purchase_transaction_id, quantity, unit_price }

        const res = await PurchasedItemsModel.create(newPurchaseItem)

        data.push(res)
    }

    return data
}

async function populatePayments() {
    let data = []
    for (let payment of payments) {

        const { amount, payments } = payment

        const client_id = await randomID(ClientModel)
        const invoice_id = await randomID(InvoiceModel)
        const payment_method_id = await randomID(PaymentMethodModel)

        const newPayment = { amount, payments, client_id, invoice_id, payment_method_id }

        const res = await PaymentModel.create(newPayment)

        data.push(res)
    }

    return data
}

async function populateEmployees() {
    let data = []
    for (let employee of employees) {

        const { firstname, lastname, job_title, salary } = employee

        const branch_id = await randomID(BranchModel)

        const newEmployee = { firstname, lastname, job_title, salary, branch_id }


        const res = await EmployeeModel.create(newEmployee)

        data.push(res)
    }

    return data
}

async function populateInvoices() {
    let data = []
    for (let invoice of invoices) {

        const { amount, due_date, status } = invoice

        const client_id = await randomID(ClientModel)

        const newInvoice = { client_id, amount, due_date, status }


        const res = await InvoiceModel.create(newInvoice)

        data.push(res)
    }

    return data
}

type ModelProp = Model<any, {}, {}, {}, any, any>
async function randomID(Model: ModelProp) {
    const data = await Model.find()
    let id: ObjectId | null = null
    if (data.length) {
        let randomIndex = Math.floor(Math.random() * data.length)
        id = data[randomIndex]._id
    }
    return id
}