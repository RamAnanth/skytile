'use client';

import { useCallback } from 'react';
import type { CityState } from '@/lib/types';

interface ComparisonActionsProps {
  slot1: CityState;
  slot2: CityState;
  onToast: (message: string, type: 'success' | 'error') => void;
}

export default function ComparisonActions({ slot1, slot2, onToast }: ComparisonActionsProps) {
  const createComparisonImage = useCallback(async (): Promise<Blob | null> => {
    if (!slot1.image || !slot2.image) return null;

    // Load both images
    const img1 = new Image();
    const img2 = new Image();
    
    await Promise.all([
      new Promise<void>((resolve, reject) => {
        img1.crossOrigin = 'anonymous';
        img1.onload = () => resolve();
        img1.onerror = reject;
        img1.src = slot1.image!;
      }),
      new Promise<void>((resolve, reject) => {
        img2.crossOrigin = 'anonymous';
        img2.onload = () => resolve();
        img2.onerror = reject;
        img2.src = slot2.image!;
      }),
    ]);

    // Create canvas - side by side
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Set canvas dimensions (side by side, maintaining aspect ratio)
    const singleWidth = 1080; // Original image width
    const singleHeight = 1080; // Original image height
    const gap = 40; // Gap between images
    canvas.width = singleWidth * 2 + gap;
    canvas.height = singleHeight;

    // Draw background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw first image
    ctx.drawImage(img1, 0, 0, singleWidth, singleHeight);
    
    // Draw second image
    ctx.drawImage(img2, singleWidth + gap, 0, singleWidth, singleHeight);

    // Convert to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    });
  }, [slot1.image, slot2.image]);

  const handleDownload = useCallback(async () => {
    if (!slot1.image || !slot2.image) return;

    try {
      const blob = await createComparisonImage();
      if (!blob) {
        onToast('Failed to create comparison image', 'error');
        return;
      }
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${slot1.city?.name || 'city1'}-vs-${slot2.city?.name || 'city2'}-comparison.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      onToast('Comparison downloaded!', 'success');
    } catch (err) {
      console.error('Failed to create comparison:', err);
      onToast('Failed to create comparison image', 'error');
    }
  }, [slot1.image, slot1.city, slot2.image, slot2.city, createComparisonImage, onToast]);

  const handleShare = useCallback(async () => {
    if (!slot1.image || !slot2.image) return;

    try {
      const blob = await createComparisonImage();
      if (!blob) {
        onToast('Failed to create comparison image', 'error');
        return;
      }

      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      onToast('Comparison copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to copy comparison:', err);
      onToast('Failed to copy comparison', 'error');
    }
  }, [slot1.image, slot2.image, createComparisonImage, onToast]);

  if (!slot1.image || !slot2.image) return null;

  return (
    <div className="col-span-full flex justify-center gap-3 mb-4">
      <button
        onClick={handleDownload}
        className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-all hover:scale-105 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Comparison
      </button>
      <button
        onClick={handleShare}
        className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-all hover:scale-105 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share Comparison
      </button>
    </div>
  );
}

