import { render, fireEvent } from "@testing-library/react-native";

import Filtro from "../components/Filtro";

test("Testar filtro", () => {
  const onChange = jest.fn();

  const { getByText } = render(
    <Filtro
      onFiltroChange={onChange}
    />
  );

  fireEvent.press(getByText("Filtro"));

  fireEvent.press(getByText("Todos"));
  expect(onChange).toHaveBeenCalled();

  fireEvent.press(getByText("Atrasado"));
  expect(onChange).toHaveBeenCalled();

  fireEvent.press(getByText("Em andamento"));
  expect(onChange).toHaveBeenCalled();

  fireEvent.press(getByText("Finalizado"));
  expect(onChange).toHaveBeenCalled();
})