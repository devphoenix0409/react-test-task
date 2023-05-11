import { NoteProps } from "./note";

export interface TableProps {
  fields: string[];
  data: NoteProps[];
}

export const TableFields = ["id", "title", "body", "created_at", "updated_at"];
