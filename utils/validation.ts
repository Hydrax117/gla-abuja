/**
 * Simple validation helpers.
 * These are intentionally framework-agnostic so they can be reused
 * across form libraries (React Hook Form, etc.) as needed.
 */

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isValidEmail(email: string): boolean {
  // RFC 5322-compatible email regex (simplified)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  // Nigerian phone: +234XXXXXXXXXX or 0XXXXXXXXXX (10-11 digits)
  return /^(\+234|0)[789]\d{9}$/.test(phone.replace(/\s/g, ''));
}

export function isStrongPassword(password: string): boolean {
  // Min 8 chars, at least one uppercase, one lowercase, one digit
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

// ---------------------------------------------------------------------------
// Field validators (return error string or undefined)
// ---------------------------------------------------------------------------

export type FieldValidator<T = string> = (value: T) => string | undefined;

export const required: FieldValidator = (value) =>
  isNonEmptyString(value) ? undefined : 'This field is required';

export const emailValidator: FieldValidator = (value) => {
  if (!isNonEmptyString(value)) return 'Email is required';
  if (!isValidEmail(value)) return 'Enter a valid email address';
  return undefined;
};

export const passwordValidator: FieldValidator = (value) => {
  if (!isNonEmptyString(value)) return 'Password is required';
  if (value.length < 8) return 'Password must be at least 8 characters';
  if (!isStrongPassword(value))
    return 'Password must include uppercase, lowercase, and a number';
  return undefined;
};

export const phoneValidator: FieldValidator = (value) => {
  if (!value) return undefined; // phone is optional
  if (!isValidPhone(value)) return 'Enter a valid Nigerian phone number';
  return undefined;
};

// ---------------------------------------------------------------------------
// Sanitization
// ---------------------------------------------------------------------------

export function sanitizeInput(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}
