


// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type Users = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Projects = {
  id: string;
  title: string;
  genome_id: string;
  sample_names: string;
  type: 'ASE' | 'GWAS vcf' | 'CHIPseq' | 'Single SNP';
  total_SNPs: number;
};

export type ase_details = {
  project_id: string;
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
  id: string;
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
  total_coding: number;
  total_non_coding: number;
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
  total_SNPs: number;
  total_coding: number;
  total_non_coding: number;
};

export type functional_annotation = {
  id: string;
  go: string;
  keeg: string;
};

export type sequencing = {
  project_id: string;
  read_length: number;
  ends: string;
  trim: number;
};

export type engine = {
  type: 'HPC' | 'CPU' | 'Cloud';
  gpus: number;
  threads: number;
  mem_mb: number;
  java_opts: string;
  workflow_path: string;
};

export type annotation = {
  genome_id: string;
  gff3: string;
  gtf: string;
  annovar_db: string;
}

export type SNPs = {
  id: string;
  genome_id: string;
  project_id: string;
  user_id: string;
  chrom: string;
  pos: number;
  ref: string;
  alt: string;
  gene: string;
  gene_name: string;
  af: number;
  transcript: string;
  type: 'coding' | 'tRNA' | 'rRNA' | 'non_coding' | 'long-non-coding' | 'Others'; // In TypeScript, this is called a string union type.
  gene_image: string;
  protein_image: string;
  notes: string;
  date: Date;
};

export type SNPForm = {
  id: string;
  genome_id: string;
  project_id: string;
  chrom: string;
  pos: number;
  ref: string;
  alt: string;
  gene: string;
  gene_name: string;
  af: number;
  transcript: string;
  type: 'coding' | 'tRNA' | 'rRNA' | 'non_coding' | 'long-non-coding' | 'Others'; // In TypeScript, this is called a string union type.
  gene_image: string;
  protein_image: string;
  notes: string;
  date: Date;
};

export type Statistics = {
  project_id: string;
  genome_id: string;
  total_snps: number;
};

export type LatestSNP = {
  id: string;
  genome_id: string;
  gene_name: string;
  gene_image: string;
  af: number;
  species: string;
  type: 'coding' | 'tRNA' | 'rRNA' | 'non_coding' | 'long-non-coding' | 'Others'; // In TypeScript, this is called a string union type.
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestSNPRaw = Omit<LatestSNP, 'af'> & {
  af: number;
};

export type SNPsTable = {
  id: string;
  genome_id: string;
  project_id: string;
  chrom: string;
  pos: number;
  ref: string;
  alt: string;
  gene: string;
  gene_name: string;
  af: number;
  transcript: string;
  type: 'coding' | 'tRNA' | 'rRNA' | 'non-coding' | 'long-non-coding' | 'Others'; // In TypeScript, this is called a string union type.
  gene_image: string;
  protein_image: string;
  notes: string;
  date: Date;
};

export type GenomesField = {
  id: string;
  name: string;
};

export type SNPsForm = {
  id: string;
  genome_id: string;
  project_id: string;
  chrom: string;
  pos: number;
  ref: string;
  alt: string;
  ref_count: number;
  alt_count: number;
  gene: string;
  gene_name: string;
  af: number;
  transcript: string;
  type: 'coding' | 'tRNA' | 'rRNA' | 'non-coding' | 'long-non-coding' | 'Others'; // In TypeScript, this is called a string union type.
  gene_image: string;
  protein_image: string;
  notes: string;
  date: Date;
};



export type Results_ASE = { //ASE
  project_id: string;
  user_id: string;
  o1: string;
  o2: string;
  o3: string;
  o4: string;
  o5: string;
  total_SNPs: number;
  genome_id: string;
}

export type results_GWAS = {
  manhattan_plot: string;
  total_SNPs: number;
  project_id: string;
  genome_id: string;
}