import Form from '@/app/ui/snps/edit-form';
import Breadcrumbs from '@/app/ui/snps/breadcrumbs';
import {
    fetchSNPById, 
    fetchGenomes } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [snp, customers] = await Promise.all([
        fetchSNPById(id),
        fetchGenomes(),
    ]);
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'SNPs', href: '/dashboard/snps' },
                    {
                        label: 'Edit SNP',
                        href: `/dashboard/snps/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form snp={snp} genomes={genomes} />
        </main>
    );
}