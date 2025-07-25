import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/hooks/useCurrency";

interface VehicleCategory {
  id: string;
  type: string;
  name: string;
  description: string;
  image: string;
  capacity: number;
  price: number;
  features: string[];
}

interface VehicleCategoriesProps {
  categories: VehicleCategory[];
  onSelect: (category: VehicleCategory) => void;
}

export const VehicleCategories = ({ categories, onSelect }: VehicleCategoriesProps) => {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Selecione sua categoria de veículo:
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-32">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                {category.name}
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{category.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{category.capacity} passageiros</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="h-4 w-4" />
                    <span>{category.type}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="text-lg font-bold text-gray-900">
                    {formatPrice(category.price)}
                  </div>
                  <Button 
                    onClick={() => onSelect(category)}
                    size="sm"
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    SELECIONAR
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
