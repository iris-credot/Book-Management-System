"use client";

import { ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import axios from 'axios';

export default function AddBook() {
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishedYear, setPublishedYear] = useState('');

  const handleClick = () => {
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newBook = {
        title,
        author,
        isbn,
        publishedYear: Number(publishedYear),
      };

      await axios.post("https://book-management-api-jvxp.onrender.com/api/v1/books", newBook);

      alert("Book added successfully!");
      router.push("/"); 
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book.");
    }
  };

  return (
    <div className="bg-white">
      <div className="text-black">
        <div className="p-8">
          <button
            onClick={handleClick}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:border-teal-500 hover:text-teal-500 hover:opacity-80 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Books
          </button>
        
          <h1 className="text-3xl font-bold mt-6">Add New Book</h1>
        </div>

        <div className="flex pl-8 ">
          <div className="p-6 border border-gray-300 rounded-md shadow-xl w-fit px-3 pl-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="title" className="text-sm font-medium pb-3">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-64 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400"
                  placeholder="Enter book title"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="author" className="text-sm font-medium pb-3">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-64 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400"
                  placeholder="Enter author name"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="isbn" className="text-sm font-medium pb-3">ISBN</label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  className="w-64 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400"
                  placeholder="Enter ISBN number"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="publishedYear" className="text-sm font-medium pb-3">Published Year</label>
                <input
                  type="text"
                  id="publishedYear"
                  name="publishedYear"
                  value={publishedYear}
                  onChange={(e) => setPublishedYear(e.target.value)}
                  className="w-64 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400"
                  placeholder="e.g., 2024"
                />
              </div>

              <div>
                <hr className="mb-4 border-gray-300" />
                <div className="flex gap-20">
                  <button
                    type="button"
                    onClick={handleClick}
                    className="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:border-blue-500 hover:text-blue-500 hover:opacity-80 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-white text-sm"
                  >
                    Add Book
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}