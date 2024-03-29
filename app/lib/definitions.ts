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

export type genome = {
  species: string;
  release: string;
  build: string;
  file: string;
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

export type SNP = {
  CHROM: string;
  POS: number;
  ref: string;
  alt: string;
  ref_count: number;
  alt_count: number;
  gene: string;
  transcript: string;
  type: 'coding' | 'mRNA' | 'tRNA' | 'rRNA' | 'non-coding' | 'long-non-coding' | 'others'; // In TypeScript, this is called a string union type.
  pdb: string;
  gene_image: string;
  protein_image: string;
  notes: string;
};

export type Statistics = {
  month: string;
  revenue: number;
};

export type LatestSNP = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestSNPRaw = Omit<LatestSNP, 'amount'> & {
  amount: number;
};

export type SNPsTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type genomesTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedgenomesTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type genomesField = {
  id: string;
  name: string;
};

export type SNPsForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type results_ASE = {
  o1: string;
  o2: string;
  o3: string;
  o4: string;
  o5: string;
}

export type results_GWAS = {
  manhattan_plot: string;
}