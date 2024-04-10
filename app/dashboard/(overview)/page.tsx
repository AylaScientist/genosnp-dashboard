import CardWrapper from '@/app/dashboard/cards';
import ProjectChart from '@/app/dashboard/project-chart';
import LatestSNPs from '@/app/dashboard/latest-snps';
import { actor } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { 
    ProjectsChartSkeleton,
    LatestSNPsSkeleton,
    CardsSkeleton,
} from '@/app/ui/skeletons'


export default async function Page() {
    const {
        numberOfgenomes,
        numberOfsnps,
        codingSnpsByGenome,
        nonCodingSnpsByGenome,
    } = await fetchCardData();
    return (
        <main>
            <h1 className={`${actor.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<ProjectsChartSkeleton />}>
                    <ProjectChart />
                </Suspense>
                <Suspense fallback={<LatestSNPsSkeleton />}>
                    <LatestSNPs />
                </Suspense>
            </div>
        </main>
    );
}