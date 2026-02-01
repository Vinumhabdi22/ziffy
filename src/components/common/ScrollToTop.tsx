"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Disable browser's default scroll restoration to avoid the "glitch"
        // where it jumps to previous position then back to top
        if (typeof window !== 'undefined' && window.history) {
            window.history.scrollRestoration = 'manual';
        }

        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
