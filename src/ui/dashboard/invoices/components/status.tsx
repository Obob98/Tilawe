import { Card } from '@/tremorComponents/Card';
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <Card
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-2 text-xs ',
        {
          'bg-gray-50 border  text-gray-900': status === 'pending',
          'bg-emerald-50 border  text-emerald-900': status === 'paid',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
        </>
      ) : null}
    </Card>
  );
}
