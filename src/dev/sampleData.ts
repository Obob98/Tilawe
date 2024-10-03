import { Branch, Client, Employee, Inventory, Invoice, Item, Payment, PaymentMethod, Product, ProductSold, PurchasedItem, PurchaseTransaction, Revenue, Salary, SalesTransaction, Supplier } from "@/types";

const branches: Branch[] = [
    {
        branch_type: "Office",
        city: "Lilongwe",
        address: "Maula Mall, shop 1",
    },
    {
        branch_type: "Shop",
        city: "Lilongwe",
        address: "area 25, Nsungwi Market"
    },
    {
        branch_type: "Factory",
        city: "Blantyre",
        address: "Limbe, Noeumu new Avn"
    },
    {
        branch_type: "Storage",
        city: "Lilongwe",
        address: "Kanengo, Mpalapasa load"
    },
    {
        branch_type: "Shop",
        city: "mzuzu",
        address: "Mchenga Utuwa"
    },
]

const salaries: Salary[] = [
    {
        amount: 15000000,
        grade: 'grade 1'
    },
    {
        amount: 28000000,
        grade: 'grade 2'
    },
    {
        amount: 35000000,
        grade: 'grade 3'
    },
    {
        amount: 50000000,
        grade: 'grade 4'
    },
    {
        amount: 75000000,
        grade: 'grade 5'
    },
    {
        amount: 125000000,
        grade: 'grade 6'
    }
]

const clients: Client[] = [
    {
        firstname: "Madaliso",
        lastname: "Tembo",
        contact: "0123456789",
        email: "mada@gmail.com",
        address: "Kawale, Mpinji st",
    },
    {
        firstname: "Grace",
        lastname: "Linje",
        contact: "123456788",
        email: "grace@hotmail.com",
        address: "Area 36, Mpisu st"
    },
    {
        firstname: "Yusufu",
        lastname: "Bottomani",
        email: "yusufu@inmail.com",
        contact: "12345677"
    }
]

const employees: Employee[] = [
    {
        firstname: "Muhammed",
        lastname: "Yasid",
        branch_id: 'placeholder'
    },
    {
        firstname: "Dave",
        lastname: "Bandawe",
        branch_id: 'placeholder'
    },
    {
        firstname: "Maria",
        lastname: "magada",
        branch_id: "placeholder"
    },
    {
        firstname: "Ester",
        lastname: "chiyenda",
        branch_id: "placeholder"
    }
]

const inventory: Inventory[] = [
    {
        product_id: "placeholder",
        quantity: 89,
        branch_id: "placeholder",
    },
    {
        product_id: "placeholder",
        quantity: 25,
        branch_id: "placeholder",
    },
    {
        product_id: "placeholder",
        branch_id: "placeholder",
        quantity: 322
    }
]

const invoices: Invoice[] = [
    {
        client_id: "placeholder",
        amount: 30000000,
        due_date: new Date('Wed sep 18 2024 22:05:00 GMT+0200 (Central Africa Time)'),
        status: "paid",
    },
    {
        client_id: "placeholder",
        amount: 73400045,
        due_date: new Date('Wed sep 18 2024 22:05:00 GMT+0200 (Central Africa Time)'),
        status: "paid",
    },
    {
        client_id: "placeholder",
        amount: 8200000,
        due_date: new Date('Wed dec 12 2024 22:05:00 GMT+0200 (Central Africa Time)'),
        status: "pending"
    },
    {
        client_id: "placeholder",
        amount: 1500000,
        due_date: new Date('Wed dec 12 2024 22:05:00 GMT+0200 (Central Africa Time)'),
        status: "pending"
    },
    {
        client_id: "placeholder",
        amount: 5800033,
        due_date: new Date('Wed aug 04 2023 22:05:00 GMT+0200 (Central Africa Time)'),
        status: "pending"
    },
    {
        client_id: "placeholder",
        amount: 83320030,
        due_date: new Date('Wed nov 30 2024 22:05:00 GMT+0200 (Central Africa Time)'),
        status: "pending"
    },
    {
        client_id: "placeholder",
        amount: 1100000,
        due_date: new Date('Wed may 12 2023 22:05:00 GMT+0200 (Central Africa Time)'),
        status: "paid"
    },
    {
        client_id: "placeholder",
        amount: 4000000,
        due_date: new Date('Thur may 13 2023 17:05:00 GMT+0200 (Central Africa Time)'),
        status: "paid"
    },
    {
        client_id: "placeholder",
        amount: 4800000,
        due_date: new Date('Wed may 02 2022 16:05:00 GMT+0200 (Central Africa Time)'),
        status: "pending"
    },
    {
        client_id: "placeholder",
        amount: 43800000,
        due_date: new Date('Wed feb 26 2022 22:05:00 GMT+0200 (Central Africa Time)'),
        status: "paid"
    }
]

