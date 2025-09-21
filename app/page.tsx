"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const randomString = Math.random().toString(36).substring(2, 8);
    router.push(`/${randomString}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-infinity loading-xl "></span>
    </div>
  );
}