import React from "react";
import { useForm } from "react-hook-form";
import createArrayWithNumbers from "../../utils/createArrayWithNumbers";

export default function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h1>React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {createArrayWithNumbers(1000).map((key) => {
          const name = `email${key}`;
          return (
            <span key={key}>
              <input
                {...register(name, {
                  required: "This is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email",
                  },
                })}
              />
              {errors[name] && <div>{errors[name].message}</div>}
            </span>
          );
        })}

        <input
          {...register("username", {
            validate: (value) => (value === "admin" ? true : "Nice try!"),
          })}
        />
        {errors.username && <div>{errors.username.message}</div>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
