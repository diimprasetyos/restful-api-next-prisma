"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Edit() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`);
      const result = await response.json();
      setTitle(result.data.title);
      setContent(result.data.content);
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const result = await response.json();
      alert(result.message);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-2">create post</h2>
      <form onSubmit={handleUpdate} className="mb-6">
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border border-gray p-2 mb-4"
        />
        <br />
        <textarea
          type="text"
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full border border-gray p-2 mb-4"
        />
        <br />
        <button type="submit" className="border border-gray-800 p-2">
          Update
        </button>
      </form>
    </>
  );
}
