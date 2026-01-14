import fs from 'fs';
import path from 'path';
import Hero from "@/components/home/Hero";
import TrustSection from "@/components/home/TrustSection";
import FeaturedListings from "@/components/home/FeaturedListings";
import ServicesSection from "@/components/home/ServicesSection";

async function getData() {
  const filePath = path.join(process.cwd(), 'content', 'home.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="min-h-screen">
      <Hero data={data.hero} />
      <TrustSection data={data.trustSection} />
      <FeaturedListings data={data.featuredListings} />
      <ServicesSection data={data.services} />
    </div>
  );
}
