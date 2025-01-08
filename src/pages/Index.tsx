import { useState } from "react";
import { AddNoteCard } from "@/components/AddNoteCard";
import { NoteCard } from "@/components/NoteCard";
import { SearchBar } from "@/components/SearchBar";

interface Note {
  id: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  reviewed: boolean;
}

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addNote = (noteData: Omit<Note, "id">) => {
    const newNote = {
      ...noteData,
      id: Date.now().toString(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const toggleReviewStatus = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, reviewed: !note.reviewed } : note
      )
    );
  };

  const filteredNotes = notes.filter((note) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(searchLower) ||
      note.description.toLowerCase().includes(searchLower) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Link Sticky Notes</h1>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>
      <main className="container py-6">
        <div className="masonry-grid">
          <AddNoteCard onAddNote={addNote} />
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={() => deleteNote(note.id)}
              onToggleReview={() => toggleReviewStatus(note.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;