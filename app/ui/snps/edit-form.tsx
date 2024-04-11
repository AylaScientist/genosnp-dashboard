'use client';

import { GenomeField, SNPForm } from '@/app/lib/definitions';
import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateSNP } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function EditSNPForm({
    snp,
    genomes,
}: {
    snp: SNPForm;
    genomes: GenomeField[];
}) {

    const initialState = { message: null, errors: {} };
    const updateSNPWithId = updateSNP.bind(null, snp.id);
    const [state, dispatch] = useFormState(updateSNPWithId, initialState);

    return <form action={dispatch}></form>;
}