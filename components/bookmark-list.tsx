import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { BookmarkCard } from "./bookmark-card";

interface Bookmark {
  id: number;
  attributes: {
    title: string;
    url: string;
    category: {
      data: {
        attributes: {
          slug: string;
        };
      };
    };
  };
}

interface BookmarkListProps {
  bookmarks: Bookmark[];
  category: string | null;
  onAddBookmark: () => void;
}

export function BookmarkList({
  bookmarks,
  category,
  onAddBookmark,
}: BookmarkListProps) {
  const filteredBookmarks = category
    ? bookmarks.filter(
        (bookmark) =>
          bookmark.attributes.category.data.attributes.slug === category
      )
    : bookmarks;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{category || "All Bookmarks"}</h2>
        <Button onClick={onAddBookmark}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Bookmark
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} {...bookmark.attributes} />
        ))}
      </div>
    </div>
  );
}
