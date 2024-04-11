'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}


const FormSchema = z.object({
    id: z.string(),
    genome_id: z.string({
        invalid_type_error: 'Please select a genome.',
    }),
    af: z.coerce
        .number()
        .gt(0, { message: 'Please enter an allele frequency in decimal, not in percentage.' }),
    type: z.enum(['non-codgin', 'coding'], {
        invalid_type_error: 'Please select a type of SNP, if coding or not-coding.',
    }),
    date: z.string(),
});

const CreateSNP = FormSchema.omit({ id: true, date: true });
const UpdateSNP = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        genomeId?: string[];
        af?: string[];
        type?: string[];
    };
    message?: string | null;
};

export async function createSNP(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateSNP.safeParse({
        genome_id: formData.get('genome_id'),
        af: formData.get('af'),
        type: formData.get('type'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create SNP.',
        };
    }

    const afInPercentage = af * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`
    INSERT INTO snps (genome_id, af, type, date)
    VALUES (${genome_id}, ${afInPercentage}, ${type}, ${date})
  `;
    revalidatePath('/dashboard/snps');
    redirect('/dashboard/snps');
}

export async function updateSNP(
    id: string,
    prevState: State,
    formData: FormData,
) {
    const validatedFields = UpdateSNP.parse({
        genome_id: formData.get('genome_id'),
        af: formData.get('af'),
        type: formData.get('type'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update SNP.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;

    const afInPercentage = af * 100;

    try {
        await sql`
        UPDATE snps
        SET genome_id = ${genome_id}, af = ${afInPercentage}, type = ${type}
        WHERE id = ${id}
    `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }

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
