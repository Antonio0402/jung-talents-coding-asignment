import { ChangeEvent } from "react";
import { create } from "zustand";

const useForm = create<{
  formData: FormItems;
  actions: {
    setFormItems: (fieldToUpdate: Partial<FormItems>) => void;
  }
}>((set, get) => ({
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    countryCode: "",
    postCode: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    payment: "pay-in-3"
  } as FormItems,

  actions: {
    setFormItems(fieldToUpdate: Partial<FormItems>) {
      set({
        formData: { ...get().formData, ...fieldToUpdate },
      });
    },
  }
}));

export const useFormData = () => useForm((state) => state.formData);
export const useFormActions = () => useForm((state) => state.actions);

export const getRequiredInput = (fields: FormItems) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    email,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    streetAddress2,
    ...requiredInput
  } = fields;

  return requiredInput;
}

function isInputElement(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): e is ChangeEvent<HTMLInputElement> {
  return (e as ChangeEvent<HTMLInputElement>).target.checked
}

export const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>, setFields: (fieldToUpdate: Partial<FormItems>) => void) => {
  const { type, name, value } = e.target;
  if (isInputElement(e)) {
    setFields({ [name]: type === "checkbox" ? e.target.checked : value })
  } else {
    setFields({ [name]: value })
  }
}