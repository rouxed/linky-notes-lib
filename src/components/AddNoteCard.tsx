import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AddNoteCardProps {
  onAddNote: (note: {
    url: string;
    title: string;
    description: string;
    tags: string[];
    color: string;
    reviewed: boolean;
  }) => void;
}

export const AddNoteCard = ({ onAddNote }: AddNoteCardProps) => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const { toast } = useToast();

  const colors = ["note-yellow", "note-blue", "note-green", "note-pink", "note-purple"];
  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    onAddNote({
      url,
      title: title || url,
      description,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      color: randomColor(),
      reviewed: false, // New notes are initially unreviewed
    });

    setUrl("");
    setTitle("");
    setDescription("");
    setTags("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-[200px] w-full border-dashed border-2 hover:border-primary hover:text-primary transition-colors"
        >
          <Plus className="h-8 w-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Link Note</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title (Optional)</Label>
            <Input
              id="title"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (Comma separated)</Label>
            <Input
              id="tags"
              placeholder="react, javascript, tutorial"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">Add Note</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};