import { useState, useEffect } from "react";
import { AddNoteCard } from "@/components/AddNoteCard";
import { NoteCard } from "@/components/NoteCard";
import { SearchBar } from "@/components/SearchBar";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las notas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addNote = async (noteData: Omit<Note, "id">) => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([noteData])
        .select()
        .single();

      if (error) throw error;

      setNotes((prev) => [data, ...prev]);
      toast({
        title: "Éxito",
        description: "Nota agregada correctamente",
      });
    } catch (error) {
      console.error('Error adding note:', error);
      toast({
        title: "Error",
        description: "No se pudo agregar la nota",
        variant: "destructive",
      });
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setNotes((prev) => prev.filter((note) => note.id !== id));
      toast({
        title: "Éxito",
        description: "Nota eliminada correctamente",
      });
    } catch (error) {
      console.error('Error deleting note:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la nota",
        variant: "destructive",
      });
    }
  };

  const toggleReviewStatus = async (id: string) => {
    try {
      const note = notes.find((n) => n.id === id);
      if (!note) return;

      const { error } = await supabase
        .from('notes')
        .update({ reviewed: !note.reviewed })
        .eq('id', id);

      if (error) throw error;

      setNotes((prev) =>
        prev.map((note) =>
          note.id === id ? { ...note, reviewed: !note.reviewed } : note
        )
      );
    } catch (error) {
      console.error('Error updating note:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la nota",
        variant: "destructive",
      });
    }
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
          <h1 className="text-3xl font-bold mb-6">Notas Adhesivas de Enlaces</h1>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>
      <main className="container py-6">
        <div className="masonry-grid">
          <AddNoteCard onAddNote={addNote} />
          {isLoading ? (
            <p className="text-center text-gray-500">Cargando notas...</p>
          ) : (
            filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={() => deleteNote(note.id)}
                onToggleReview={() => toggleReviewStatus(note.id)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;