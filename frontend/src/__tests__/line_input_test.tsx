import { render, fireEvent } from "@testing-library/react-native";

import LineInput from "../components/LineInput";
import MaskedLineInput from "../components/MaskedLineInput";

test("Line input normal", () => {
  const onChangeText = jest.fn();
  const onClose = jest.fn();
  
  const { getByText, getByDisplayValue, getByPlaceholderText } = render(
    <LineInput
      label="OK"
      value="A"
      error={true}
      errorValue="Err"
      placeholder="Tst"
      onClosePress={onClose}
      onChangeText={onChangeText}
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
  const onClose = jest.fn();
  
  const { getByText, getByDisplayValue, getByPlaceholderText } = render(
    <MaskedLineInput
      label="OK"
      value="A"
      error={true}
      errorValue="Err"
      placeholder="Tst"
      onClosePress={onClose}
      onChangeText={onChangeText}
      mask={[/\w/, '.', /\w/]}
    />
  );

  fireEvent.changeText(getByPlaceholderText("Tst"), "oi");
  expect(onChangeText).toHaveBeenCalledWith("o.i", "oi", "o.i");

  expect(getByText("Err")).toBeTruthy();
  expect(getByText("OK")).toBeTruthy();
  expect(getByDisplayValue("A")).toBeTruthy();
})
