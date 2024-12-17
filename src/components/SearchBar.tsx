import { Input } from "./ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search books..."
        className="h-12 rounded-full border-none bg-white/80 pl-10 pr-4 shadow-lg backdrop-blur-sm transition-shadow duration-200 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary dark:bg-white/10"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}