import { useState } from "react";
import { BookCard } from "@/components/BookCard";
import { SearchBar } from "@/components/SearchBar";
import { Book } from "@/types/book";

// This would normally come from an API
const mockBooks: Book[] = [
  {
    id: "1",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "Timeless lessons on wealth, greed, and happiness.",
    duration: "3h 15m",
    chapters: [
      {
        id: "1",
        title: "Chapter 1: The Greatest Show On Earth",
        duration: "15:30",
        audioUrl: "/audio/chapter1.mp3",
      },
    ],
  },
  // Add more mock books here
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = mockBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold">Audio Book Summaries</h1>
        <p className="text-muted-foreground">
          Listen to key insights from the world's best books
        </p>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Index;