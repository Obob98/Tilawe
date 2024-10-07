
import InvoiceStatus from '@/ui/dashboard/invoices/components/status';
import { formatDateToLocal, formatCurrency } from '@/lib/utils';
import { fetchFilteredInvoices } from '@/lib/data';
import InvoiceTableActionsDropdown from './InvoiceTableActionsDropdown';
import { Card } from '@/tremorComponents/Card';


export default async function InvoicesTable({
  query,
  currentPage,
  canEdit
}: {
  query: string;
  currentPage: number;
  canEdit: boolean
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="custom mt-4 flow-roo">
      <div className="inline-block min-w-full align-middle">
        <Card className="rounded-lg  p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice: any) => (
              <div
                key={invoice._id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
                      {/* <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.client_id.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.due_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    more
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-center">
                  Status
                </th>
                {
                  canEdit &&
                  <th scope="col" className="px-3 py-5 font-medium text-center">
                    Actions
                  </th>
                }
              </tr>
            </thead>
            <tbody className=" rounded-lg bg-[#f5f6f9]">
              {invoices?.map((invoice: any, i: number) => (
                <tr
                  key={invoice._id}
                  className="w-full border-b-2 border-b-white py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg   "
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3  ">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <div className="w-7 h-7 bg-gray-400 rounded-full"></div>
                      <p>
                        {invoice.client_id.firstname}
                        {' '}
                        {invoice.client_id.lastname}
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 ">
                    {invoice.client_id.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 ">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 ">
                    {formatDateToLocal(invoice.due_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3  grid place-content-center">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  {
                    canEdit &&
                    <td className="whitespace-nowrap py-3  pl-6 pr-3">
                      <div className="flex justify-center gap-3">
                        <InvoiceTableActionsDropdown {...{ id: invoice._id as string }} />
                      </div>
                    </td>
                  }
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

