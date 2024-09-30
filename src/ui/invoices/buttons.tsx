import Link from 'next/link';
import { deleteInvoice } from '@/lib/actions';
import { AddIcon } from '@/assets/SVGComponents';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex gap-2 h-10 items-center rounded-md bg-primary py-6 px-4 text-sm font-medium text-white transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
    >
      <AddIcon {...{ color: '#fff' }} />
      <span className="hidden md:block">Create Invoice</span>{' '}
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      {/* <PencilIcon className="w-5" /> */}
      Edit
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <form action={deleteInvoiceWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        {/* <TrashIcon className="w-5" /> */}
        Delete
      </button>
    </form>
  );
}
