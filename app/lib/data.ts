import { sql } from '@vercel/postgres';
import {
  GenomeField,
  GenomesTableType,
  SNPForm,
  SNPsTable,
  LatestSNPRaw,
  Genomes,
  Projects,
} from './definitions';
// import { formatCurrency } from './utils';


export async function fetchProject() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching Project data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Projects>`SELECT * FROM projects`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Project data.');
  }
}

export async function fetchLatestSNP() {
  try {
    const data = await sql<LatestSNPRaw>`
      SELECT snps.gene_name, genomes.species, genomes.image_url, snps.af
      FROM snps
      JOIN genomes ON snps.genome_id = genomes.id
      ORDER BY snps.af DESC
      LIMIT 5`;

    const latestsnps = data.rows.map((snp) => ({
      ...snp,
      amount: Number(snp.af),
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
         SUM(CASE WHEN type = 'coding' THEN 1 ELSE 0 END) AS "coding_snps_count",
         SUM(CASE WHEN type = 'non-coding' THEN 1 ELSE 0 END) AS "non_coding_snps_count"
         FROM snps
         JOIN genomes ON snps.genome_id = genomes.id
         GROUP BY genomes.id`;

    const data = await Promise.all([
      snpCountPromise,
      genomeCountPromise,
      snpTypePromise,
    ]);

    const numberOfsnps = Number(data[0].rows[0].count ?? '0');
    const numberOfgenomes = Number(data[1].rows[0].count ?? '0');
    const codingSnpsByGenome: { [key: string]: number } = {}; // Initialize an empty object to store coding SNPs by genome

    data[2].rows.forEach(row => {
      const genomeId = row.genome_id;
      const codingSnpsCount = Number(row.coding_snps_count);
      
      // Store coding SNPs count for each genome in the object
      codingSnpsByGenome[genomeId] = codingSnpsCount;
    });

    // Now codingSnpsByGenome is an object where keys are genome IDs and values are total coding SNPs for each genome
    console.log(codingSnpsByGenome);
    

    const nonCodingSnpsByGenome: { [key: string]: number } = {}; // Initialize an empty object to store coding SNPs by genome

    data[2].rows.forEach(row => {
      const genomeId = row.genome_id;
      const nonCodingSnpsCount = Number(row.non_coding_snps_count);

      // Store coding SNPs count for each genome in the object
      nonCodingSnpsByGenome[genomeId] = nonCodingSnpsCount;
    });

    // Now codingSnpsByGenome is an object where keys are genome IDs and values are total coding SNPs for each genome
    console.log(nonCodingSnpsByGenome);
    
    return {
      numberOfgenomes,
      numberOfsnps,
      codingSnpsByGenome,
      nonCodingSnpsByGenome,
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
        snps.gene_name,
        snps.gene,
        snps.chrom,
        snps.pos,
        snps.af,
        snps.type,
        genomes.species,
        genomes.release,
        genomes.image_url
      FROM snps
      JOIN genomes ON snps.genome_id = genomes.id
      WHERE
        genomes.species ILIKE ${`%${query}%`} OR
        genomes.release ILIKE ${`%${query}%`} OR
        snps.gene_name::text ILIKE ${`%${query}%`} OR
        snps.gene::text ILIKE ${`%${query}%`} OR
        snps.af ILIKE ${`%${query}%`} OR
        snps.type::text ILIKE ${`%${query}%`}
      ORDER BY snps.af DESC
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
      snps.gene_name::text ILIKE ${`%${query}%`} OR
      snps.af ILIKE ${`%${query}%`} OR
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
        snps.gene_name,
        snps.chrom,
        snps.pos,
        snps.ref,
        snps.alt,
        snps.af,
        snps.image_url,
        snps.type
      FROM snps
      WHERE snps.id = ${id};
    `;

    const snp = data.rows.map((snp) => ({
      ...snp,
      // Convert allele frequency to percentage
      amount: snp.af * 100,
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
        species,
        build,
        image_url
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
    return genome.rows[0] as Genomes;
  } catch (error) {
    console.error('Failed to fetch genome:', error);
    throw new Error('Failed to fetch genome.');
  }
}
