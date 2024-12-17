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
    coverImage: "/books/The Psychology of Money/cover.jpg",
    description: "Timeless lessons on wealth, greed, and happiness.",
    duration: "3h 15m",
    chapters: [
      {
        id: "1",
        title: "Chapter 1: The Greatest Show On Earth",
        duration: "15:30",
        audioUrl: "/books/The Psychology of Money/chapters/chapter1.mp3",
      },
    ],
  },
  {
    id: "2",
    title: "The Monk Who Sold His Ferrari",
    author: "Robin Sharma",
    coverImage: "/books/The Monk Who Sold His Ferrari/cover.jpg",
    description: "A spiritual journey of self-discovery and transformation.",
    duration: "3:39",
    chapters: [
      {
        id: "1",
        title: "Chapter 1",
        duration: "3:39",
        audioUrl: "/books/The Monk Who Sold His Ferrari/chapters/Chapter1.mp3",
      },
    ],
  },
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