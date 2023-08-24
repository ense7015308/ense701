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
        <input {...register("source")} placeholder="Source" />
      </p>
      <p>
        <input {...register("pubyear")} placeholder="Publication Year" />
      </p>
      <p>
        <input {...register("doi")} placeholder="DOI" />
      </p>

      <select {...register("claim")}>
        <option value="Code Quality Improvement">Code Quality Improvement</option>
        <option value="Product Quality Improvement">Product Quality Improvement</option>
      </select>

      <select {...register("evidence")}>
        <option value="Strong support">Strong support</option>
        <option value="Weak support">Weak support</option>
      </select>

      <input type="submit" />
      </form>
  );
}
