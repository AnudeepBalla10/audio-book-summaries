import { useState } from "react";
import { useParams } from "react-router-dom";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/book";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

// This would normally come from an API
const mockBook: Book = {
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
};

const BookDetail = () => {
  const { id } = useParams();
  const [currentChapter, setCurrentChapter] = useState(mockBook.chapters[0]);

  const handleNextChapter = () => {
    const currentIndex = mockBook.chapters.findIndex(
      (chapter) => chapter.id === currentChapter.id
    );
    if (currentIndex < mockBook.chapters.length - 1) {
      setCurrentChapter(mockBook.chapters[currentIndex + 1]);
    }
  };

  const handlePreviousChapter = () => {
    const currentIndex = mockBook.chapters.findIndex(
      (chapter) => chapter.id === currentChapter.id
    );
    if (currentIndex > 0) {
      setCurrentChapter(mockBook.chapters[currentIndex - 1]);
    }
  };

  return (
    <div className="container mx-auto min-h-screen px-4 py-8 pb-32">
      <Link to="/">
        <Button variant="ghost" className="mb-8">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Books
        </Button>
      </Link>

      <div className="grid gap-8 md:grid-cols-[300px,1fr]">
        <div className="aspect-[3/4] overflow-hidden rounded-lg">
          <img
            src={mockBook.coverImage}
            alt={mockBook.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold">{mockBook.title}</h1>
            <p className="text-xl text-muted-foreground">{mockBook.author}</p>
          </div>

          <p className="text-lg leading-relaxed">{mockBook.description}</p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Chapters</h2>
            <div className="space-y-2">
              {mockBook.chapters.map((chapter) => (
                <Button
                  key={chapter.id}
                  variant={
                    chapter.id === currentChapter.id ? "default" : "outline"
                  }
                  className="w-full justify-between"
                  onClick={() => setCurrentChapter(chapter)}
                >
                  <span>{chapter.title}</span>
                  <span>{chapter.duration}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AudioPlayer
        chapter={currentChapter}
        onNext={
          currentChapter.id !== mockBook.chapters[mockBook.chapters.length - 1].id
            ? handleNextChapter
            : undefined
        }
        onPrevious={
          currentChapter.id !== mockBook.chapters[0].id
            ? handlePreviousChapter
            : undefined
        }
      />
    </div>
  );
};

export default BookDetail;