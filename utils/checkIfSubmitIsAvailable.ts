export const checkIfSubmitIsAvailable = (
  errors: Record<string, string>
): boolean => {
  for (const key in errors) {
    if (errors[key] !== undefined) {
      return false;
    }
  }
  return true;
};
