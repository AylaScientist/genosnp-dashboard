import {
  BanknotesIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import {
  Projects,
  Genomes,
  SNPs,
} from '@/app/icons';
import { actor } from '@/app/ui/fonts';

const iconMap = {
  coding: BanknotesIcon,
  genomes: Genomes,
  non_coding: ClockIcon,
  SNPs: SNPs,
};

import React, { useState, useEffect } from 'react';

// Define the type of the card data returned by fetchCardData
interface CardData {
  numberOfgenomes: number;
  numberOfsnps: number;
  codingSnpsByGenome: { [key: string]: number };
  nonCodingSnpsByGenome: { [key: string]: number };
}

// Function to fetch card data
async function fetchCardData(): Promise<CardData> {
  try {
    // Fetch data from API
    const response = await fetch('/api/fetchCardData');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data: CardData = await response.json(); // Explicitly annotate the type of data
    return data;
  } catch (error) {
    console.error('Fetch Card Data Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

// Main component
export default function CardWrapper() {
  const [cardData, setCardData] = useState<CardData | null>(null); // Explicitly annotate the type of cardData

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCardData();
        setCardData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  if (!cardData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {Object.keys(cardData.codingSnpsByGenome).map(genomeId => (
        <GenomeCard
          key={genomeId}
          genomeId={genomeId}
          codingSnps={cardData.codingSnpsByGenome[genomeId]}
          nonCodingSnps={cardData.nonCodingSnpsByGenome[genomeId]}
        />
      ))}
    </>
  );
}

// Genome card component
function GenomeCard({ genomeId, codingSnps, nonCodingSnps }: { genomeId: string, codingSnps: number, nonCodingSnps: number }) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-sm font-medium">Genome ID: {genomeId}</h3>
      </div>
      <div className="flex justify-between p-4">
        <Card title="Coding SNPs" value={codingSnps} type="coding" />
        <Card title="Non-coding SNPs" value={nonCodingSnps} type="non_coding" />
      </div>
    </div>
  );
}


// Card component
function Card({ title, value, type }: { title: string; value: number | string; type: 'SNPs' | 'genomes' | 'non_coding' | 'coding' }) {
  // Get the corresponding icon component based on the type
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon && <Icon className="h-5 w-5 text-gray-700" />} {/* Render the icon */}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className={`${actor.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
        {value}
      </p>
    </div>
  );
}

