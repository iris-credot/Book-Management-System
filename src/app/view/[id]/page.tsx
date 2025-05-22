'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
}

export default function ViewBookPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://book-management-api-jvxp.onrender.com/api/v1/books/${id}`);
        if (!res.ok) throw new Error('Failed to fetch book');
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error(err);
        alert('Could not load book.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <div className="p-6 text-center text-gray-600">Loading book details...</div>;
  if (!book) return <div className="p-6 text-center text-red-500 font-medium">Book not found.</div>;

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <button
          onClick={() => router.back()}
          className="text-blue-600 font-medium hover:underline transition duration-200"
        >
          &larr; Back to Books
        </button>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">{book.title}</h1>
          <p className="text-gray-600 text-lg">
            by <span className="font-semibold text-gray-800">{book.author}</span>
          </p>

          <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">ISBN:</span> {book.isbn}
            </p>
            <p>
              <span className="font-semibold">Published Year:</span> {book.publishedYear}
            </p>
          
          </div>
        </div>
      </div>
    </div>
  );
}
