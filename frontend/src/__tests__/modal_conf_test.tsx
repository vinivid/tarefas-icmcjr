import { render, fireEvent } from "@testing-library/react-native";

import ModalConfirmarExclusao from "../components/ModalConfirmarExclusao";

test("Testar modal de exclusão", () => {
  const onCancelar = jest.fn();
  const onConfirmar = jest.fn();

  const { getByText } = render(
    <ModalConfirmarExclusao
      visivel={true}
      onCancelar={onCancelar}
      onConfirmar={onConfirmar}
    />
  );

  fireEvent.press(getByText("Cancelar"));
  expect(onCancelar).toHaveBeenCalled();

  fireEvent.press(getByText("Excluir"));
  expect(onConfirmar).toHaveBeenCalled();
})