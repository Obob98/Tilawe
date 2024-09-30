import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/ui/fonts';
import { fetchLatestInvoices } from '@/lib/data';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">

        <div className="bg-white px-6">
          {
            latestInvoices.length
              ? latestInvoices.map((invoice, i) => {
                return (
                  <div
                    key={i}
                    className={clsx(
                      'flex gap-8 flex-row items-center justify-between py-4',
                      {
                        'border-t': i !== 0,
                      },
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {/* <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  /> */}
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold md:text-base">
                          {invoice.client.firstname}
                          {' '}
                          {invoice.client.lastname}
                        </p>
                        <p className="hidden text-sm text-gray-500 sm:block">
                          invoice.email
                        </p>
                      </div>
                    </div>
                    <p
                      className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                    >
                      {invoice.amount}
                    </p>
                  </div>
                );
              })
              : <p className='py-4'>no invoices to display</p>
          }
        </div>
        <div className="flex items-center pb-2 pt-6">
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
