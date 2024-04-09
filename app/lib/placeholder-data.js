// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

const { v4: uuidv4 } = require('uuid');

const users = [
  {
    id: uuidv4(), // Automatically generated UUID
    name: 'User3',
    email: 'user3@nextmail.com',
    password: '123456',
  },
];

const genomes = [
  {
    id: uuidv4(), // Automatically generated UUID
    species: 'Oreochromis niloticus',
    release: 'GCF_001858045.2',
    build: 'NMBU',
    file: 'Oreochromis_niloticus.O_niloticus_UMD_NMBU.109.fa',
    image_url: 'https://commons.wikimedia.org/wiki/File:Oreochromis_niloticus_Thailand.jpg#/media/File:Oreochromis_niloticus_Thailand.jpg',
  },
  {
    id: uuidv4(), // Automatically generated UUID
    species: 'Oreochromis mossambicus',
    release: 'EIV1',
    build: 'Norwick',
    file: 'Oreochromis_mossambicus_EIV1.fa',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Oreochromis_mossambicus.jpg',
  },
  {
    id: uuidv4(), // Automatically generated UUID
    species: 'Homo sapiens',
    release: 'GCA_000001405.29',
    build: 'GRCh38.p14',
    file: 'Homo_sapiens.GRCh38.dna.toplevel.fa',
    image_url: 'https://ca.wikipedia.org/wiki/%C3%89sser_hum%C3%A0#/media/Fitxer:28menschen.gif',
  },
];

const genomestabletype = [
  {
    id: genomes[0].id,
    species: 'Oreochromis niloticus',
    release: 'GCF_001858045.2',
    build: 'NMBU',
    file: 'Oreochromis_niloticus.O_niloticus_UMD_NMBU.109.fa',
    image_url: 'https://commons.wikimedia.org/wiki/File:Oreochromis_niloticus_Thailand.jpg#/media/File:Oreochromis_niloticus_Thailand.jpg',
  },
  {
    id: genomes[1].id,
    species: 'Oreochromis mossambicus',
    release: 'EIV1',
    build: 'Norwick',
    file: 'Oreochromis_mossambicus_EIV1.fa',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Oreochromis_mossambicus.jpg',
  },
  {
    id: genomes[2].id,
    species: 'Homo sapiens',
    release: 'GCA_000001405.29',
    build: 'GRCh38.p14',
    file: 'Homo_sapiens.GRCh38.dna.toplevel.fa',
    image_url: 'https://ca.wikipedia.org/wiki/%C3%89sser_hum%C3%A0#/media/Fitxer:28menschen.gif',
  },
];

const formattedgenometable = [
  {
    id: genomes[0].id,
    species: 'Oreochromis niloticus',
    release: 'GCF_001858045.2',
    build: 'NMBU',
    file: 'Oreochromis_niloticus.O_niloticus_UMD_NMBU.109.fa',
    image_url: 'https://commons.wikimedia.org/wiki/File:Oreochromis_niloticus_Thailand.jpg#/media/File:Oreochromis_niloticus_Thailand.jpg',
    total_SNPs: '',
    total_coding: '',
    total_non_coding: '',
  },
  {
    id: genomes[1].id,
    species: 'Oreochromis mossambicus',
    release: 'EIV1',
    build: 'Norwick',
    file: 'Oreochromis_mossambicus_EIV1.fa',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Oreochromis_mossambicus.jpg',
    total_SNPs: '',
    total_coding: '',
    total_non_coding: '',
  },
  {
    id: genomes[2].id,
    species: 'Homo sapiens',
    release: 'GCA_000001405.40',
    build: 'GRCh38.p14',
    file: 'Homo_sapiens.GRCh38.dna.toplevel.fa',
    image_url: 'https://ca.wikipedia.org/wiki/%C3%89sser_hum%C3%A0#/media/Fitxer:28menschen.gif',
    total_SNPs: '',
    total_coding: '',
    total_non_coding: '',
  },
];

const functional_annotation = [
  {
    id: genomes[0].id,
    GO: 'Nile_mart_GO.csv',
    KEGG: '',
  },
  {
    id: genomes[1].id,
    GO: 'OREMO8127_EIv1.0.annotation.gff3.pep.fasta.functional_annotation.tsv',
    KEGG: '',
  },
];


const projects = [
  {
    id: uuidv4(), // Automatically generated UUID
    user_id: users[0].id,
    title: 'Project 3 Nile',
    genome_id: genomes[0].id,
    sample_names: 'Sample_names.csv',
    type: 'ASE_SNPs',
    total_snps: '28674',
  },
  {
    id: uuidv4(), // Automatically generated UUID
    user_id: users[0].id, 
    title: 'Project 3 Mossambicus',
    genome_id: genomes[1].id,
    sample_names: 'Sample_names.csv',
    type: 'ASE_SNPs',
    total_snps: '15421',
  },
  {
    id: uuidv4(), // Automatically generated UUID
    user_id: users[0].id, 
    title: 'Homo sapiens SNPs',
    genome_id: genomes[2].id,
    sample_names: 'Sample_names.csv',
    type: 'GWAS',
    total_snps: '85470',
  },
];

