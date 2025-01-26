"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Navbar from "./navbar";
import TemplatesGallery from "./templates-gallery";

export default function Home() {
  const documents = useQuery(api.documents.get);

  if (documents === undefined) {
    return <p>loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        {documents?.map((d) => <span key={d._id}>{d.title}</span>)}
      </div>
    </div>
  );
}
