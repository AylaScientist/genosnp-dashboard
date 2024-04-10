'use client';

import { GenomeField, SNPForm } from '@/app/lib/definitions';
import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateSNP } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function EditSNPForm({
    snp,
    genomes,
}: {
    snp: SNPForm;
    genomes: GenomeField[];
}) {

    const initialState = { message: null, errors: {} };
    const updateSNPWithId = updateSNP.bind(null, snp.id);
    const [state, dispatch] = useFormState(updateSNPWithId, initialState);

    return (
        <form action={updateSNPWithId}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Genome Name */}
        <div className="mb-4">
            <label htmlFor="genome" className="mb-2 block text-sm font-medium">
                Choose genome
            </label>
            <div className="relative">
                <select
                    id="genome"
                    name="genomeId"
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue={snp.genome_id}
                >
                    <option value="" disabled>
                        Select a genome
                    </option>
                    {genomes.map((genome) => (
                        <option key={genome.id} value={genome.id}>
                            {genome.species}
                        </option>
                    ))}
                </select>
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
        </div>

        {/* SNP Amount */}
        <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                Choose an amount
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="amount"
                        name="amount"
                        type="number"
                        step="0.01"
                        defaultValue={snp.af}
                        placeholder="Enter USD amount"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
        </div>

        {/* SNP Status */}
        <fieldset>
            <legend className="mb-2 block text-sm font-medium">
                Set the snp status
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex gap-4">
                    <div className="flex items-center">
                        <input
                            id="coding"
                            name="status"
                            type="radio"
                            value="coding"
                            defaultChecked={snp.type === 'coding'}
                            className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        />
                        <label
                            htmlFor="coding"
                            className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                        >
                            Coding <ClockIcon className="h-4 w-4" />
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="non_coding"
                            name="status"
                            type="radio"
                            value="non_coding"
                            defaultChecked={snp.type === 'non_coding'}
                            className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        />
                        <label
                            htmlFor="non_coding"
                            className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                        >
                            Non-coding <CheckIcon className="h-4 w-4" />
                        </label>
                    </div>
                </div>
            </div>
        </fieldset>
        </div>
        <div className="mt-6 flex justify-end gap-4">
            <Link
                href="/dashboard/snps"
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
                Cancel
            </Link>
            <Button type="submit">Edit SNP</Button>
        </div>
    </form>;
}