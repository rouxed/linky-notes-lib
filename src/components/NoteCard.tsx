import { ExternalLink, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NoteCardProps {
  note: {
    url: string;
    title: string;
    description: string;
    tags: string[];
    color: string;
  };
  onDelete: () => void;
}

export const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  return (
    <div className={`note-card bg-${note.color}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg line-clamp-2">{note.title}</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-500 hover:text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {note.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{note.description}</p>
      )}
      <div className="flex flex-wrap gap-2 mb-3">
        {note.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      <a
        href={note.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm text-primary hover:underline"
      >
        Visit Link
        <ExternalLink className="h-3 w-3 ml-1" />
      </a>
    </div>
  );
};