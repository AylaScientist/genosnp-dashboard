import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function SnpType({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-custom-customeGreen text-white': status === 'coding',
          'bg-custom-customeBlue text-white': status === 'tRNA',
          'bg-custom-customeRed text-white': status === 'rRNA',
          'bg-custom-customePurple text-white': status === 'non-coding',
          'bg-yellow-500 text-white': status === 'long-non-coding',
          'bg-bg-gray-100 text-white': status === 'Others',
        },
      )}
    >
      {status === 'coding' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'tRNA' ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'rRNA' ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'non-coding' ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'long-non-coding' ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'Others' ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
