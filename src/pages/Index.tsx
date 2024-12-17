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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 space-y-6 text-center">
          <h1 className="animate-fade-in text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Audio Book{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Summaries
            </span>
          </h1>
          <p className="animate-fade-in mx-auto max-w-2xl text-lg text-muted-foreground">
            Listen to key insights from the world's best books, carefully curated and summarized for your growth
          </p>
          <div className="animate-fade-in mx-auto max-w-md">
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book, index) => (
            <div
              key={book.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="animate-fade-in mt-12 text-center text-muted-foreground">
            No books found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;