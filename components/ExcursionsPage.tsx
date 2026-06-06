import ExcursionsList from "@/components/ExcursionsList";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function ExcursionsPage() {
  const t = await getTranslations("Excursions");

  return (
    <main className="bg-white px-4 pb-20 pt-28 text-black sm:px-6 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36">
      <div className="mx-auto w-full max-w-7xl">
        <Image src="/background.png" className="mx-auto object-cover" alt="Excursions" width={500} height={500} />

        <ExcursionsList />
      </div>
    </main>
  );
}
