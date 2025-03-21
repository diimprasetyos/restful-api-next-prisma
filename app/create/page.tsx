"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const data = await response.json();
    alert(data.message);
    router.push("/");
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-2">create post</h2>
      <form onSubmit={handleSubmit} className="mb-6">
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
          Submit
        </button>
      </form>
    </>
  );
}
