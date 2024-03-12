export function formValidator(
  firstName: string,
  lastName: string,
  age: number
) {
  const errors: string[] = [];

  if (!firstName || firstName.length < 1) {
    errors.push('First name is required');
  }

  if (firstName.length < 2) {
    errors.push('First name must be longer than one character');
  }

  if (!lastName) {
    errors.push('Last name is required');
  }

  if (lastName.length < 2) {
    errors.push('Last name must be longer than one character');
  }

  if (typeof age !== 'number') {
    throw new Error('Age must be a number');
  }

  if (age < 0) {
    errors.push('Age must be a positive number');
  }

  return errors;
}
