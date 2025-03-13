"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "./sidebar";
import { BookmarkList } from "./bookmark-list";
import { AddBookmarkModal } from "./add-bookmark-modal";
import { AddCategoryModal } from "./add-category-modal";

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
  };
}

interface Bookmark {
  id: number;
  attributes: {
    title: string;
    url: string;
    category: {
      data: Category;
    };
  };
}

export function BookmarkManager() {
  const [isAddBookmarkOpen, setIsAddBookmarkOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchBookmarks();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:1337/api/categories");
    const data = await response.json();
    setCategories(data.data);
  };

  const fetchBookmarks = async () => {
    const response = await fetch(
      "http://localhost:1337/api/bookmarks?populate=category"
    );
    const data = await response.json();
    setBookmarks(data.data);
  };

  const addCategory = async (name: string) => {
    const response = await fetch("http://localhost:1337/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { name } }),
    });
    if (response.ok) {
      fetchCategories();
      setIsAddCategoryOpen(false);
    }
  };

  const addBookmark = async (
    title: string,
    url: string,
    categoryId: number
  ) => {
    const response = await fetch("http://localhost:1337/api/bookmarks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          title,
          url,
          category: categoryId,
        },
      }),
    });
    if (response.ok) {
      fetchBookmarks();
      setIsAddBookmarkOpen(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        categories={categories}
        onAddCategory={() => setIsAddCategoryOpen(true)}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <main className="flex-1 p-6 overflow-auto">
        <BookmarkList
          bookmarks={bookmarks}
          category={selectedCategory}
          onAddBookmark={() => setIsAddBookmarkOpen(true)}
        />
      </main>
      <AddBookmarkModal
        isOpen={isAddBookmarkOpen}
        onClose={() => setIsAddBookmarkOpen(false)}
        onAddBookmark={addBookmark}
        categories={categories}
      />
      <AddCategoryModal
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onAddCategory={addCategory}
      />
    </div>
  );
}
