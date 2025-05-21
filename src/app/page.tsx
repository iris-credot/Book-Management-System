"use client";


import {useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

import { useRouter } from "next/navigation";
interface Post {
  _id?: number;
  title: string;
  author: string;
  isbn: number;
  publishedYear: number;
}

export default function Home() {
  const router=useRouter();
  const [books, setBooks] = useState<Post[]>([]);
  // const [title, setTitle] = useState<string>("");
  // const [body, setbody] = useState<string>("");
  // const [editId, setEditId] = useState<number | null>(null);

  const handleAdd = () => {
    router.push("/posts");
  };
  const fetchBooks = async () => {
    try {
      const response = await axios.get("https://book-management-api-jvxp.onrender.com/api/v1/books");
  
      const mappedBooks = response.data.map((book: Post) => ({
        id: book._id,
        title: book.title,
        author: book.author,
        ISBN: book.isbn,
        PublishedYear: book.publishedYear,
      }));
  
      setBooks(mappedBooks);
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };
useEffect(() => {
  fetchBooks();
}, [])




  return (
  <div className="bg-white p-8 overflow-auto flex flex-col">
    <div className="flex justify-end mb-8">
    <button className="flex items-center space-x-2 bg-teal-700 text-white px-5 py-2 rounded-md hover:bg-teal-600 transition font-semibold" onClick={handleAdd}>
     <FaPlus />
     <span>Add Book</span>
     </button>

    </div>
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex-grow">
      <h2 className="text-lg text-black font-semibold mb-6 border-b border-gray-300 pb-2">Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
            <p className="text-sm text-gray-600">{book.isbn}</p>
            <p className="text-sm text-gray-600">{book.publishedYear}</p>
          </div>
        ))}
      </div>
    </div>
  </div>


  );
  
}