import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}
const EmptyState = ({ title, subtitle, icon, className }: EmptyStateProps) => {
  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center w-full h-full",
        className
      )}
    >
      <CardContent className="flex flex-col items-center justify-center py-4">
        {icon ? (
          icon
        ) : (
          <BookOpen className="w-10 h-10 text-muted-foreground mb-2" />
        )}
        {title && (
          <h5 className="text-center scroll-m-20 text-lg font-semibold tracking-tight">
            {title}
          </h5>
        )}
        {subtitle && (
          <p className="text-center text-sm leading-7">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyState;
