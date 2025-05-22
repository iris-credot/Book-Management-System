'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: number;
  publishedYear: number;
}

export default function Home() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);

  const handleAdd = () => {
    router.push("/posts");
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get("https://book-management-api-jvxp.onrender.com/api/v1/books");
      if (Array.isArray(response.data)) {
        setBooks(response.data);
      } else {
        console.warn("API response is not an array:", response.data);
        setBooks([]);
      }
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleView = (id: string) => {
    router.push(`/view/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://book-management-api-jvxp.onrender.com/api/v1/books/${id}`);
      fetchBooks(); // Refresh list after deletion
    } catch (error) {
      console.log("Error deleting book:", error);
    }
  };

  return (
    <div className="bg-white p-8 overflow-auto flex flex-col">
      <div className="flex justify-end mb-8">
        <button
          className="flex items-center space-x-2 bg-teal-700 text-white px-5 py-2 rounded-md hover:bg-teal-600 transition font-semibold"
          onClick={handleAdd}
        >
          <FaPlus />
          <span>Add Book</span>
        </button>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex-grow">
        <h2 className="text-lg text-black font-semibold mb-6 border-b border-gray-300 pb-2">Books</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Author</th>
                <th className="px-4 py-2 border">ISBN</th>
                <th className="px-4 py-2 border">Published</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{book.title}</td>
                  <td className="px-4 py-2 border">{book.author}</td>
                  <td className="px-4 py-2 border">{book.isbn}</td>
                  <td className="px-4 py-2 border">{book.publishedYear}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <button onClick={() => handleView(book._id)} className="text-blue-500 hover:text-blue-700" title="View">
                      <FaEye />
                    </button>
                    <button onClick={() => handleEdit(book._id)} className="text-yellow-500 hover:text-yellow-700" title="Edit">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(book._id)} className="text-red-500 hover:text-red-700" title="Delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {books.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