const items: Item[] = [
    {
        name: "goat",
        type: "animal",
    },
    {
        name: "cow",
        type: "animal",
    },
    {
        name: "Kazinga",
        type: "grocery",
    },
]

const payments: Payment[] = [
    {
        invoice_id: "placeholder",
        amount: 1200000,
        client_id: "placeholder",
        payment_method_id: "placeholder"
    },
    {
        invoice_id: "placeholder",
        amount: 6300000,
        client_id: "placeholder",
        payment_method_id: "placeholder"
    },
    {
        invoice_id: "placeholder",
        amount: 2700000,
        client_id: "placeholder",
        payment_method_id: "placeholder"
    }
]

const paymentMethods: PaymentMethod[] = [
    {
        name: "Airtel Money",
    },
    {
        name: "Mpamba"
    },
    {
        name: "Bank"
    },
    {
        name: "Cash"
    }
]

const products: Product[] = [
    {
        name: "Sausage",
        type: "Meat Product",
        price: 550000
    },
    {
        name: "Cooking Oil",
        type: "Grocery",
        price: 610000
    }
]

const productsSold: ProductSold[] = [
    {
        product_id: "placeholder",
        quantity: 78,
        sales_transaction_id: "placeholder",
        unit_price: 2500000
    },
    {
        product_id: "placeholder",
        quantity: 205,
        sales_transaction_id: "placeholder",
        unit_price: 4300000
    }
]

const purchasedItems: PurchasedItem[] = [
    {
        item_id: "placeholder",
        quantity: 89,
        purchase_transaction_id: "placeholder",
        unit_price: 140000
    },
    {
        item_id: "placeholder",
        quantity: 546,
        purchase_transaction_id: "placeholder",
        unit_price: 120000
    }
]

const salesTransactions: SalesTransaction[] = [
    {
        branch_id: 'placeholder',
        purchase_total: 1200000
    },
    {
        branch_id: 'placeholder',
        purchase_total: 2300000
    }
]

const purchaseTransactions: PurchaseTransaction[] = [
    {
        purchase_total: 7,
        supplier_id: "placeholder",
    }
]

const suppliers: Supplier[] = [
    {
        name: 'Paulina Mitanda',
        contact: "12345674",
        address: "Chitukula, Ta Chitukula",
    },
    {
        name: 'Maulidi Bauleni',
        contact: "12345676",
        address: "Chileka, Ta Bauleni",
    }
]

const revenue: Revenue[] = [
    { month: 'Jan', revenue: 200000000 },
    { month: 'Feb', revenue: 180000000 },
    { month: 'Mar', revenue: 220000000 },
    { month: 'Apr', revenue: 250000000 },
    { month: 'May', revenue: 230000000 },
    { month: 'Jun', revenue: 320000000 },
    { month: 'Jul', revenue: 350000000 },
    { month: 'Aug', revenue: 370000000 },
    { month: 'Sep', revenue: 250000000 },
    { month: 'Oct', revenue: 280000000 },
    { month: 'Nov', revenue: 300000000 },
    { month: 'Dec', revenue: 480000000 },
]

const sampleData = {
    branches,
    salaries,
    clients,
    employees,
    inventory,
    invoices,
    items,
    payments,
    paymentMethods,
    products,
    productsSold,
    salesTransactions,
    purchasedItems,
    purchaseTransactions,
    suppliers,
    revenue
}
export default sampleData