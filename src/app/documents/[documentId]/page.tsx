import { auth } from "@clerk/nextjs/server";
import React, { FC } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "./document";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

interface DocumentIdPageProps {
  params: Promise<{ documentId: Id<"documents"> }>;
}

const DocumentIdPage: FC<DocumentIdPageProps> = async ({ params }) => {
  const { documentId } = await params;
  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const document = await preloadQuery(
    api.documents.getById,
    { id: documentId },
    { token }
  );

  return <Document preloadedDocument={document} />;
};

export default DocumentIdPage;
