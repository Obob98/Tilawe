import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-2 text-xs',
        {
          'bg-gray-200 text-gray-800': status === 'pending',
          'bg-green-400 text-white': status === 'paid',
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
    </span>
  );
}
