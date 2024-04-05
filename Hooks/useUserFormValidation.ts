import { useCallback } from 'react';
import { ZodError } from 'zod';
import {
  loginSchemaType,
  userSchemaKeys as loginUserSchemaKeys,
} from '../components/LoginForm/schema';
import {
  signinSchemaType,
  userSchemaKeys as signinUserSchemaKeys,
} from '../components/SigninForm/schema';
import { IUser, IUserComplete } from '../Interfaces/IUser';

export const useUserFormValidation = (
  setErrors:
    | React.Dispatch<
        React.SetStateAction<{ [key in loginUserSchemaKeys]: string }>
      >
    | React.Dispatch<
        React.SetStateAction<{ [key in signinUserSchemaKeys]: string }>
      >,
  checkIfSubmitReady:
    | ((updatedErrors: { [key in loginUserSchemaKeys]: string }) => void)
    | ((updatedErrors: { [key in signinUserSchemaKeys]: string }) => void),
  schema: loginSchemaType | signinSchemaType
) => {
  const validate = useCallback(
    (
      field: loginUserSchemaKeys | signinUserSchemaKeys,
      updatedUser: (IUser & { password: string }) | IUserComplete
    ) => {
      try {
        schema.parse(updatedUser);
        setErrors((prevErrors: any) => {
          const updatedErrors = { ...prevErrors, [field]: undefined };
          checkIfSubmitReady(updatedErrors);
          return updatedErrors;
        });
      } catch (error) {
        const myError = error as ZodError;
        const message = myError.errors
          .filter((error) => error.path[0] === field)
          .map((error) => error.message);
        setErrors((prevErrors: any) => {
          const updatedErrors = { ...prevErrors, [field]: message[0] };
          checkIfSubmitReady(updatedErrors);
          return updatedErrors;
        });
      }
    },
    [setErrors, checkIfSubmitReady, schema]
  );

  return { validate };
};
