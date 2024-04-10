import Form from '@/app/ui/snps/edit-form';
import Breadcrumbs from '@/app/ui/snps/breadcrumbs';
import {
    fetchSNPById, 
    fetchGenomes } from '@/app/lib/data';
import { updateSNP } from '@/app/lib/actions'
import { notFound } from 'next/navigation';



export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [snp, genomes] = await Promise.all([
        fetchSNPById(id),
        fetchGenomes(),
    ]);

    if (!snp) {
        notFound();
    }


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