// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const project_description = [
  {
    title: 'Project 3 Nile',
    sample_names: 'Sample_names.csv',
    type: 'ASE_SNPs',
  },
  {
    title: 'Project 3 Mossambicus',
    sample_names: 'Sample_names.csv',
    type: 'ASE_SNPs',
  },
];

const ase_details = [
  {
    design: 'Experimental_design.csv',
    groups: 'Experimental_groups.csv',
    two_samples: 'Pseudogenomes_code.csv',
    fastq_path: 'fastq_merged',
    name_by_tissue: 'Samples_MAE.csv',
    knwon_geno: 'AD_GT_counts_bi_DNA.csv',
  }
];

const vcf_details = [
  {
    SNP_table: 'AD_GT_counts_bi_DNA.csv',
  }
];

const genomes = [
  {
    id: '1',
    species: 'Oreochromis niloticus',
    release: 'GCF_001858045.2',
    build: 'NMBU',
    file: 'Oreochromis_niloticus.O_niloticus_UMD_NMBU.109.fa',
    image_url: 'https://ca.wikipedia.org/wiki/Til%C3%A0pia_del_Nil#/media/Fitxer:Oreochromis-niloticus-Nairobi.JPG',
  },
  {
    id: '2',
    species: 'Oreochromis mossambicus',
    release: 'EIV1',
    build: 'Norwick',
    file: 'Oreochromis_mossambicus_EIV1.fa',
    image_url: 'https://en.wikipedia.org/wiki/Mozambique_tilapia#/media/File:Oreochromis_mossambicus.JPG',
  },
];

const functional_annotation = [
  {
    GO: 'Nile_mart_GO.csv',
    KEGG: '',
  },
  {
    GO: 'OREMO8127_EIv1.0.annotation.gff3.pep.fasta.functional_annotation.tsv',
    KEGG: '',
  },
];

const sequencing = [
  {
    read_lenght: '149',
    ends: 'PE', // Cand be single ends SE or paired ends PE
    trim: '3', // Lenght of the trimming
  },
];

const engine = [
  {
    type: 'HPC',
    GPUs: '1',
    threads: '4',
    mem_mb: '900',
    java_opts: '-XX:MinRAMPercentage=80.0 -Xms800G -XX:+UseParallelGC -XX:ParallelGCThreads=4 -XX:+UseTLAB',
    workflow_path: '~/Projects/Project3/workflow/',
  },
  {
    type: 'CPU',
    GPUs: '0',
    threads: '4',
    mem_mb: '10',
    java_opts: '-XX:MinRAMPercentage=80.0 -Xms8G -XX:+UseParallelGC -XX:ParallelGCThreads=4 -XX:+UseTLAB',
    workflow_path: '~/Dropbox/salinity_RNAseq/Project 3/workflow/',
  },
];

const annotation = [
  {
    gff3: 'Oreochromis_niloticus.O_niloticus_UMD_NMBU.109.gff3',
    gtf: 'Oreochromis_niloticus.O_niloticus_UMD_NMBU.109.gtf',
    annovar_db: 'ON_refGene.txt',
  },
  {
    gff3: 'OREMO8127_EIv1.0.annotation.gff3',
    gtf: 'OREMO8127_EIv1.0.annotation.gtf',
    annovar_db: 'OM_refGene.txt',
  },
];

const SNPs = [
  {
    id: '',
    genome_id: '',
    CHROM: '',
    POS: '',
    ref: '',
    alt: '',
    ref_count: '',
    alt_count: '',
    AF: '',
    gene: '',
    transcript: '',
    type: '', // coding, mRNA, tRNA, rRNA, non-coding, long-non-coding, others
    pdb: '',
    gene_image: '',
    protein_image: '',
    notes: '',
  }
];

const results_ASE = [
  {
    o1: 'results / SNPs_function.csv',
    o2: 'results / SNP_dictionary.csv',
    o3: 'results / Treatment_SNPs_sig_all_for_Venn.csv',
    o4: 'results / Summary_of_polymorphisms.csv',
    o5: 'results / Intronic_SNPs_caryotype.csv',
  },
];

const results_GWAS = [
  {
    manhattan_plot: '', //path
  },
];


module.exports = {
  users,
  project_description,
  ase_details,
  vcf_details,
  genome,
  functional_annotation,
  sequencing,
  engine,
  annotation,
  SNPs,
  results_ASE,
  results_GWAS,
  results_CHIP_seq,
};

