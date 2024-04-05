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
  const validate = useCallback(
    (field: cardSchemaKeys, updatedCard: ICreditCard) => {
      try {
        CardSchema.parse(updatedCard);
        setErrors((prevErrors) => {
          const updatedErrors = { ...prevErrors, [field]: undefined };
          checkIfSubmitReady(updatedErrors);
          return updatedErrors;
        });
      } catch (error) {
        const myError = error as ZodError;
        const message = myError.errors
          .filter((error) => error.path[0] === field)
          .map((error) => error.message);
        setErrors((prevErrors) => {
          const updatedErrors = { ...prevErrors, [field]: message[0] };
          checkIfSubmitReady(updatedErrors);
          return updatedErrors;
        });
      }
    },
    [setErrors, checkIfSubmitReady]
  );

  return { validate };
};
