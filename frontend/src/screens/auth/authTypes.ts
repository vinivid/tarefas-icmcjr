/// Nome de usuário

export type Username = string;

export const UsernameError = {
  Maxlen: "MAXLEN",
  Empty: "EMPTY",
  InvalidChars: "INVALID_CHARS"
}

export type UsernameError = 
  typeof UsernameError[keyof typeof UsernameError];

export function createUsername(name : string) : Username | UsernameError {
  if (/^\s*$/.test(name)) 
    return UsernameError.Empty;

  if (!(/^[a-zA-Z0-9_]+$/.test(name)))
    return UsernameError.InvalidChars;

  if (name.length > 15)
    return UsernameError.Maxlen;

  return name;
}

/// Senha do usuário

export type Password = string;
export const PasswordError = {
  Minlen: "MINLEN",
  Maxlen: "MAXLEN",
  Empty: "EMPTY",
  InvalidChars: "INVALID_CHARS",
  TrailingSpace: "TRAILING_SPACE"
}
export type PasswordError = 
  typeof PasswordError[keyof typeof PasswordError];

export function cereatePassword(pass : string) : Password | PasswordError {
  if (pass.length < 8)
    return PasswordError.Minlen;

  if (/^\s*$/.test(pass))
    return PasswordError.Empty;

  if (!(/^[^\x00-\x1F\x7F]$/.test(pass)))
    return PasswordError.InvalidChars;

  if (pass.length > 64)
    return PasswordError.Maxlen;

  if (/\s+$/.test(pass))
    return PasswordError.TrailingSpace;

  return pass;
}