import { createBirthYear, createEmail, createPassword, 
  createUsername, createCpf, UserInputError 
} from "../types/User";

test('Criar o nome de um usuário', () => {
  expect(createUsername("asd")).toEqual({ok: true, value: "asd"});
  expect(createUsername("as\nd")).toEqual({ok: false, error: UserInputError.InvalidChars});  
  expect(createUsername("   \t")).toEqual({ok: false, error: UserInputError.Empty});
  expect(createUsername("0123456789ABCDEF")).toEqual({ok: false, error: UserInputError.Maxlen});
})

test('Criar uma data de nascimeto', () => {
  // O formato de date funciona com até 31, 
  // a unica coisa que ocorre é que ele considera os
  // dias a mais como próximo mês
  for (let d = 1; d <= 31; d++) {
    for (let m = 1; m <= 12; m++) {
      for (let a = 1930; a < 2100; a++) {
        expect(createBirthYear(`${d}/${m}/${a}`)).toEqual({ok: true, value: new Date(`${a}-${m}-${d}`)})
      }
    }
  }
  expect(createBirthYear("32/02/2005")).toEqual({ok: false, error: UserInputError.InvalidInput});
  expect(createBirthYear("  \t")).toEqual({ok: false, error: UserInputError.Empty});
})

test('Criar uma senha de usuário', () => {
  expect(createPassword("12345678")).toEqual({ok: true, value: "12345678"});
  expect(createPassword("1234567")).toEqual({ok: false, error: UserInputError.Minlen});
  expect(createPassword("12345678\0asd\x0412")).toEqual({ok: false, error: UserInputError.InvalidChars});
  expect(createPassword("12345678123456781234567812345678123456781234567812345678123456781"))
    .toEqual({ok: false, error: UserInputError.Maxlen});
  expect(createPassword("12345 679    ")).toEqual({ok: false, error: UserInputError.TrailingSpace});
})

test('Criar um email de usuario', () => {
  expect(createEmail("a@g.c")).toEqual({ok: true, value: "a@g.c"});
  expect(createEmail("   \t asd")).toEqual({ok: false, error: UserInputError.Empty});
  expect(createEmail("asd\0\x01ad@g.c")).toEqual({ok: false, error: UserInputError.InvalidChars});
  expect(createEmail("ag.c")).toEqual({ok: false, error: UserInputError.InvalidInput});
  expect(createEmail("a@gc")).toEqual({ok: false, error: UserInputError.InvalidInput});
})

test('Criar um cpf', () => {
  expect(createCpf("278.971.560-28")).toEqual({ok: true, value: "27897156028"});
  expect(createCpf("2")).toEqual({ok: false, error: UserInputError.Minlen});
  expect(createCpf("278.971.560-282")).toEqual({ok: false, error: UserInputError.Maxlen});
  expect(createCpf("27a.971.560-28")).toEqual({ok: false, error: UserInputError.InvalidInput});
  expect(createCpf("271.971.560-28")).toEqual({ok: false, error: UserInputError.InvalidInput});
})

