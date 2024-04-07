import { useFormik, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";
import { Input } from "../input";
import { FormType } from "../../../enums";
import { MyDatePicker } from "../date-picker";
import { Button } from "../button";

interface Props {
  initialValues: FormikValues;
  validationSchema?: Yup.Schema;
  fn: (values: FormikValues) => void;
  formType: FormType;
}

export const Form = ({ initialValues, fn, validationSchema, formType,  }: Props) => {
  const handleOnSubmit = (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    fn({ ...values});
    if (formType !== FormType.Update) actions.resetForm();
  };
  const formik = useFormik<FormikValues>({
    initialValues,
    onSubmit: handleOnSubmit,
    validationSchema: validationSchema || Yup.object({})
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-shrink flex-grow basis-4/6 flex-col gap-rg text-black"
    >
      {(formType === FormType.Create || formType === FormType.Update) && (
        <>
          <Input
            name="title"
            type="text"
            className="border-2 border-solid border-black rounded-lg"
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder="Title"
            touched={formik.touched.title}
            error={formik.errors.title}
          />
          <Input
            name="description"
            type="text"
            className="border-2 border-solid border-black rounded-lg"
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Description"
            touched={formik.touched.description}
            error={formik.errors.description}
          />
          <Input
            name="priority"
            type="text"
            className="border-2 border-solid border-black rounded-lg"
            value={formik.values.priority}
            onChange={formik.handleChange}
            placeholder="Priority"
            touched={formik.touched.priority}
            error={formik.errors.priority}
          />
          <MyDatePicker
            dueDate={formik.values.dueDate}
            onUpdateDueDate={(date: Date) =>
              formik.setFieldValue("dueDate", date)
            }
          />
        </>
      )}
      <Button type="submit" className="uppercase text-white bg-black">
        save
      </Button>
      <Button
        type="reset"
        className="uppercase text-white bg-black"
        onClick={() => formik.resetForm()}
      >
        clear
      </Button>
    </form>
  );
}