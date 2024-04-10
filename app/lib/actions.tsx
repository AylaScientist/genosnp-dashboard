'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


const FormSchema = z.object({
    id: z.string(),
    genome_id: z.string(),
    af: z.coerce.number(),
    type: z.enum(['pending', 'paid']),
    date: z.string(),
});

const CreateSNP = FormSchema.omit({ id: true, date: true });
const UpdateSNP = FormSchema.omit({ id: true, date: true });

export async function updateSNP(id: string, formData: FormData) {
    const { genome_id, af, type } = UpdateSNP.parse({
        genome_id: formData.get('genome_id'),
        af: formData.get('af'),
        type: formData.get('type'),
    });

    const afInPercentage = af * 100;

    await sql`
    UPDATE snps
    SET genome_id = ${genome_id}, af = ${afInPercentage}, type = ${type}
    WHERE id = ${id}
  `;

    revalidatePath('/dashboard/snps');
    redirect('/dashboard/snps');
}

export async function createSNP(formData: FormData) {
    const { genome_id, af, type } = CreateSNP.parse({
        genomeId: formData.get('genomeId'),
        af: formData.get('af'),
        type: formData.get('type'),
    });
    const afInPercentage = af * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`
    INSERT INTO snps (genome_id, af, type, date)
    VALUES (${genome_id}, ${afInPercentage}, ${type}, ${date})
  `;
    revalidatePath('/dashboard/snps');
    redirect('/dashboard/snps');
}
  
export async function deleteSNP(id: string) {
    throw new Error('Failed to Delete SNP');
    try {
        await sql`DELETE FROM snps WHERE id = ${id}`;
        revalidatePath('/dashboard/snps');
        return { message: 'Deleted SNP' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete SNP' };
    }
}
