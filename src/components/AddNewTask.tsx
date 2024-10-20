import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
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
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface TaskForm {
  title: string;
  description: string;
  status: string;
}

export default function AddNewTask() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TaskForm>();

  const handleAddTask = async () => {
    try {
      const { title, description, status } = getValues();
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        status,
      });
      reset();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add New Task</Button>
      </DialogTrigger>
      <DialogContent onCloseAutoFocus={() => reset()}>
        <DialogHeader>
          <DialogTitle className="text-center">Add New Task</DialogTitle>
        </DialogHeader>
        <form className="grid gap-5" onSubmit={handleSubmit(handleAddTask)}>
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
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent
                {...register("status", {
                  required: "This field is required",
                })}
              >
                <SelectGroup>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="inprogress">Inprogress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.status && (
              <i className="text-xs text-red-500">{errors.status.message}</i>
            )}
          </div>

          <Button>Add Task</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
