
"use client";

import { Fragment, useState, type ReactNode } from "react";

type AnimalCadastroFormProps = {
  action: (formData: FormData) => Promise<void>;
  className?: string;
  children: ReactNode;
};

export default function AnimalCadastroForm({
  action,
  className,
  children,
}: AnimalCadastroFormProps) {
  const [formKey, setFormKey] = useState(0);

  return (
    <form
      className={className}
      action={async (formData) => {
        await action(formData);
        setFormKey((atual) => atual + 1);
      }}
    >
      <Fragment key={formKey}>{children}</Fragment>
    </form>
  );
}
