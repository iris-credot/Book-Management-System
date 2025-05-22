'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
}

export default function BookPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publishedYear: '',
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://book-management-api-jvxp.onrender.com/api/v1/books/${id}`);
        if (!res.ok) throw new Error('Failed to fetch book');
        const data = await res.json();
        setBook(data);
        setFormData({
          title: data.title,
          author: data.author,
          isbn: data.isbn,
          publishedYear: String(data.publishedYear),
        });
      } catch (err) {
        console.error(err);
        alert('Could not load book.');
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch(`https://book-management-api-jvxp.onrender.com/api/v1/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        publishedYear: parseInt(formData.publishedYear),
      }),
    });

    if (res.ok) {
      alert('Book updated successfully!');
      router.back(); // Go back to book list
    } else {
      alert('Update failed');
    }
  };

  if (!book) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto w-full bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <button
        onClick={() => router.back()}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to Books
      </button>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Edit Book</h2>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white"
          placeholder="Title"
        />
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white"
          placeholder="Author"
        />
        <input
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white"
          placeholder="ISBN"
        />
        <input
          name="publishedYear"
          type="number"
          value={formData.publishedYear}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white"
          placeholder="Published Year"
        />
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
          >
            Save
          </button>
          <button
            onClick={() => router.back()}
            className="border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-5 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
