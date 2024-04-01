import {
  HomeIcon,
} from '@heroicons/react/24/outline';
import Projects from '@/app/icons/projects icon.svg'
import Genomes from '@/app/icons/dna-test_12626003_black_handmade.svg'
import SNPs from '@/app/icons/nucleotide_9559277.svg'


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  //{ name: 'Projects', href: '/dashboard/customers', icon: Projects }, 
  //{    name: 'SNPs',    href: '/dashboard/invoices',    icon: SNPs,  },
  //{ name: 'Genomes', href: '/dashboard/customers', icon: Genomes },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-fuchsia-100 hover:text-logo-500 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}
