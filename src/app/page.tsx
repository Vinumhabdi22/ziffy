import fs from 'fs';
import path from 'path';
import Hero from "@/components/home/Hero";
import TrustSection from "@/components/home/TrustSection";
import FeaturedListings from "@/components/home/FeaturedListings";
import ServicesSection from "@/components/home/ServicesSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import { supabase } from '@/utils/supabase/client';
import { Listing } from '@/types';

async function getData() {
  const filePath = path.join(process.cwd(), 'content', 'home.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function Home() {
  const data = await getData();

  // Fetch featured listings from Supabase
  let featuredListings: Listing[] = [];
  try {
    const { data: listings, error } = await supabase
      .from('listings')
      .select('*')
      // Fetch only listings marked as featured
      // This allows listings to have other badges like "New Listing" or "AI-Verified"
      .eq('is_featured', true)
      .eq('property_status', 'Active');

    if (error) {
      console.error("Error fetching featured listings:", error);
    } else {
      featuredListings = listings as unknown as Listing[];
    }
  } catch (err) {
    console.error("Supabase error:", err);
  }

  return (
    <div className="min-h-screen">
      <Hero data={data.hero} />
      <TrustSection data={data.trustSection} />
      <FeaturedListings data={data.featuredListings} listings={featuredListings} />
      <ServicesSection data={data.services} />
      <NewsletterSection data={data.newsletter} />
    </div>
  );
}
