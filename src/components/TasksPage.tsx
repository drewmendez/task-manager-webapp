import { collection } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

import AddNewTask from "./AddNewTask";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { Skeleton } from "./ui/skeleton";

export default function TasksPage() {
  const status = ["todo", "inprogress", "completed"];

  return (
    <section className="h-screen bg-zinc-100 pt-[80px]">
      <h1 className="py-6 text-center text-3xl font-semibold">
        Task Management
      </h1>
      <div className="container h-3/4">
        <div className="flex h-full gap-10">
          {status.map((item) => (
            <Container key={item} status={item} />
          ))}
        </div>
        <div className="flex justify-center py-3">
          <AddNewTask />
        </div>
      </div>
    </section>
  );
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

function Container({ status }: { status: string }) {
  const [data] = useCollection(collection(db, "tasks"));

  const tasks = data?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Task[];

  return (
    <div className="relative h-full w-full">
      <p
        className={`absolute inset-x-0 rounded-md py-3 text-center font-semibold uppercase text-white ${status === "todo" ? "bg-red-400" : status === "inprogress" ? "bg-blue-400" : "bg-green-400"}`}
      >
        {status}
      </p>
      <div className="h-full w-full space-y-3 overflow-auto rounded-lg bg-slate-200 p-4 pt-14 text-sm shadow-inner">
        {tasks ? (
          tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <div className="divide-y rounded-md bg-white p-4" key={task.id}>
                <p className="p-2 font-semibold text-slate-500 first:pt-0">
                  {task.title}
                </p>
                <p className="p-2 text-slate-400">{task.description}</p>
                <div className="flex justify-end gap-2 p-2 last:pb-0">
                  <EditTask
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                  />
                  <DeleteTask id={task.id} />
                </div>
              </div>
            ))
        ) : (
          <>
            <Skeleton className="h-[160px] w-full" />
            <Skeleton className="h-[160px] w-full" />
            <Skeleton className="h-[160px] w-full" />
          </>
        )}
      </div>
    </div>
  );
}
