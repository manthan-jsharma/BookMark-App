import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle } from "lucide-react";

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
  };
}

interface SidebarProps {
  categories: Category[];
  onAddCategory: () => void;
  onSelectCategory: (category: string | null) => void;
  selectedCategory: string | null;
}

export function Sidebar({
  categories,
  onAddCategory,
  onSelectCategory,
  selectedCategory,
}: SidebarProps) {
  return (
    <div className="w-64 bg-muted border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h1 className="text-2xl font-bold">Bookmarks</h1>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-2">
          <Button
            variant={selectedCategory === null ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onSelectCategory(null)}
          >
            All Bookmarks
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={
                selectedCategory === category.attributes.slug
                  ? "secondary"
                  : "ghost"
              }
              className="w-full justify-start"
              onClick={() => onSelectCategory(category.attributes.slug)}
            >
              {category.attributes.name}
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t border-border">
        <Button onClick={onAddCategory} className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
    </div>
  );
}
