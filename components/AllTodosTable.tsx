import { getTodos } from "@/actions/todoActions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Completed from "./Completed";
import ToDoActions from "./ToDoActions";
import { ITodos } from "@/interface";

export default async function TodoTable({ userId }: { userId: string }) {
  const Todos: ITodos[] = (await getTodos(userId)) || [];

  return (
    <Table>
      <TableCaption>A list of your ToDos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Todo Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Completed</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Todos && Todos.length ? (
          Todos.map(({ id, title, completed, body }: ITodos) => (
            <TableRow key={id}>
              <TableCell>{title}</TableCell>
              <TableCell>{body}</TableCell>
              <TableCell>
                <Completed completed={completed as boolean} />
              </TableCell>
              <TableCell className="flex justify-end gap-1.5">
                <ToDoActions data={{ id, title, completed, body }} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="text-center text-lg" colSpan={4}>
              You Don&apos;t Have Todos Yet.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{Todos.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
