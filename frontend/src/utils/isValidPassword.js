function isValidPassword(password) {
  // At least 6 characters, at least one letter, one number, and one special character !@$%
  return (
    typeof password === 'string' &&
    password.length >= 6 &&
    /[a-zA-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@$%]/.test(password)
  );
}

export default isValidPassword;