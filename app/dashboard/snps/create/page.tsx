import Form from '@/app/ui/snps/create-form';
import Breadcrumbs from '@/app/ui/snps/breadcrumbs';
import { fetchGenomes } from '@/app/lib/data';

export default async function Page() {
    const genomes = await fetchGenomes();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'SNPs', href: '/dashboard/snps' },
                    {
                        label: 'Create SNP',
                        href: '/dashboard/snps/create',
                        active: true,
                    },
                ]}
            />
            <Form genomes={genomes} />
        </main>
    );
}