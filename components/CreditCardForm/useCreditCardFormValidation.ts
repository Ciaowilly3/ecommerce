import { useCallback } from 'react';
import { ZodError } from 'zod';
import { CardSchema, cardSchemaKeys } from './models/schema';
import { ICreditCard } from '../../Interfaces/IUser';

export const useCreditCardFormValidation = (
  setErrors: React.Dispatch<
    React.SetStateAction<{ [key in cardSchemaKeys]: string }>
  >,
  checkIfSubmitReady: (updatedErrors: {
    [key in cardSchemaKeys]: string;
  }) => void
) => {
  const handleSetErrors = useCallback(
    (
      prevErrors: { [key in cardSchemaKeys]: string },
      field: cardSchemaKeys,
      value: string | undefined
    ) => {
      const updatedErrors = { ...prevErrors, [field]: value };
      checkIfSubmitReady(updatedErrors);
      return updatedErrors;
    },
    [checkIfSubmitReady]
  );
  const validate = useCallback(
    (field: cardSchemaKeys, updatedCard: ICreditCard) => {
      try {
        CardSchema.parse(updatedCard);
        setErrors((prevErrors) =>
          handleSetErrors(prevErrors, field, undefined)
        );
      } catch (error) {
        const myError = error as ZodError;
        const message = myError.errors
          .filter((error) => error.path[0] === field)
          .map((error) => error.message);
        setErrors((prevErrors) =>
          handleSetErrors(prevErrors, field, message[0])
        );
      }
    },
    [setErrors, handleSetErrors]
  );

  return { validate };
};
