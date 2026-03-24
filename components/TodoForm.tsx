"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { formSchema } from "@/schema";
import * as z from "zod";
import Spinner from "./Spinner";
import { Label } from "./ui/label";
import { createTodo } from "@/actions/todoActions";
import { Plus } from "lucide-react";
interface IDefualt {
  title?: string;
  body?: string;
  completed?: boolean;
  id?: string;
  CreatedAt?: Date;
  userId: string | null;
}

const TodoForm = ({
  body = "",
  completed = false,
  title = "",

  userId,
}: IDefualt) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      body,
      completed,
    },
  });
  const [openForm, setopenForm] = useState(false);
  const [loading, setloading] = useState(false);
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setloading(true);
      await createTodo({ ...data, userId: userId as string });

      setloading(false);
      form.reset();
      setopenForm(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog open={openForm} onOpenChange={setopenForm}>
      <DialogTrigger asChild className="">
        <Button className="w-full p-5">
          <Plus strokeWidth="3" />
          New Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
        </DialogHeader>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-3">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Todo Title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="body"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="Todo Description."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value?.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="completed"
              control={form.control}
              render={({ field }) => (
                <div className="flex gap-2">
                  <Checkbox
                    id="completed"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="completed">Complated</Label>
                </div>
              )}
            />
          </FieldGroup>

          <DialogFooter className="pt-8">
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>

            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="form-rhf-demo" disabled={loading}>
              {loading ? (
                <>
                  Save
                  <Spinner />
                </>
              ) : (
                `Save Changes`
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoForm;
