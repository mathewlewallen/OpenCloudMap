import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addLayerToMap, removeLayerFromMap } from '@/redux/slices/mapSlice';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Divider } from '@/components/ui/divider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Layers, X } from 'lucide-react';
import { styles } from '@/map-utils/styles/styles'
import { setBaseStyleUrl } from '@/redux/slices/mapSlice';

interface LayersModalProps {
  opened: boolean;
  onClose: () => void;
}

export const LayersModal = ({ opened, onClose }: LayersModalProps) => {
  const dispatch = useAppDispatch();
  const mapLayers = useAppSelector((state) => state.map.mapLayers);
  const baseStyleUrl = useAppSelector((state) => state.map.baseStyleUrl);
  const handleToggle = (key: string, visible: boolean) => {
    if (visible) {
      dispatch(removeLayerFromMap(key));
    } else {
      dispatch(addLayerToMap(key));
    }
  };

  return (
    <Sheet open={opened} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-4">
        <SheetHeader className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Layers className="h-5 w-5" />
            <SheetTitle className="text-lg font-semibold">Map Layers</SheetTitle>
          </div>
          <SheetClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <Divider className="mb-4" />

        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="flex flex-col space-y-3">
            {Object.entries(mapLayers)
              .filter(([key]) => key !== 'osm')
              .map(([key, layer]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <span className="text-sm font-medium">{layer.layerName}</span>
                  <Switch
                    checked={layer.visible}
                    onCheckedChange={() => handleToggle(key, layer.visible)}
                  />
                </div>
              ))}
          </div>
        </ScrollArea>
        <Divider className="mt-6 mb-2" />
      <h3 className="text-lg font-semibold mb-2">Base Style</h3>
      {styles.map(({ id, title, url }) => (
        <button
          key={id}
          className={`block w-full text-left px-2 py-1 mb-1 rounded ${
            baseStyleUrl === url
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => dispatch(setBaseStyleUrl(baseStyleUrl === url ? null : url))}
        >
          {title}
        </button>
      ))}
        <Divider className="mt-4 mb-2" />
        <div className="text-center">
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.reload()}>
            Refresh Map
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
