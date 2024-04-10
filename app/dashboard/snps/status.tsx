import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function SNPStatus({ type }: { type: string }) {
    return (
        <span
            className={clsx(
                'inline-flex items-center rounded-full px-2 py-1 text-xs',
                {
                    'bg-gray-100 text-gray-500': type === 'coding',
                    'bg-green-500 text-white': type === 'non-coding',
                },
            )}
        >
            {type === 'coding' ? (
                <>
                    Coding
                    <ClockIcon className="ml-1 w-4 text-gray-500" />
                </>
            ) : null}
            {type === 'non-coding' ? (
                <>
                    Non-coding
                    <CheckIcon className="ml-1 w-4 text-white" />
                </>
            ) : null}
        </span>
    );
}
