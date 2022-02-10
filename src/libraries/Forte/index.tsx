import React from "react";
import assert from "assert";
import {
  Form as ForteForm,
  FormList,
  Field,
  S,
  useForte,
  useForteAbsoluteError,
  useForteError,
} from "@fortejs/forte";
import createArrayWithNumbers from "../../utils/createArrayWithNumbers";

const Schema = S.Form({
  emails: S.List(
    {
      email: S.Field({
        defaultValue: "",
        rules: [
          ["string/required", [], { message: "This is required" }],
          [
            "string/pattern",
            [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i],
            { message: "invalid email" },
          ],
        ],
      }),
    },
    {
      defaultValue: createArrayWithNumbers(1000).map(() => ({ email: "" })),
    }
  ),
  username: S.Field({
    defaultValue: "",
    rules: [
      async (value) => {
        assert(value === "admin", "Nice try!");
      },
    ],
  }),
});

const Email = React.memo(() => {
  const error = useForteError("email");
  return (
    <span>
      <Field path="email">
        {(control) => <input {...control} />}
      </Field>
      {error && <div>{error.message}</div>}
    </span>
  );
});

export default function Form() {
  const $forte = useForte(Schema);
  const onSubmit = React.useCallback((values) => {
    console.log(values);
  }, []);
  const userNameError = useForteAbsoluteError($forte, "username");

  return (
    <div>
      <h1>Forte</h1>
      <ForteForm forte={$forte} onSubmit={onSubmit}>
        <FormList path="emails">{({ map }) => map(() => <Email />)}</FormList>
        <Field path="username">
          {(control) => <input {...control} />}
        </Field>
        {userNameError && <div>{userNameError.message}</div>}

        <button type="submit">Submit</button>
      </ForteForm>
    </div>
  );
}
