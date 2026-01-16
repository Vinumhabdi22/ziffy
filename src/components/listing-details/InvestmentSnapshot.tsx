import { InvestmentMetrics } from '@/types';

interface InvestmentSnapshotProps {
    metrics: InvestmentMetrics;
}

export default function InvestmentSnapshot({ metrics }: InvestmentSnapshotProps) {
    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-warm-gray-200">
                <h3 className="font-bold text-lg text-text-dark flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">analytics</span>
                    Investment Snapshot
                </h3>
            </div>
            <div className="p-6 flex flex-col gap-5">
                <div className="flex justify-between items-center pb-4 border-b border-warm-gray-100">
                    <span className="text-warm-gray-600 text-sm font-medium">Purchase Price</span>
                    <span className="text-text-dark font-bold">{metrics.purchasePrice}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-xs text-warm-gray-500">
                            Gross Yield <span className="material-symbols-outlined text-[14px] cursor-help">help</span>
                        </div>
                        <div className="text-xl font-bold text-text-dark">{metrics.grossYield}</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-xs text-warm-gray-500">
                            Cap Rate <span className="material-symbols-outlined text-[14px] cursor-help">help</span>
                        </div>
                        <div className="text-xl font-bold text-green-600">{metrics.capRate}</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-xs text-warm-gray-500">
                            Cash on Cash <span className="material-symbols-outlined text-[14px] cursor-help">help</span>
                        </div>
                        <div className="text-xl font-bold text-primary">{metrics.cashOnCash}</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-xs text-warm-gray-500">
                            5yr Return <span className="material-symbols-outlined text-[14px] cursor-help">help</span>
                        </div>
                        <div className="text-xl font-bold text-text-dark">{metrics.totalReturn5Yr}</div>
                    </div>
                </div>

                <div className="pt-4 border-t border-warm-gray-100">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-warm-gray-600 text-sm">Monthly Net Income</span>
                        <span className="text-text-dark font-bold">{metrics.monthlyCashFlow}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="text-xs text-warm-gray-400 mt-2 text-center">
                        * Based on estimated rental income and standard expense assumptions.
                    </p>
                </div>
            </div>
        </div>
    );
}
