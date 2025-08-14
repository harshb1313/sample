"use client";

import { useRouter } from "next/navigation";

export default function Button() {
  const router = useRouter();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-25 p-3 bg-light">
      
      <button
        onClick={() => router.push("/chat")}
        className="btn btn-primary btn-lg w-100"
        style={{ maxWidth: "360px" }}
      >
        Go to Chat
      </button>
    </div>
  );
}
