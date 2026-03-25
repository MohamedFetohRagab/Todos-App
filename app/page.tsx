import TodoTable from "@/components/AllTodosTable";
import Nav from "@/components/Nav";
import TodoForm from "@/components/TodoForm";
import { auth } from "@clerk/nextjs/server";
export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="w-full h-full">
      <Nav />
      <TodoForm userId={userId} body="" title="" completed={false} />
      <TodoTable userId={userId as string} />
    </div>
  );
}
