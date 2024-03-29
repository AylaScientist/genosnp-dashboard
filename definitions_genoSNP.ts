


// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type project_description = {
  title: string;
  sample_names: string;
  type: 'ASE' | 'GWAS vcf' | 'CHIPseq' | 'Single SNP';
};

export type ase_details = {
  design: string;
  groups: string;
  two_samples: string;
  fastq_path: string;
  name_by_tissue: string;
  known_geno: string;
};

export type vcf_details = {
  SNP_table: string;
};

export type Genomes = {
  id: number;
  species: string;
  release: string;
  build: string;
  file: string;
  image_url: string;
};

export type GenomesTableType = {
  id: string;
  species: string;
  release: string;
  build: string;
  file: string;
  image_url: string;
};

export type GenomeField = {
  id: string;
  species: string;
};


export type FormattedGenomeTable = {
  id: string;
  species: string;
  release: string;
  build: string;
  file: string;
  image_url: string;
};

export type functional_annotation = {
  GO: string;
  KEGG: string;
};

export type sequencing = {
  read_length: number;
  ends: string;
  trim: number;
};

export type engine = {
  type: 'HPC' | 'CPU' | 'Cloud';
  GPUs: number;
  threads: number;
  mem_mb: number;
  java_opts: string;
  workflow_path: string;
};

export type annotation = {
  gff3: string;
  gtf: string;
  annovar_db: string;
}

export type SNPs = {
  id: string;
  genome_id: string;
  CHROM: string;
  POS: number;
  ref: string;
  alt: string;
  gene: string;
  AF: number;
  transcript: string;
  type: 'coding' | 'tRNA' | 'rRNA' | 'non_coding' | 'long-non-coding' | 'Others'; // In TypeScript, this is called a string union type.
  pdb: string;
  gene_image: string;
  protein_image: string;
  notes: string;
};

export type SNPForm = {
  id: string;
  genome_id: string;
  species: string;
  gene: string;
  AF: number;
  ASE: 'yes' | 'no' | 'N/A' ;
  type: 'coding' | 'tRNA' | 'rRNA' | 'non-coding' | 'long-non-coding' | 'Others'; // In TypeScript, this is called a string union type.
};

export type Statistics = {
  month: string;
  revenue: number;
};

export type LatestSNP = {
  id: string;
  genome_id: string;
  gene: string;
  transcript: string;
  AF: number;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestSNPRaw = Omit<LatestSNP, 'amount'> & {
  amount: number;
};

export type SNPsTable = {
  CHROM: string;
  POS: number;
  ref: string;
  alt: string;
  ref_count: number;
  alt_count: number;
  gene: string;
  transcript: string;
  type: 'coding' | 'tRNA' | 'rRNA' | 'non-coding' | 'long-non-coding' | 'Others'; // In TypeScript, this is called a string union type.
  pdb: string;
  gene_image: string;
  protein_image: string;
  notes: string;
};

export type GenomesField = {
  id: string;
  name: string;
};

export type SNPsForm = {
  CHROM: string;
  POS: number;
  ref: string;
  alt: string;
  ref_count: number;
  alt_count: number;
  gene: string;
  transcript: string;
  type: 'coding' | 'tRNA' | 'rRNA' | 'non-coding' | 'long-non-coding' | 'Others'; // In TypeScript, this is called a string union type.
  pdb: string;
  gene_image: string;
  protein_image: string;
  notes: string;
};

export type Results = { //ASE
  o1: string;
  o2: string;
  o3: string;
  o4: string;
  o5: string;
}

export type results_GWAS = {
  manhattan_plot: string;
}
