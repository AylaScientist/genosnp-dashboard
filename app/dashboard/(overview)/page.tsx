import { Card } from '@/app/dashboard/cards';
import ProjectChart from '@/app/dashboard/project-chart';
import LatestSNPs from '@/app/dashboard/latest-snps';
import { actor } from '@/app/ui/fonts';
import { 
    fetchProject, 
    fetchLatestSNP,
    fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { ProjectsChartSkeleton } from '@/app/ui/skeletons'


export default async function Page() {
    const projects = await fetchProject();
    const LatestSNP = await fetchLatestSNP();
    const {
        numberOfgenomes,
        numberOfsnps,
        codingSnpsByGenome,
        nonCodingSnpsByGenome,
    } = await fetchCardData();
    console.log('Projects data:', projects); // Log the projects data here
    return (
        <main>
            <h1 className={`${actor.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* <Card title="Coding" value={codingSnpsByGenome} type="coding" /> */ }
                {/* <Card title="Non Coding" value={nonCodingSnpsByGenome} type="non_Coding" /> */ }
                {<Card title="Total SNPs" value={numberOfsnps} type="SNPs" />}
                {<Card
                    title="Total Genomes"
                    value={numberOfgenomes}
                    type="genomes"
                    /> }
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<ProjectsChartSkeleton />}>
                    <ProjectChart />
                </Suspense>
                { <LatestSNPs LatestSNPs={LatestSNP} /> }
            </div>
        </main>
    );
}