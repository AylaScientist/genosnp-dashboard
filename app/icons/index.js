// @/app/icons/index.js
import Image from 'next/image';
import Projects_ico from './Projects.svg';
import Genomes_ico from  './Genomes.svg';
import SNPs_ico from './SNPs.svg';
import Coding_ico from './Protein.svg';
import NonCoding_ico from './RNA.svg';



const Projects = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
    </svg>
);

const Genomes = () => (
    <div>
        <Image src={Genomes_ico} width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" />
    </div>
);

const SNPs = () => (
    <div >
        <Image src={SNPs_ico} width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" />
    </div>
);

const Coding = () => (
    <div >
        <Image src={Coding_ico} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" />
    </div>
);

const NonCoding = () => (
    <div >
        <Image src={NonCoding_ico} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" />
    </div>
);
export {Projects, Genomes, SNPs, Coding, NonCoding} ;
