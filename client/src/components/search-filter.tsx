import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  genre: string;
  onGenreChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
}

const GENRES = ["All", "Rock", "Jazz", "Electronic", "Pop", "Hip Hop", "World Music", "Classical"];
const VENUE_TYPES = [
  { value: "all", label: "All Venues" },
  { value: "live_house", label: "Live Houses" },
  { value: "bar", label: "Bars" },
  { value: "club", label: "Clubs" }
];

export default function SearchFilter({ 
  search, 
  onSearchChange, 
  genre, 
  onGenreChange,
  type,
  onTypeChange
}: SearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Input
        placeholder="Search venues..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="sm:flex-1"
      />
      <Select value={type} onValueChange={onTypeChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Venue Type" />
        </SelectTrigger>
        <SelectContent>
          {VENUE_TYPES.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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