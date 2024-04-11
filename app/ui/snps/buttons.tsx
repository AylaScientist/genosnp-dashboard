import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteSNP } from '@/app/lib/actions';

export function CreateSNP() {
    return (
        <Link
            href="/dashboard/snps/create"
            className="flex h-10 items-center rounded-lg bg-logo-600 px-4 text-sm font-medium text-white transition-colors hover:bg-logo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-logo-600"
        >
            <span className="hidden md:block">Create SNP</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateSNP({ id }: { id: string }) {
    return (
        <Link
            href={`/dashboard/snps/${id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <span className="hidden md:block">Edit SNP</span>{' '}

            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteSNP({ id }: { id: string }) {
    const deleteSNPWithId = deleteSNP.bind(null, id);
    return (
        <form action={deleteSNPWithId}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}