"use client";
import { Form } from "antd";
import { useState } from "react";

export type FormOrderFilds = {};

export function useFormOrder(formInitialData?: FormOrderFilds) {
  return useState<FormOrderFilds>(formInitialData ?? {});
}

export type DataElementFormOrder = {
  form: FormOrderFilds;
  setForm: (form: FormOrderFilds) => void;
  onSubmit: (form: FormOrderFilds) => void;
};

export default function ElementFormOrder({
  form,
  onSubmit,
  setForm,
}: DataElementFormOrder) {
  return <Form></Form>;
}
