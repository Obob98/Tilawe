
import { fetchCardData } from '@/lib/data';
import { lusitana } from '@/ui/fonts';

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>

      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Clients"
        value={numberOfCustomers}
        type="customers"
      /> */}
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {

  return (
    <div className=" rounded-xl bg-white p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <div className='flex gap-4'>
        <div className='truncate rounded-xl bg-gray-50 p-4 text-center'>
          <p
            className={`${lusitana.className} `}
          >
            {value}
          </p>
        </div>
        <div className='gap-4 truncate rounded-xl bg-gray-50 p-4 text-center'>
          <p
            className={`${lusitana.className} `}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
