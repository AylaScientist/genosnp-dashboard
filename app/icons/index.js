// @/app/icons/index.js
import Image from 'next/image';
import Projects_ico from './Projects.svg';
import Genomes_ico from  './Genomes.svg';
import SNPs_ico from './SNPs.svg';


const Projects = ({ color }) => (
    <div style={{ color }}>
        <Image src={Projects_ico} width="24" height="24" viewBox="0 0 24 24" />
    </div>
);

const Genomes = ({ color }) => (
    <div style={{ color }}>
        <Image src={Genomes_ico} width="24" height="24" viewBox="0 0 24 24" />
    </div>
);

const SNPs = ({ color }) => (
    <div style={{ color }}>
        <Image scr={SNPs_ico} width="24" height="24" viewBox="0 0 24 24" />
    </div>
);

export {Projects, Genomes, SNPs} ;
