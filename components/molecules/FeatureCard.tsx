import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Atoms
import { type LucideIcon } from "lucide-react";
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
