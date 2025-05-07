'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Layers as LayersIcon } from 'lucide-react';
import { LayersModal } from '@/map-utils/LayersModal';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('@/map-utils/MapContainer'), {
  ssr: false,
});

export default function MpPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="relative flex h-screen w-full">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-20"
        onClick={() => setSidebarOpen(true)}
      >
        <LayersIcon className="h-6 w-6" />
      </Button>
      <LayersModal opened={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1">
        <MapContainer />
      </div>
    </main>
  );
}