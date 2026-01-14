import fs from 'fs';
import path from 'path';
import SFRHero from "@/components/sfr/SFRHero";
import BenefitsSection from "@/components/sfr/BenefitsSection";
import ComparisonSection from "@/components/sfr/ComparisonSection";
import HowItWorks from "@/components/sfr/HowItWorks";
import LeadCaptureForm from "@/components/sfr/LeadCaptureForm";

async function getData() {
    const filePath = path.join(process.cwd(), 'content', 'sfr.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function SFRPage() {
    const data = await getData();

    return (
        <div className="bg-white min-h-screen">
            <SFRHero data={data.hero} />
            <BenefitsSection data={data.benefits} />
            <ComparisonSection data={data.comparisonSection} />
            <HowItWorks data={data.howItWorks} />
            <LeadCaptureForm data={data.leadCapture} />
        </div>
    );
}

