"use client";

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    initialIndex?: number;
}

export default function ImageModal({ isOpen, onClose, images, initialIndex = 0 }: ImageModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setCurrentIndex(initialIndex);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, initialIndex]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isOpen) return;

        if (e.key === 'Escape') {
            onClose();
        } else if (e.key === 'ArrowRight') {
            handleNext();
        } else if (e.key === 'ArrowLeft') {
            handlePrev();
        }
    }, [isOpen, onClose, handleNext, handlePrev]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    if (!mounted || !isOpen || !images.length) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                className="absolute top-4 right-4 z-[10000] p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                onClick={onClose}
            >
                <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
                <>
                    <button
                        className="absolute left-4 z-[10000] p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        onClick={handlePrev}
                    >
                        <span className="material-symbols-outlined text-4xl">chevron_left</span>
                    </button>
                    <button
                        className="absolute right-4 z-[10000] p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        onClick={handleNext}
                    >
                        <span className="material-symbols-outlined text-4xl">chevron_right</span>
                    </button>
                </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 font-medium bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Main Image */}
            <div
                className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center p-2"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={images[currentIndex]}
                    alt={`Property view ${currentIndex + 1}`}
                    className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl"
                />
            </div>
        </div>,
        document.body
    );
}
