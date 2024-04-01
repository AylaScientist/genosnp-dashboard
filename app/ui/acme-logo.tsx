import { GlobeAltIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import GenoIcon from '@/app/icons/genosnp-favicon-white.svg'
import { actor } from '@/app/ui/fonts';

// export default function AcmeLogo() {
//  return (
//    <div
//      className={`${actor.className} flex flex-row items-center leading-none text-white`}
//    >
//      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
//      <p className="text-[44px]">Acme</p>
//    </div>
//  );
//}

export default function GenoSNPLogo() {
  return (
    <div
      className={`${actor.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        priority
        src = {GenoIcon}
        height={50}
        width={50}
        alt="Follow us on Twitter"
      />
      <p className="text-[40px]" style={{ color: '#F4E2DE' }}>GenoSNP</p>
    </div>
  );
}