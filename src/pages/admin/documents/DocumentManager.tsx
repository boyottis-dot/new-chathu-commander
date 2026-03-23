import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { folders as initialFolders, files as initialFiles, templates, versions, type DocFolder, type DocFile } from "@/lib/mock-data-documents";
import { departments } from "@/lib/mock-data-team";
import { Search, Plus, FolderOpen, FileText, Star, StarOff, Download, Trash2, Eye, Clock, Users, MoreHorizontal, Folder, File, Upload } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const typeIcons: Record<string, string> = { pdf: "📄", docx: "📝", xlsx: "📊", pptx: "📑", image: "🖼️", csv: "📋", other: "📎" };

export default function DocumentManager() {
  const [fldrs, setFldrs] = useState<DocFolder[]>(initialFolders);
  const [fls, setFls] = useState<DocFile[]>(initialFiles);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);
  const [showVersions, setShowVersions] = useState<string | null>(null);
  const [newFolder, setNewFolder] = useState({ name: "", department: "", color: "#3b82f6" });
  const [newFile, setNewFile] = useState({ name: "", type: "pdf" as DocFile["type"], folderId: "" });

  const currentFolders = fldrs.filter(f => f.parentId === currentFolder);
  const currentFiles = fls.filter(f => {
    if (currentFolder && f.folderId !== currentFolder) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const breadcrumbs: DocFolder[] = [];
  let crumbId = currentFolder;
  while (crumbId) {
    const folder = fldrs.find(f => f.id === crumbId);
    if (folder) { breadcrumbs.unshift(folder); crumbId = folder.parentId; } else break;
  }

  const toggleStar = (id: string) => setFls(prev => prev.map(f => f.id === id ? { ...f, starred: !f.starred } : f));
  const deleteFile = (id: string) => { setFls(prev => prev.filter(f => f.id !== id)); toast({ title: "File deleted" }); };

  const handleAddFolder = () => {
    if (!newFolder.name) return;
    setFldrs(prev => [...prev, { id: `fld-${Date.now()}`, name: newFolder.name, parentId: currentFolder, color: newFolder.color, fileCount: 0, department: newFolder.department || "General", createdBy: "Admin" }]);
    setShowAddFolder(false);
    setNewFolder({ name: "", department: "", color: "#3b82f6" });
    toast({ title: "Folder created" });
  };

  const handleAddFile = () => {
    if (!newFile.name) return;
    setFls(prev => [...prev, { id: `file-${Date.now()}`, name: newFile.name, type: newFile.type, size: "0 KB", folderId: newFile.folderId || currentFolder || "fld-1", uploadedBy: "Admin", uploadDate: new Date().toISOString().split("T")[0], lastModified: new Date().toISOString().split("T")[0], version: 1, sharedWith: [], tags: [], starred: false }]);
    setShowAddFile(false);
    setNewFile({ name: "", type: "pdf", folderId: "" });
    toast({ title: "File added" });
  };

  const fileVersions = showVersions ? versions.filter(v => v.fileId === showVersions) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Document Manager</h1><p className="text-muted-foreground">Organize, share, and track company documents</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowAddFolder(true)}><FolderOpen className="h-4 w-4 mr-1" />New Folder</Button>
          <Button size="sm" onClick={() => setShowAddFile(true)}><Upload className="h-4 w-4 mr-1" />Upload File</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Files</p><p className="text-2xl font-bold">{fls.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Folders</p><p className="text-2xl font-bold">{fldrs.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Starred</p><p className="text-2xl font-bold text-amber-400">{fls.filter(f => f.starred).length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Templates</p><p className="text-2xl font-bold">{templates.length}</p></CardContent></Card>
      </div>

      {/* Breadcrumbs */}
      <div className="flex items-center gap-1 text-sm">
        <Button variant="ghost" size="sm" className="text-xs" onClick={() => setCurrentFolder(null)}>📁 All Files</Button>
        {breadcrumbs.map(bc => (
          <span key={bc.id} className="flex items-center gap-1">
            <span className="text-muted-foreground">/</span>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => setCurrentFolder(bc.id)}>{bc.name}</Button>
          </span>
        ))}
      </div>

      <Card><CardContent className="p-4">
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search files..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" /></div>
      </CardContent></Card>

      {/* Folders Grid */}
      {currentFolders.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {currentFolders.map(folder => (
            <Card key={folder.id} className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setCurrentFolder(folder.id)}>
              <CardContent className="p-3 text-center">
                <div className="text-3xl mb-1">📁</div>
                <p className="text-xs font-medium truncate">{folder.name}</p>
                <p className="text-[10px] text-muted-foreground">{folder.fileCount} files</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Files Table */}
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Size</TableHead><TableHead>Uploaded By</TableHead><TableHead>Modified</TableHead><TableHead>Version</TableHead><TableHead>Shared</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {currentFiles.map(file => (
              <TableRow key={file.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{typeIcons[file.type]}</span>
                    <div><p className="text-sm font-medium">{file.name}</p><div className="flex gap-1 mt-0.5">{file.tags.slice(0, 2).map(t => <Badge key={t} variant="outline" className="text-[9px] py-0">{t}</Badge>)}</div></div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{file.size}</TableCell>
                <TableCell className="text-sm">{file.uploadedBy}</TableCell>
                <TableCell className="text-sm">{file.lastModified}</TableCell>
                <TableCell><Badge variant="outline" className="text-xs">v{file.version}</Badge></TableCell>
                <TableCell><div className="flex gap-0.5">{file.sharedWith.slice(0, 2).map(s => <Badge key={s} variant="secondary" className="text-[9px]">{s}</Badge>)}</div></TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Eye className="h-3 w-3 mr-2" />Preview</DropdownMenuItem>
                      <DropdownMenuItem><Download className="h-3 w-3 mr-2" />Download</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleStar(file.id)}>{file.starred ? <><StarOff className="h-3 w-3 mr-2" />Unstar</> : <><Star className="h-3 w-3 mr-2" />Star</>}</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setShowVersions(file.id)}><Clock className="h-3 w-3 mr-2" />Version History</DropdownMenuItem>
                      <DropdownMenuItem><Users className="h-3 w-3 mr-2" />Share</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteFile(file.id)} className="text-red-400"><Trash2 className="h-3 w-3 mr-2" />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>

      {/* Version History Dialog */}
      <Dialog open={!!showVersions} onOpenChange={() => setShowVersions(null)}>
        <DialogContent><DialogHeader><DialogTitle>Version History</DialogTitle></DialogHeader>
          <div className="space-y-2">
            {fileVersions.length > 0 ? fileVersions.map(v => (
              <div key={v.id} className="flex items-center justify-between p-3 bg-muted/30 rounded">
                <div><p className="text-sm font-medium">Version {v.version}</p><p className="text-xs text-muted-foreground">{v.modifiedBy} · {v.modifiedDate}</p><p className="text-xs">{v.changes}</p></div>
                <div className="text-right"><p className="text-xs text-muted-foreground">{v.size}</p><Button variant="outline" size="sm" className="mt-1"><Download className="h-3 w-3 mr-1" />Restore</Button></div>
              </div>
            )) : <p className="text-sm text-muted-foreground text-center py-4">No version history available</p>}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Folder Dialog */}
      <Dialog open={showAddFolder} onOpenChange={setShowAddFolder}>
        <DialogContent><DialogHeader><DialogTitle>Create Folder</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Folder Name</Label><Input value={newFolder.name} onChange={e => setNewFolder(p => ({ ...p, name: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Department</Label><Select value={newFolder.department} onValueChange={v => setNewFolder(p => ({ ...p, department: v }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{departments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}</SelectContent></Select></div>
              <div><Label>Color</Label><Input type="color" value={newFolder.color} onChange={e => setNewFolder(p => ({ ...p, color: e.target.value }))} /></div>
            </div>
          </div>
          <DialogFooter><Button onClick={handleAddFolder}>Create</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload File Dialog */}
      <Dialog open={showAddFile} onOpenChange={setShowAddFile}>
        <DialogContent><DialogHeader><DialogTitle>Upload File</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>File Name</Label><Input value={newFile.name} onChange={e => setNewFile(p => ({ ...p, name: e.target.value }))} placeholder="document.pdf" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Type</Label><Select value={newFile.type} onValueChange={v => setNewFile(p => ({ ...p, type: v as DocFile["type"] }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pdf">PDF</SelectItem><SelectItem value="docx">Word</SelectItem><SelectItem value="xlsx">Excel</SelectItem><SelectItem value="pptx">PowerPoint</SelectItem><SelectItem value="image">Image</SelectItem><SelectItem value="csv">CSV</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select></div>
              <div><Label>Folder</Label><Select value={newFile.folderId} onValueChange={v => setNewFile(p => ({ ...p, folderId: v }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{fldrs.filter(f => !f.parentId).map(f => <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">Max file size: 50MB</p>
            </div>
          </div>
          <DialogFooter><Button onClick={handleAddFile}>Upload</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
