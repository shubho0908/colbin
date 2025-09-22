import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center">
      <Card className="w-[300px] h-[150px] shadow">
        <CardContent className="flex flex-col items-center justify-center h-full gap-4">
          <div className="flex items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="text-lg font-medium text-muted-foreground animate-pulse">
              Loading...
            </span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Please wait while we load your content
          </p>
        </CardContent>
      </Card>
    </div>
  );
}