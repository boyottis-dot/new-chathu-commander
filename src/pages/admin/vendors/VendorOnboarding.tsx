import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Circle, Clock, User, FileText, Building, CreditCard, GraduationCap, ArrowRight } from "lucide-react";

interface OnboardingVendor {
  id: string;
  name: string;
  email: string;
  appliedAt: string;
  currentStep: number;
  steps: { name: string; status: "completed" | "current" | "pending" }[];
}

const initialVendors: OnboardingVendor[] = [
  {
    id: "ONB-001", name: "Fresh Farms Market", email: "contact@freshfarms.com", appliedAt: "2026-03-25",
    currentStep: 3,
    steps: [
      { name: "Application", status: "completed" },
      { name: "Document Verification", status: "completed" },
      { name: "Bank Account", status: "current" },
      { name: "Agreement", status: "pending" },
      { name: "Training", status: "pending" },
    ],
  },
  {
    id: "ONB-002", name: "Urban Styles Boutique", email: "hello@urbanstyles.com", appliedAt: "2026-03-26",
    currentStep: 2,
    steps: [
      { name: "Application", status: "completed" },
      { name: "Document Verification", status: "current" },
      { name: "Bank Account", status: "pending" },
      { name: "Agreement", status: "pending" },
      { name: "Training", status: "pending" },
    ],
  },
  {
    id: "ONB-003", name: "TechNova Gadgets", email: "onboard@technova.io", appliedAt: "2026-03-20",
    currentStep: 5,
    steps: [
      { name: "Application", status: "completed" },
      { name: "Document Verification", status: "completed" },
      { name: "Bank Account", status: "completed" },
      { name: "Agreement", status: "completed" },
      { name: "Training", status: "current" },
    ],
  },
  {
    id: "ONB-004", name: "Artisan Bakery Co", email: "apply@artisanbakery.com", appliedAt: "2026-03-27",
    currentStep: 1,
    steps: [
      { name: "Application", status: "current" },
      { name: "Document Verification", status: "pending" },
      { name: "Bank Account", status: "pending" },
      { name: "Agreement", status: "pending" },
      { name: "Training", status: "pending" },
    ],
  },
];

const stepIcons = [User, FileText, CreditCard, Building, GraduationCap];

const VendorOnboarding = () => {
  const { toast } = useToast();
  const [vendors, setVendors] = useState(initialVendors);
  const [selectedVendor, setSelectedVendor] = useState<OnboardingVendor | null>(null);

  const handleAdvanceStep = (vendorId: string) => {
    setVendors(prev => prev.map(v => {
      if (v.id !== vendorId) return v;
      const newSteps = v.steps.map((s, i) => {
        if (i === v.currentStep - 1) return { ...s, status: "completed" as const };
        if (i === v.currentStep) return { ...s, status: "current" as const };
        return s;
      });
      const updated = { ...v, steps: newSteps, currentStep: Math.min(v.currentStep + 1, 5) };
      if (selectedVendor?.id === vendorId) setSelectedVendor(updated);
      return updated;
    }));
    toast({ title: "Step approved", description: "Vendor advanced to the next onboarding step." });
  };

  const completedCount = vendors.filter(v => v.steps.every(s => s.status === "completed")).length;
  const inProgressCount = vendors.length - completedCount;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Vendor Onboarding</h1>
        <p className="text-muted-foreground">Multi-step onboarding wizard with verification tracking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><Clock className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold text-foreground">{inProgressCount}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10"><CheckCircle className="h-5 w-5 text-green-500" /></div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedCount}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary"><User className="h-5 w-5 text-muted-foreground" /></div>
              <div>
                <p className="text-2xl font-bold text-foreground">{vendors.length}</p>
                <p className="text-xs text-muted-foreground">Total Applicants</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Onboarding Queue</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Current Step</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.map(v => {
                    const progress = (v.steps.filter(s => s.status === "completed").length / v.steps.length) * 100;
                    const currentStepName = v.steps.find(s => s.status === "current")?.name ?? "Complete";
                    return (
                      <TableRow key={v.id} className="cursor-pointer" onClick={() => setSelectedVendor(v)}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{v.name}</p>
                            <p className="text-xs text-muted-foreground">{v.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{v.appliedAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 min-w-[120px]">
                            <Progress value={progress} className="h-2 flex-1" />
                            <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="secondary">{currentStepName}</Badge></TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleAdvanceStep(v.id); }}>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader><CardTitle>Step Details</CardTitle></CardHeader>
            <CardContent>
              {selectedVendor ? (
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-foreground">{selectedVendor.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedVendor.email}</p>
                  </div>
                  <div className="space-y-3">
                    {selectedVendor.steps.map((step, i) => {
                      const Icon = stepIcons[i];
                      return (
                        <div key={step.name} className={`flex items-center gap-3 p-3 rounded-lg border ${step.status === "current" ? "border-primary bg-primary/5" : "border-border"}`}>
                          {step.status === "completed" ? (
                            <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                          ) : step.status === "current" ? (
                            <Icon className="h-5 w-5 text-primary shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className={`text-sm ${step.status === "pending" ? "text-muted-foreground" : "font-medium"}`}>{step.name}</p>
                            <p className="text-[10px] text-muted-foreground">
                              {step.status === "completed" ? "Verified" : step.status === "current" ? "Awaiting review" : "Not started"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Button className="w-full" onClick={() => handleAdvanceStep(selectedVendor.id)}>
                    Approve Current Step
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">Select a vendor to view onboarding details</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorOnboarding;
