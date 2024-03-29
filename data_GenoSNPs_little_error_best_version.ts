import { sql } from '@vercel/postgres';
import {
  GenomeField,
  GenomesTableType,
  SNPForm,
  SNPsTable,
  LatestSNPRaw,
  Genomes,
  Results,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchResult() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching Result data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Results>`SELECT * FROM Results`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Result data.');
  }
}

export async function fetchLatestSNP() {
  try {
    const data = await sql<LatestSNPRaw>`
      SELECT snps.gene, genomes.species, genomes.image_url, genomes.release, snps.id, snps.AF
      FROM snps
      JOIN genomes ON snps.genome_id = genomes.id
      ORDER BY snps.AF DESC
      LIMIT 5`;

    const latestsnps = data.rows.map((snp) => ({
      ...snp,
      amount: Number(snp.AF),
    }));
    return latestsnps;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest snps.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const snpCountPromise = sql`SELECT COUNT(*) FROM snps`;
    const genomeCountPromise = sql`SELECT COUNT(*) FROM genomes`;
    const snpTypePromise = sql`SELECT
         SUM(CASE WHEN status = 'coding' THEN amount ELSE 0 END) AS "coding",
         SUM(CASE WHEN status = 'non-coding' THEN amount ELSE 0 END) AS "non-coding"
         FROM snps`;

    const data = await Promise.all([
      snpCountPromise,
      genomeCountPromise,
      snpTypePromise,
    ]);

    const numberOfsnps = Number(data[0].rows[0].count ?? '0');
    const numberOfgenomes = Number(data[1].rows[0].count ?? '0');
    const totalCodingsnps = Number(data[2].rows[0].coding ?? '0');
    const totalNon_codingsnps = Number(data[2].rows[0].non_coding ?? '0');

    return {
      numberOfgenomes,
      numberOfsnps,
      totalCodingsnps,
      totalNon_codingsnps,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredSNPs(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const snps = await sql<SNPsTable>`
      SELECT
        snps.id,
        snps.gene,
        snps.AF,
        snps.type,
        genomes.species,
        genomes.release,
        genomes.image_url
      FROM snps
      JOIN genomes ON snps.genome_id = genomes.id
      WHERE
        genomes.species ILIKE ${`%${query}%`} OR
        genomes.release ILIKE ${`%${query}%`} OR
        snps.gene::text ILIKE ${`%${query}%`} OR
        snps.AF ILIKE ${`%${query}%`} OR
        snps.type::text ILIKE ${`%${query}%`}
      ORDER BY snps.AF DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return snps.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch snps.');
  }
}

export async function fetchSNPsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM snps
    JOIN genomes ON snps.genome_id = genomes.id
    WHERE
      genomes.species ILIKE ${`%${query}%`} OR
      genomes.release ILIKE ${`%${query}%`} OR
      snps.gene::text ILIKE ${`%${query}%`} OR
      snps.AF ILIKE ${`%${query}%`} OR
      snps.type::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of snps.');
  }
}

export async function fetchSNPById(id: string) {
  try {
    const data = await sql<SNPForm>`
      SELECT
        snps.id,
        snps.species,
        snps.gene,
        snps.AF,
        snps.type
      FROM snps
      WHERE snps.id = ${id};
    `;

    const snp = data.rows.map((snp) => ({
      ...snp,
      // Convert amount from cents to dollars
      amount: snp.AF * 100,
    }));
    

    return snp[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch snp.');
  }
}

export async function fetchGenomes() {
  try {
    const data = await sql<GenomeField>`
      SELECT
        id,
        name
      FROM genomes
      ORDER BY name ASC
    `;

    const genomes = data.rows;
    return genomes;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all genomes.');
  }
}

export async function fetchFilteredGenomes(query: string) {
  try {
    const data = await sql<GenomesTableType>`
		SELECT
		  genomes.id,
		  genomes.species,
		  genomes.release,
		  genomes.image_url,
		  COUNT(snps.id) AS total_snps,
		  SUM(CASE WHEN snps.type = 'non-coding' THEN snps.gene ELSE 0 END) AS total_non_coding,
		  SUM(CASE WHEN snps.type = 'coding' THEN snps.gene ELSE 0 END) AS total_coding
		FROM genomes
		LEFT JOIN snps ON genomes.id = snps.genome_id
		WHERE
		  genomes.species ILIKE ${`%${query}%`} OR
        genomes.release ILIKE ${`%${query}%`}
		GROUP BY genomes.id, genomes.species, genomes.release, genomes.image_url
		ORDER BY genomes.species ASC
	  `;

    const genomes = data.rows.map((genome) => ({
      ...genome,
      total_non_coding: Number(genome.total_non_coding),
      total_coding: Number(genome.total_coding),
    }));

    return genomes;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch genome table.');
  }
}

export async function getGenome(species: string) {
  try {
    const genome = await sql`SELECT * FROM genomes WHERE species=${species}`;
    return genome.rows[0] as Genome;
  } catch (error) {
    console.error('Failed to fetch genome:', error);
    throw new Error('Failed to fetch genome.');
  }
}

