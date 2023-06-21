import Image from "next/image";
import { Inter } from "next/font/google";

import { useState, useEffect } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

import { DataStore } from "@aws-amplify/datastore";
import { Post } from "../../models";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    async function fetchPosts() {
      const postData = await DataStore.query(Post);
      setPosts(postData);
      console.log(posts);
    }
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>My Post</h1>
      {posts.map((post) => (
        <Link href={`/posts/${post.id}`}>
          <h2>{post.title}</h2>
        </Link>
      ))}
    </main>
  );
}
