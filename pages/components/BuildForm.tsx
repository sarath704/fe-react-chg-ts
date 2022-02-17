import React from 'react';
import { LenderFields } from 'lib/types';
import useForm, { Form } from 'pages/hooks/useForm';
import FormControls from './formControls/FormControls';
import { CHECK_BOX, SELECT, TEXT } from 'pages/constants/constants';

interface BuildFormProps {
  formElements: LenderFields[];
  formInitialValues: any;
  submitForm: (props: any) => void;
}

const BuildFormComponent = ({
  formInitialValues,
  formElements,
  submitForm,
}: BuildFormProps) => {
  const requiredFields = formElements.filter((item) => item.required);

  const validate = (fieldValues = values) => {
    let _tempErrors = { ...error };
    for (const filedName in fieldValues) {
      requiredFields.forEach(({ name, label }) => {
        if (filedName === name) {
          _tempErrors[name] = fieldValues[name] ? '' : `${label} is Required`;
        }
      });
    }
    setError({
      ..._tempErrors,
    });
    if (fieldValues === values)
      return Object.values(_tempErrors).every((x) => x == '');
    return false;
  };

  const { values, handleInputChange, resetForm, error, setError } = useForm(
    formInitialValues,
    true,
    validate,
  );

  const handleSubmit = (e: any) => {
    // e.preventDefault();
    if (validate()) {
      submitForm(values);
    }
  };

  return (
    <Form>
      {formElements.map(
        (
          { label, type, required, name, options }: LenderFields,
          index: number,
        ) => {
          switch (type) {
            case TEXT:
              return (
                <FormControls.TextInput
                  key={index}
                  name={name}
                  required={required}
                  value={values[name]}
                  onChange={handleInputChange}
                  label={label as string}
                  error={error[name]}
                />
              );
            case SELECT:
              return (
                <FormControls.Select
                  key={index}
                  name={name}
                  value={values[name]}
                  required={required}
                  onChange={handleInputChange}
                  label={label as string}
                  options={options}
                  error={error[name]}
                />
              );
            case CHECK_BOX:
              return (
                <FormControls.Checkbox
                  key={index}
                  label={label as string}
                  name={name}
                  required={required}
                  value={values[name]}
                  error={error[name]}
                  onChange={handleInputChange}
                />
              );
          }
        },
      )}
      <div>
        <FormControls.Button
          id="submitform"
          text="Submit"
          type="button"
          onClick={handleSubmit}
        />
        <FormControls.Button text="Reset" color="default" onClick={resetForm} />
      </div>
    </Form>
  );
};
export default React.memo(BuildFormComponent);
