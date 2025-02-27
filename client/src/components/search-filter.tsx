import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  genre: string;
  onGenreChange: (value: string) => void;
}

const GENRES = ["All", "Rock", "Jazz", "Electronic", "Pop", "Hip Hop", "Classical"];

export default function SearchFilter({ search, onSearchChange, genre, onGenreChange }: SearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="sm:flex-1"
      />
      <Select value={genre} onValueChange={onGenreChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Genre" />
        </SelectTrigger>
        <SelectContent>
          {GENRES.map((g) => (
            <SelectItem key={g} value={g.toLowerCase()}>
              {g}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
