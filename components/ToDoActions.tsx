"use client";
import { deleteTodo } from "@/actions/todoActions";
import { ITodos } from "@/interface";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import Spinner from "./Spinner";
import { Button } from "./ui/button";
import UpdateTodoForm from "./UpdateTodoForm";

const ToDoActions = ({ data }: { data: ITodos }) => {
  const [loading, setloading] = useState(false);
  const [Open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="secondary"
        disabled={loading}
        onClick={() => setOpen(true)}
      >
        <Edit />
      </Button>
      <Button
        disabled={loading}
        onClick={async () => {
          setloading(true);
          await deleteTodo(data.id);
          setloading(false);
        }}
        variant="destructive"
      >
        {loading ? <Spinner /> : <Trash />}
      </Button>
      {Open && (
        <UpdateTodoForm
          id={data.id}
          CreatedAt={data.CreatedAt}
          title={data.title}
          body={data.body as string}
          completed={data.completed}
          openForm={Open}
          setFormopen={setOpen}
        />
      )}
    </>
  );
};

export default ToDoActions;
