import { describe, expect, test } from 'vitest';
import { formValidator } from './validator';

describe('Form validation', () => {
  test('should return an error if first name is missing', () => {
    const errors = formValidator('', 'Doe', 30);
    expect(errors).toContain('First name is required');
  });

  test('should return an error if last name is missing', () => {
    const errors = formValidator('John', '', 30);
    expect(errors).toContain('Last name is required');
  });

  test('should return an error if age is negative', () => {
    const errors = formValidator('John', 'Doe', -1);
    expect(errors).toContain('Age must be a positive number');
  });

  test('should return error if first name is too short', () => {
    const errors = formValidator('W', 'Doe', 44);
    console.log({ errors });
    expect(errors).toContain('First name must be longer than one character');
  });

  test('should return error if last name is too short', () => {
    const errors = formValidator('John', 'D', 44);
    expect(errors).toContain('Last name must be longer than one character');
  });

  test('should return error if ages is not number', () => {
    // @ts-ignore
    expect(() => formValidator('John', 'D', 'rr')).toThrowError('Age must be a number');
  });

  test('validates correct data successfully', () => {
    const errors = formValidator('John', 'Doe', 30);
    expect(errors).toHaveLength(0);
  });
});