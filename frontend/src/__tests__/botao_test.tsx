import { render, fireEvent } from "@testing-library/react-native";

import Botao from "../components/Botao";

test("Testar botão", () => {
  const onPress = jest.fn();

  const { getByText } = render(
    <Botao
      conteudo="P"
      onPress={onPress}
    />
  )

  fireEvent.press(getByText("P"));
  expect(onPress).toHaveBeenCalled();
});