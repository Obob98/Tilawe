import { formatCurrency } from '@/lib/utils';
import { fetchFilteredInventory, } from '@/lib/data';
import { Card } from '@/tremorComponents/Card';


export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInventory(query, currentPage);

  return (
    <div className="mt-4 flow-root">
      <div className="inline-block min-w-full align-middle">
        <Card className=" p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((inventory: any) => (
              <div
                key={inventory._id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
                      {/* <Image
                        src={inventory.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${inventory.name}'s profile picture`}
                      /> */}
                      <p>{inventory.product_id.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{inventory.product_id.type}</p>
                  </div>
                  <p className="text-xl font-medium">
                    {formatCurrency(inventory.product_id.price)}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{inventory.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Product Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Category
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Unit Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total in Stock
                </th>
              </tr>
            </thead>
            <tbody className=" rounded-lg bg-[#f5f6f9]">
              {invoices?.map((inventory: any, i: number) => (
                <tr
                  key={inventory._id}
                  className="w-full border-b-2 border-b-white py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg   "
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 ">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={inventory.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${inventory.name}'s profile picture`}
                      /> */}
                      <div className="w-7 h-7 bg-gray-400 rounded-full"></div>
                      <p>{inventory.product_id.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {inventory.product_id.type}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(inventory.product_id.price)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {inventory.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

