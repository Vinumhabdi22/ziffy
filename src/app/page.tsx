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
      // Assuming we want to filter by badge 'Featured', or strictly speaking the user asked for "Featured" badge.
      // The sample data has "Modern Geometric Villa" as badge? No field is badge_color
      // Let's filter slightly loosely or grab all if few. The user said "only badge with the "Featured"".
      .eq('badge', 'Featured');

    // Note: If no listings have exactly "Featured", this might return empty.
    // I'll assume the user will update data or the sample data I added earlier has badges.
    // Reviewing schema.sql: I inserted badges like 'AI-Verified', 'High Yield', 'New Listing'.
    // I should probably fetch 'New Listing' or similar if 'Featured' doesn't exist yet, 
    // OR better, I will obey the user strictly: .eq('badge', 'Featured').

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
