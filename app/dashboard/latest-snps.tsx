import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { actor } from '@/app/ui/fonts';
import { fetchLatestSNP } from '@/app/lib/data';


export default async function LatestSNPs() { // Remove props
  const latestSNPs = await fetchLatestSNP();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${actor.className} mb-4 text-xl md:text-2xl`}>
        Latest snps
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {<div className="bg-white px-6">
          {latestSNPs.map((snp, i) => {
            return (
              <div
                key={snp.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={snp.gene_image}
                    alt={`${snp.gene_name}'s profile picture`}
                    className="mgene_namerounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {snp.species}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {/* snp.chrom */}
                      {/* snp.pos */}
                    </p>
                  </div>
                </div>
                <p
                  className={`${actor.className} truncate text-sm font-medium md:text-base`}
                >
                  {snp.af}
                </p>
              </div>
            );
          })}
        </div> }
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
