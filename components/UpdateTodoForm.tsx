"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { updateTodo } from "@/actions/todoActions";
interface IDefualt {
  openForm: boolean;
  setFormopen: (val: boolean) => void;

  title?: string;
  body?: string;
  completed?: boolean;
  id: string;
  CreatedAt?: Date;
}

const UpdateTodoForm = ({
  body = "",
  completed = false,
  title = "",
  openForm,
  id,
  setFormopen,
}: IDefualt) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      body,
      completed,
      id,
    },
  });

  const [loading, setloading] = useState(false);
  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form Data:", data); // ستجد أن id غير موجود هنا
    console.log("Prop ID:", id);
    try {
      setloading(true);

      await updateTodo({
        id,
        title: data.title,
        completed: data.completed,
        body: data.body as string,
      });
      setloading(false);
      form.reset();
      setFormopen(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog open={openForm} onOpenChange={setFormopen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
        </DialogHeader>
        <form
          id="form-rhf-demo"
          onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))}
        >
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

export default UpdateTodoForm;
