import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Link, Mail, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CreateVendor() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", location: "", category: "", canPost: true, canDiscount: true, internationalShipping: false });
  const [inviteLink, setInviteLink] = useState("");

  const set = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  const generateLink = () => {
    if (!form.name || !form.email) { toast({ title: "Please fill required fields", variant: "destructive" }); return; }
    const slug = form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    setInviteLink(`https://chathu.mw/vendor/invite/${slug}-${Math.random().toString(36).slice(2, 8)}`);
    toast({ title: "Invite link generated" });
  };

  const sendInvite = () => {
    if (!inviteLink) { generateLink(); }
    toast({ title: `Invite email sent to ${form.email}` });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast({ title: "Link copied to clipboard" });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()}><ArrowLeft className="w-4 h-4" /></Button>
        <div>
          <h1 className="text-2xl font-bold">Create New Vendor</h1>
          <p className="text-muted-foreground text-sm">Add a vendor and send an invitation</p>
        </div>
      </div>

      <Card className="border-border">
        <CardHeader><CardTitle className="text-lg">Business Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Business Name *</Label>
            <Input placeholder="e.g. Zara Collections MW" value={form.name} onChange={e => set("name", e.target.value)} className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <Label>Email Address *</Label>
            <Input type="email" placeholder="vendor@email.mw" value={form.email} onChange={e => set("email", e.target.value)} className="bg-secondary border-border" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Location City</Label>
              <Select value={form.location} onValueChange={v => set("location", v)}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Select city" /></SelectTrigger>
                <SelectContent>
                  {["Lilongwe", "Blantyre", "Mzuzu", "Zomba", "Mangochi"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Primary Category</Label>
              <Select value={form.category} onValueChange={v => set("category", v)}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {["Fashion", "Electronics", "Beauty", "Groceries", "Home & Living", "Health"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader><CardTitle className="text-lg">Permissions</CardTitle><CardDescription>Control what this vendor can do on the platform</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: "canPost", label: "Can Post to Feed", desc: "Vendor can create posts in the social feed" },
            { key: "canDiscount", label: "Can Offer Discounts", desc: "Vendor can set discount prices on their products" },
            { key: "internationalShipping", label: "International Shipping", desc: "Enable international order processing for this vendor" },
          ].map(p => (
            <div key={p.key} className="flex items-center justify-between rounded-lg bg-secondary p-4">
              <div><p className="font-medium text-sm">{p.label}</p><p className="text-xs text-muted-foreground">{p.desc}</p></div>
              <Switch checked={(form as any)[p.key]} onCheckedChange={v => set(p.key, v)} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader><CardTitle className="text-lg">Invitation</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {inviteLink && (
            <div className="flex items-center gap-2 bg-secondary rounded-lg p-3">
              <Link className="w-4 h-4 text-primary shrink-0" />
              <code className="text-xs text-muted-foreground flex-1 truncate">{inviteLink}</code>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={copyLink}><Copy className="w-4 h-4" /></Button>
            </div>
          )}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={generateLink}><Link className="w-4 h-4 mr-2" />Generate Invite Link</Button>
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={sendInvite}><Mail className="w-4 h-4 mr-2" />Send Invite Email</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
