import {
  BanknotesIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import {
  NonCoding,
  Coding,
  Genomes,
  SNPs,
} from '@/app/icons';
import { actor } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  coding: Coding,
  genomes: Genomes,
  non_coding: NonCoding,
  SNPs: SNPs,
};


// Main component
export default async function CardWrapper() {
  const {
    numberOfsnps,
    numberOfgenomes,
    codingSnpsByGenome,
    nonCodingSnpsByGenome,
  } = await fetchCardData();

  return (
    <>
      {Object.entries(codingSnpsByGenome).map(([genomeId, codingCount]) => (
        <Card key={`coding_${genomeId}`} title={`Coding - Genome ${genomeId}`} value={codingCount} type="coding" />
      ))}
      {Object.entries(nonCodingSnpsByGenome).map(([genomeId, nonCodingCount]) => (
        <Card key={`non_coding_${genomeId}`} title={`Non-Coding - Genome ${genomeId}`} value={nonCodingCount} type="non_coding" />
      ))}
      <Card title="Total SNPs" value={numberOfsnps} type="SNPs" />
      <Card
        title="Total Genomes"
        value={numberOfgenomes}
        type="genomes"
      />
    </>
  );
}


// Card component
export function Card({ 
  title, 
  value, 
  type 
}: { 
  title: string; 
  value: number | string; 
  type: 'SNPs' | 'genomes' | 'non_coding' | 'coding' }) 
    
{
  // Get the corresponding icon component based on the type
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon  /> : null} {/* Render the icon */}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className={`${actor.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
        {value}
      </p>
    </div>
  );
}

