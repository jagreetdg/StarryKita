import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "@/lib/translations/context";

interface SearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  genre: string;
  onGenreChange: (value: string) => void;
}

const GENRES = ["All", "Rock", "Jazz", "Electronic", "Pop", "Hip Hop", "World Music", "Classical"];

export default function SearchFilter({ 
  search, 
  onSearchChange, 
  genre, 
  onGenreChange
}: SearchFilterProps) {
  const { t } = useTranslations();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Input
        placeholder={t('search', 'placeholder')}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="sm:flex-1"
      />
      <Select value={genre} onValueChange={onGenreChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder={t('search', 'genre')} />
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