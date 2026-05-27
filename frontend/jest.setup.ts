jest.mock("@expo/vector-icons", () => {
  return {
    MaterialCommunityIcons: "MaterialCommunityIcons",
    MaterialIcons: 'MaterialIcons',
  };
});

jest.mock("expo-font");