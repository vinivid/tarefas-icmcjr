import { render, fireEvent } from "@testing-library/react-native";

import UserFieldInput from "../components/auth/UserFieldInput";
import MaskedUserFieldInput from "../components/auth/MaskedUserFieldInput";
import { createEmail } from "../types/User";

test("Line field normal", () => {
  const onChangeText = jest.fn();
  const err = createEmail("a.c");
  
  const { getByText, getByDisplayValue, getByPlaceholderText } = render(
    <UserFieldInput
      label="OK"
      fieldStr="A"
      fieldRes={err}
      setFieldStr={onChangeText}
      errorMsg={(a) => `Err`}
      placeholder="Tst"
    />
  );

  fireEvent.changeText(getByPlaceholderText("Tst"), "oi");
  expect(onChangeText).toHaveBeenCalledWith("oi");

  expect(getByText("Err")).toBeTruthy();
  expect(getByText("OK")).toBeTruthy();
  expect(getByDisplayValue("A")).toBeTruthy();
})

test("Masked Line input", () => {
  const onChangeText = jest.fn();
  const err = createEmail("a.c");
  
  const { getByText, getByDisplayValue, getByPlaceholderText } = render(
    <MaskedUserFieldInput
      label="OK"
      fieldStr="A"
      fieldRes={err}
      setFieldStr={onChangeText}
      errorMsg={(a) => `Err`}
      placeholder="Tst"
      mask={[/\w/, '.', /\w/]}
    />
  );

  fireEvent.changeText(getByPlaceholderText("Tst"), "oi");
  expect(onChangeText).toHaveBeenCalledWith("o.i", "oi", "o.i");

  expect(getByText("Err")).toBeTruthy();
  expect(getByText("OK")).toBeTruthy();
  expect(getByDisplayValue("A")).toBeTruthy();
})