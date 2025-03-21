"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [posts, setPost] = useState([]);
  const router = useRouter()
  
  const getPosts = async () => {
    const response = await fetch("http://localhost:3000/api/posts");
    const { data } = await response.json();
    setPost(data);
  };
  useEffect(() => {
    getPosts();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    alert(result.message);
    getPosts();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 items-center bg-amber-100">
      <div className="flex mx-auto">
      <h1 className="text-md font-bold">data:</h1>
      <Link href='/create' className="border border-gray-800 p-2">create post</Link>
      </div>
      
      {posts.map((post) => (
        <div key={post.id} className="border border-gray-800 items-center p-4">
          <div className="text-xl mb-2">{post.title}</div>
          <div className="text-sm mb-2">{post.content}</div>
          <button
            onClick={() => router.push(`/edit/${post.id}`)}
            className="text-sm text-red-600 border border inset-shadow-gray-200 p-2"
          >
            edit
          </button>
          <button
            onClick={() => handleDelete(post.id)}
            className="text-sm text-red-600 border border- inset-shadow-gray-200 p-2"
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
}
