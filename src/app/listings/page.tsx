import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import ListingsClient from '@/components/listings/ListingsClient';

async function getData() {
    const filePath = path.join(process.cwd(), 'content', 'listings.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function ListingsPage() {
    const data = await getData();

    return (
        <div className="bg-background-light min-h-screen">
            <div className="flex flex-1 justify-center py-5 px-4 md:px-8 lg:px-12">
                <div className="flex flex-col w-full max-w-[1280px] flex-1">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap gap-2 px-4 py-2 text-sm">
                        {data.header.breadcrumbs.map((crumb: any, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                                <Link
                                    href={crumb.href}
                                    className={`font-medium leading-normal hover:text-primary transition-colors ${index === data.header.breadcrumbs.length - 1 ? 'text-text-dark font-semibold' : 'text-warm-gray-500'}`}
                                >
                                    {crumb.label}
                                </Link>
                                {index < data.header.breadcrumbs.length - 1 && (
                                    <span className="text-warm-gray-500 font-medium leading-normal">/</span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Page Heading */}
                    <div className="flex flex-wrap justify-between items-end gap-3 px-4 py-4 mb-2">
                        <div className="flex min-w-72 flex-col gap-2">
                            <h1 className="text-text-dark text-3xl md:text-4xl font-extrabold leading-tight tracking-[-0.033em]">
                                {data.header.title}
                            </h1>
                            <p className="text-warm-gray-500 text-base font-normal leading-normal">
                                {data.header.count}
                            </p>
                        </div>
                        <button className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline">
                            <span className="material-symbols-outlined text-sm">save</span> Save Search
                        </button>
                    </div>

                    <ListingsClient
                        initialListings={data.listings}
                        filtersData={data.filters}
                    />
                </div>
            </div>
        </div>
    );
}
