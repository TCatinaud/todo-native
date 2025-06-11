import { TodoList } from "@/components/TodoList";
import { TopBar } from "@/components/TopBar";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useState } from "react";

export type ItemListProps = {
  label: string;
  isChecked: boolean;
};

export default function Index() {
  const [items, setItems] = useState<ItemListProps[]>([]);

  const addItem = (label: string) => {
    setItems((prevItems) => [...prevItems, {
      label,
      isChecked: false,
    }]);
  };

  const deleteItem = (label: string) => {
    setItems((prevItems) => prevItems.filter(item => item.label !== label));
  };

  const toggleItem = (label: string) => {
    setItems((prevItems) =>
      prevItems.map(item =>
        item.label === label ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={{ flex: 1 }}>
          <TopBar addItem={addItem} />
          <TodoList
            items={items}
            deleteItem={deleteItem}
            toggleItem={toggleItem}
          />
        </Layout>
      </ApplicationProvider>
    </>
  );
}