const ase_details = [
  {
    project_id: projects[0].id, 
    design: 'Experimental_design.csv',
    groups: 'Experimental_groups.csv',
    two_samples: 'Pseudogenomes_code.csv',
    fastq_path: 'fastq_merged',
    name_by_tissue: 'Samples_MAE.csv',
    known_geno: 'AD_GT_counts_bi_DNA.csv',
  },
  {
    project_id: projects[1].id, 
    design: 'Experimental_design.csv',
    groups: 'Experimental_groups.csv',
    two_samples: 'Pseudogenomes_code.csv',
    fastq_path: 'fastq_merged',
    name_by_tissue: 'Samples_MAE.csv',
    known_geno: 'AD_GT_counts_bi_DNA.csv',
  },
];

const vcf_details = [
  {
    SNP_table: 'AD_GT_counts_bi_DNA.csv',
  },
];

const sequencing = [
  {
    project_id: projects[0].id, 
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
    genome_id: genomes[0].id, 
    gff3: 'Oreochromis_niloticus.O_niloticus_UMD_NMBU.109.gff3',
    gtf: 'Oreochromis_niloticus.O_niloticus_UMD_NMBU.109.gtf',
    annovar_db: 'ON_refGene.txt',
  },
  {
    genome_id: genomes[1].id, 
    gff3: 'OREMO8127_EIv1.0.annotation.gff3',
    gtf: 'OREMO8127_EIv1.0.annotation.gtf',
    annovar_db: 'OM_refGene.txt',
  },
  {
    genome_id: genomes[2].id,
    gff3: 'GCA_000001405.40.RS_2023_10.gff3',
    gtf: 'GCA_000001405.40.RS_2023_10.gtf',
    annovar_db: 'HS_refGene.txt',
  },
];

const snps = [
  {
    id: uuidv4(), // Automatically generated UUID
    genome_id: genomes[2].id,
    project_id: projects[2].id,
    user_id: users[0].id,
    chrom: 'NC_000001.11',
    pos: '11805287',
    ref: 'C',
    alt: 'T',
    gene: '4524',
    gene_name: 'MTHFR',
    af: '0.415',
    transcript: 'NM_001330358.2',
    type: 'coding', // coding, mRNA, tRNA, rRNA, non-coding, long-non-coding, others
    gene_image: 'https://www.ncbi.nlm.nih.gov/gene/4524',
    protein_image: 'https://www.rcsb.org/3d-sequence/6FCX?assemblyId=1',
    notes: 'Lizer MH, Bogdan RL, Kidd RS. Comparison of the frequency of the methylenetetrahydrofolate reductase (MTHFR) C677T polymorphism in depressed versus nondepressed patients. J Psychiatr Pract. 2011 Nov;17(6):404-9. doi: 10.1097/01.pra.0000407963.26981.a6. PMID: 22108397.',
    date: '4/04/2024',
  },
  {
    id: uuidv4(), // Automatically generated UUID
    genome_id: genomes[0].id,
    project_id: projects[0].id,
    user_id: users[0].id,
    chrom: 'LG1',
    pos: '46970',
    ref: 'C',
    alt: 'T',
    gene: 'ENSONIG00000015575',
    gene_name: 'ctsd cathepsin D',
    af: '0.9155',
    transcript: 'ENSONIT00000065129.1',
    type: 'coding', // coding, mRNA, tRNA, rRNA, non-coding, long-non-coding, others
    gene_image: 'https://www.ncbi.nlm.nih.gov/gene/100690050',
    protein_image: 'http://www.ensembl.org/Oreochromis_niloticus/Transcript/AFDB?db=core;g=ENSONIG00000015575;r=LG1:43174-50651;t=ENSONIT00000065129',
    notes: '',
    date: '4/04/2024',
  },
];

const statistics = [
  {
    project_id: '',
    genome_id: '',
    total_snps: '',
  },
];

const results_ASE = [
  {
    project_id: projects[0].id,
    user_id: users[0].id,
    o1: 'results / SNPs_function.csv',
    o2: 'results / SNP_dictionary.csv',
    o3: 'results / Treatment_SNPs_sig_all_for_Venn.csv',
    o4: 'results / Summary_of_polymorphisms.csv',
    o5: 'results / Intronic_SNPs_caryotype.csv',
    total_SNPs: '28674',
    genome_id: genomes[0].id,
  },
];



const results_GWAS = [
  {
    manhattan_plot: '', //path
    total_SNPs: '',
  },
];


module.exports = {
  users,
  genomes,
  genomestabletype,
  formattedgenometable,
  functional_annotation,
  sequencing,
  engine,
  annotation,
  projects,
  ase_details,
  vcf_details, 
  snps,
  results_ASE,
  results_GWAS,
};
