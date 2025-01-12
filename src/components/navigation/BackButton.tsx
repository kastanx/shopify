"use client";

import { useRouter } from "next/navigation";
import ArrowLeft from "../icons/ArrowLeft";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      aria-label="Go back"
      data-pw="back-button"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back
    </button>
  );
}
