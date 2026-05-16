import { Tabs } from "expo-router";

export default function HomeLayout() {
  return (
    <Tabs>
      <Tabs.Screen name='tarefas' />
      <Tabs.Screen name='perfil' />
    </Tabs>
  )
}