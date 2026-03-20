import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function Placeholder() {
  const location = useLocation();
  const pageName = location.pathname.split("/").filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" › ") || "Page";

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="bg-card border-border max-w-md w-full">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Construction className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{pageName}</h2>
            <p className="text-sm text-muted-foreground mt-1">This section is coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
