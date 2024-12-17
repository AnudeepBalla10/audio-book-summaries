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
      <Card className="group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={book.coverImage}
              alt={book.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <PlayCircle className="h-12 w-12 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transform translate-y-4" />
              </div>
            </div>
          </div>
          <div className="space-y-2 p-4">
            <h3 className="line-clamp-1 font-semibold tracking-tight">{book.title}</h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              <p className="text-xs text-muted-foreground">{book.duration}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}