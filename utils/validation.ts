/**
 * Validates an email address string
 * @param email - The email address to validate
 * @returns boolean - True if email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  // Check if email is empty or not a string
  if (!email || typeof email !== "string") {
    return false;
  }

  // Remove leading/trailing whitespace
  email = email.trim();

  // Basic email regex pattern
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check against regex pattern
  if (!emailRegex.test(email)) {
    return false;
  }

  // Additional checks
  const [localPart, domain] = email.split("@");

  // Check length constraints
  if (
    email.length > 254 || // Total length
    localPart.length > 64 || // Local part length
    domain.length > 255 // Domain length
  ) {
    return false;
  }

  return true;
};
