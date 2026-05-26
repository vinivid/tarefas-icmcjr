import { type Result } from "@/src/types/Result";

// Erros relativos a criação de váriaves de usuário
export const UserInputError = {
  Minlen: "MINLEN",
  Maxlen: "MAXLEN",
  Empty: "EMPTY",
  InvalidChars: "INVALID_CHARS",
  TrailingSpace: "TRAILING_SPACE",
  InvalidInput: "INVALID_INPUT"
}

export type UserInputError = 
  typeof UserInputError[keyof typeof UserInputError];

/// Nome de usuário

/**
 * Um Username é uma string com tamanho máximo 
 * de 15 caracteres. Esta string não pode ser vázia
 * assim como não pode ter certos caracteres.
 * 
 * Todo Username deve ser criado pela função
 * createUsername.
 */
export type Username = string;

/**
 * Cria um Username caso a string passada 
 * seja um username valido.
 * 
 * @param name string da qual deseja-se criar um 
 * username.
 * 
 * @returns um Username caso a string passada cumpra 
 * todas as invariantes.
 */
export function createUsername(name : string) : Result<Username, UserInputError> {
  if (name.trim() === '')
    return { ok: false, error : UserInputError.Empty };

  // Este regex verifica se o nome do usuário contem caracteres de URL,
  // caracteres de controle (\x7F) e espaços no inicio e no fim do nome do usuário
  const regex = /^\s+|[\x00-\x1F\x7F.$%?!#@]|\s+$/;
  if (regex.test(name))
    return { ok: false, error : UserInputError.InvalidChars };

  if (name.length > 100)
    return { ok: false, error : UserInputError.Maxlen };

  return { ok: true, value: name };
}

/// Ano de nascimento

/**
 * Este é um tipo que representa o ano de
 * nascimento do usuário, garantindo sempre
 * uma data válida.
 */
export type BirthDate = Date;

/**
 * Cria um BirthDate a partir de uma string.
 * 
 * @param date string da qual deseja-se criar um
 * birth year. Ela deve estar no formato 
 * dd/mm/aa ou no formato ISO 8601 
 * @returns um BirthYear valido
 */
export function createBirthYear(date : string) : Result<BirthDate, UserInputError> {
  console.log(date);

  if (/\s+/.test(date) || date === '') 
    return { ok: false, error : UserInputError.Empty };

  let dat;
  if (date.search('/') === -1) 
    dat = new Date(date);
  else {
    const [d, m, y] = date.split('/');    
    dat = new Date(`${y}-${m}-${d}`);
  }

  if (isNaN(dat.getTime()))
    return { ok: false, error : UserInputError.InvalidInput }

  return { ok: true, value: dat };
}
/// Senha do usuário

/**
 * Um Password é uma string que cumpre algumas
 * invariantes. Estas invariantes são:
 * Tamanho mínimo de carecterss de 8.
 * Tamanho máximo de caracteres de 64.
 * Não possui caracteres de controle.
 * Não possui espaços ao final.
 */
export type Password = string;

/**
 * Cria um Password a partir de uma string.
 * 
 * @param pass string da qual deseja-se criar
 * um Password
 * 
 * @returns um Password caso a string cumpra todas
 * as invariantes necessárias. 
 */
export function createPassword(pass : string) : Result<Password, UserInputError> {
  if (pass.length < 8)
    return { ok: false, error : UserInputError.Minlen };

  // Senha vazia ou somente espaços
  if (/\s+/.test(pass) || pass === '')
    return { ok: false, error : UserInputError.Empty };

  // Caracteres de controle
  if (/[\x00-\x1F\x7F]/.test(pass))
    return { ok: false, error : UserInputError.InvalidChars };

  if (pass.length > 64)
    return { ok: false, error : UserInputError.Maxlen };

  // Espaços no final
  // No android ele costuma ja remover os espaços
  if (/\s+$/.test(pass))
    return { ok: false, error : UserInputError.TrailingSpace };

  return { ok: true, value: pass };
}

/// Email 

/**
 * Um Email é uma string na qual foi verificada
 * os padrões minímos para que possivelmente
 * seja um email valido.
 */
export type Email = string;

export function createEmail(email : string) : Result<Email, UserInputError> {
  if (/\s+/.test(email) || email === '')
    return { ok: false, error : UserInputError.Empty };

  email = email.trim();

  if (email.length > 256)
    return { ok: false, error: UserInputError.Maxlen };

  // Caracteres de controle
  if (/[\x00-\x1F\x7F]/.test(email))
    return { ok: false, error: UserInputError.InvalidChars };

  // Esse regex verifica que tem somente 1 @
  // que os dois lados relativos ao @ não são vazios
  // e de que tem pelo menos 1 . na parte do dominio
  if ( !(/[^\s@]+@[^\s@]+\.[^\s@]+/.test(email)) ) 
    return { ok: false, error: UserInputError.InvalidInput };

  return { ok: true, value: email };
}

/**
 * Um CPF é uma string que cumpre as 
 * invariantes de um CPF.
 */
export type Cpf = string;

/**
 * Cria um cpf garantido as invariantes do CPF.
 * OBS: A string de cpf não pode ter nem o . e nem
 * o - 
 * 
 * @param cpf string da qual deseja-se criar um CPF.
 * 
 * @return um CPF válido caso a string seja um CPF
 * válido.
 */
export function createCpf(cpf : string) : Result<Cpf, UserInputError> {
  cpf = cpf.replace('\b', '');

  if (cpf.search(/[\.-]/))
    cpf = cpf.split(/[\.-]/).join('')

  if (cpf.length > 11) 
    return { ok: false, error: UserInputError.Maxlen };

  if (cpf.length < 11)
    return { ok: false, error: UserInputError.Minlen };

  // Testa se é apenas números
  if (/[^0-9]/.test(cpf))
    return { ok: false, error: UserInputError.InvalidInput };

  // Fazendo a verificação do cpf
  const nums = [...cpf].map(v => parseInt(v));

  let firstSum = 0;
  const multiples = [11,10,9,8,7,6,5,4,3,2]
  for (let i = 0; i < 9; i++) 
    firstSum += nums[i] * multiples[i + 1];
  
  let firstVerifier = -1;
  const r = firstSum % 11;
  if (r < 2) {
    firstVerifier = 0;
  } else {
    firstVerifier = 11 - r;
  }

  if (nums[9] != firstVerifier)
    return { ok: false, error: UserInputError.InvalidInput };

  let secondSum = 0;
  for (let i = 0; i < 9; i++)
    secondSum += nums[i] * multiples[i];

  secondSum += firstVerifier * 2;

  let secondVerifier = -1;
  const rr = secondSum % 11;
  if (rr < 2) {
    secondVerifier = 0;
  } else {
    secondVerifier = 11 - rr;
  }

  if (nums[10] != secondVerifier)
    return { ok: false, error: UserInputError.InvalidInput };

  return { ok: true, value: cpf };
}