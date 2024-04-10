import Pagination from '@/app/ui/SNPs/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/SNPs/table';
import { CreateSNP } from '@/app/ui/SNPs/buttons';
import { actor } from '@/app/ui/fonts';
import { SNPsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchSNPsPages } from '@/app/lib/data';

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchSNPsPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${actor.className} text-2xl`}>SNPs</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search snps..." />
                <CreateSNP />
            </div>
            <Suspense key={query + currentPage} fallback={<SNPsTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                { <Pagination totalPages={totalPages} /> }
            </div>
        </div>
    );
}