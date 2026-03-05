/**
 * Validate an email address.
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate a username (3-20 chars, alphanumeric + underscores).
 */
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

/**
 * Validate a password (minimum 8 characters, at least one digit).
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8 && /\d/.test(password);
};

/**
 * Validate a referral code format.
 */
export const isValidReferralCode = (code: string): boolean => {
  const referralRegex = /^JEG-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return referralRegex.test(code);
};
