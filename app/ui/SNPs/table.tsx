import Image from 'next/image';
import { UpdateSNP, DeleteSNP } from '@/app/dashboard/SNPs/buttons';
import SNPStatus from '@/app/dashboard/SNPs/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredSNPs } from '@/app/lib/data';

export default async function SNPsTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const snps = await fetchFilteredSNPs(query, currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {snps?.map((snp) => (
                            <div
                                key={snp.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <Image
                                                src={snp.gene_image}
                                                className="mr-2 rounded-full"
                                                width={28}
                                                height={28}
                                                alt={`${snp.gene_name}'s profile picture`}
                                            />
                                            <p>{snp.gene_name}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">{snp.status}</p>
                                    </div>
                                    <SNPStatus status={snp.status} />
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p className="text-xl font-medium">
                                            {formatCurrency(snp.af)}
                                        </p>
                                        <p>{formatDateToLocal(snp.date)}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <UpdateSNP id={snp.id} />
                                        <DeleteSNP id={snp.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Customer
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Amount
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Date
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Status
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {snps?.map((snp) => (
                                <tr
                                    key={snp.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={snp.gene_image}
                                                className="rounded-full"
                                                width={28}
                                                height={28}
                                                alt={`${snp.gene_name}'s profile picture`}
                                            />
                                            <p>{snp.gene_name}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {snp.type}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatCurrency(snp.af)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatDateToLocal(snp.date)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <SNPStatus status={status} />
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <UpdateSNP id={id} />
                                            <DeleteSNP id={snp.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}