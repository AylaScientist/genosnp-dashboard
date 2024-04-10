'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

const CreateSNP = FormSchema.omit({ id: true, date: true });
const UpdateSNP = FormSchema.omit({ id: true, date: true });

export async function updateSNP(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateSNP.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100;

    await sql`
    UPDATE snps
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

    revalidatePath('/dashboard/snps');
    redirect('/dashboard/snps');
}

export async function createSNP(formData: FormData) {
    const { genomeId, af, type } = CreateSNP.parse({
        genomeId: formData.get('genomeId'),
        af: formData.get('af'),
        type: formData.get('type'),
    });
    const afInPercentage = af * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`
    INSERT INTO snps (genome_id, af, type, date)
    VALUES (${genomeId}, ${afInPercentage}, ${type}, ${date})
  `;
    revalidatePath('/dashboard/snps');
    redirect('/dashboard/snps');
}
  
export async function deleteSNP(id: string) {
    await sql`DELETE FROM snps WHERE id = ${id}`;
    revalidatePath('/dashboard/snps');
}
