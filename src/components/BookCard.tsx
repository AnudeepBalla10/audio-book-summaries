import { Book } from "@/types/book";
import { Card, CardContent } from "./ui/card";
import { PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link to={`/book/${book.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={book.coverImage}
              alt={book.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex h-full items-center justify-center">
                <PlayCircle className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="line-clamp-1 text-lg font-semibold">{book.title}</h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            <p className="mt-2 text-xs text-muted-foreground">{book.duration}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}