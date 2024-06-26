'use client';

import { GenomeField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createSNP } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ genomes }: { genomes: GenomeField[] }) {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createSNP, initialState);

    return <form action={dispatch}>
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
                        defaultValue=""
                        aria-describedby="genome-error"
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
                <div id="genome-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.genomeId &&
                        state.errors.genomeId.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                </div>
            </div>

            {/* SNP af */}
            <div className="mb-4">
                <label htmlFor="af" className="mb-2 block text-sm font-medium">
                    Choose an af
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="af"
                            name="af"
                            type="number"
                            step="0.01"
                            placeholder="Enter the allele frequency"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            required
                        />
                        <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
            </div>

            {/* SNP Status */}
            <fieldset>
                <legend className="mb-2 block text-sm font-medium">
                    Set the SNP status
                </legend>
                <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                    <div className="flex gap-4">
                        <div className="flex items-center">
                            <input
                                id="pending"
                                name="status"
                                type="radio"
                                value="pending"
                                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                            />
                            <label
                                htmlFor="pending"
                                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                            >
                                Pending <ClockIcon className="h-4 w-4" />
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="paid"
                                name="status"
                                type="radio"
                                value="paid"
                                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                            />
                            <label
                                htmlFor="paid"
                                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                            >
                                Paid <CheckIcon className="h-4 w-4" />
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
            <Button type="submit">Create SNP</Button>
        </div>
    </form>;
}