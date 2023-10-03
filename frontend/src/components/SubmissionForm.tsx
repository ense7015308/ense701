import React from "react";
import { useForm } from "react-hook-form";

export default function SubmissionForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => JSON.stringify(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="Title" />
      <p>
        <input {...register("authors")} placeholder="Authors" />
      </p>
      <p>
        <input {...register("journname")} placeholder="Journal Name" />
      </p>
      <p>
        <input {...register("pubyear")} placeholder="Publication Year" />
      </p>
      <p>
        <input {...register("volume")} placeholder="Volume" />
      </p>
      <p>
        <input {...register("num")} placeholder="Number" />
      </p>
      <p>
        <input {...register("pages")} placeholder="Pages" />
      </p>
      <p>
        <input {...register("doi")} placeholder="DOI" />
      </p>
      <input type="submit" />
    </form>
  );
}
