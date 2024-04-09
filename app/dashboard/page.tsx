import { Card } from '@/app/dashboard/cards';
import ProjectChart from '@/app/dashboard/project-chart';
import LatestSNPs from '@/app/dashboard/latest-snps';
import { actor } from '@/app/ui/fonts';
import { fetchProject } from '@/app/lib/data';

export default async function Page() {
    const project = await fetchProject();
    return (
        <main>
            <h1 className={`${actor.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* <Card title="Coding" value={totalCodingSNPs} type="coding" /> */}
                {/* <Card title="Non Coding" value={totalnonCodingSNPs} type="non_Coding" /> */}
                {/* <Card title="Total SNPs" value={numberOfSNPs} type="SNPs" /> */}
                {/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                { <ProjectChart project={project}  /> }
                {/* <LatestSNPs latestSNPs={latestSNPs} /> */}
            </div>
        </main>
    );
}