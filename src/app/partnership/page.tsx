import fs from 'fs';
import path from 'path';
import PartnershipHero from "@/components/partnership/PartnershipHero";
import JourneySection from "@/components/partnership/JourneySection";
import ValueStrategies from "@/components/partnership/ValueStrategies";
import ProfitStructure from "@/components/partnership/ProfitStructure";
import SuccessStories from "@/components/partnership/SuccessStories";
import LeadForm from "@/components/partnership/LeadForm";

async function getData() {
    const filePath = path.join(process.cwd(), 'content', 'partnership.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function PartnershipPage() {
    const data = await getData();

    return (
        <div className="bg-white min-h-screen text-black">
            <PartnershipHero data={data.hero} />
            <JourneySection data={data.journey} />
            <ProfitStructure data={data.profitStructure} />
            <ValueStrategies data={data.valueStrategies} />
            <SuccessStories data={data.successStories} />
            <LeadForm data={data.leadForm} />
        </div>
    );
}
