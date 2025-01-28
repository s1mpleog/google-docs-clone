"use client";
import React from "react";
import Editor from "./editor";
import Toolbar from "./toolbar";
import Navbar from "./navbar";
import { Room } from "./room";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface Document {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

export function Document({ preloadedDocument }: Document) {
  const document = usePreloadedQuery(preloadedDocument);

  if (!preloadedDocument) {
    throw new Error("Document not found");
  }

  return (
    <Room>
      <div className="min-h-screen bg-[#F9FBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
          <Navbar data={document} />
          <Toolbar />
        </div>
        <div className="pt-[140px] print:pt-0">
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
  );
}
