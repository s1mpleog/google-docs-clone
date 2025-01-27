"use client";
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface RenameDialog {
  documentId: Id<"documents">;
  initialTitle: string;
  children: React.ReactNode;
}

const RenameDialog: FC<RenameDialog> = ({
  children,
  documentId,
  initialTitle,
}) => {
  const update = useMutation(api.documents.updateById);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(initialTitle);

  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    update({ id: documentId, title: title.trim() || "Untitled" })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .then(() => {
        setOpen(false);
        toast.success("Document updated");
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              placeholder="Document name"
              onClick={(e) => e.stopPropagation()}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              onClick={(e) => e.stopPropagation()}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
