import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { db } from "@/config/firebase";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Edit } from "lucide-react";

interface TaskForm {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default function EditTask({ id, title, description, status }: TaskForm) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TaskForm>({
    defaultValues: {
      title: title,
      description: description,
      status: status,
    },
  });
  const selectedValue = watch("status");

  const handleEditTask = async () => {
    try {
      const { title, description, status } = getValues();
      await setDoc(doc(db, "tasks", id), {
        title,
        description,
        status,
      });

      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reset({ title, description, status });
  }, [title, description, status]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="rounded-full p-2 transition hover:bg-slate-200">
          <Edit className="size-4" />
        </button>
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={() => reset()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center">Edit Task</DialogTitle>
        </DialogHeader>
        <form className="grid gap-5" onSubmit={handleSubmit(handleEditTask)}>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              {...register("title", { required: "This field is required" })}
            />
            {errors.title && (
              <i className="text-xs text-red-500">{errors.title.message}</i>
            )}
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Describe more about the task"
              {...register("description", {
                required: "This field is required",
              })}
            />
            {errors.description && (
              <i className="text-xs text-red-500">
                {errors.description.message}
              </i>
            )}
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select onValueChange={(value) => setValue("status", value)}>
              <SelectTrigger className="w-[180px]">
                {selectedValue ? selectedValue : "Select status"}
              </SelectTrigger>
              <SelectContent
                {...register("status", {
                  required: "This field is required",
                })}
              >
                <SelectGroup>
                  <SelectItem value="todo">todo</SelectItem>
                  <SelectItem value="inprogress">inprogress</SelectItem>
                  <SelectItem value="completed">completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.status && (
              <i className="text-xs text-red-500">{errors.status.message}</i>
            )}
          </div>

          <Button>Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
