import { TodoList } from "@/components/TodoList";
import { TopBar } from "@/components/TopBar";
import {
  gql,
  useQuery
} from "@apollo/client";
import {
  Layout,
  Text,
} from "@ui-kitten/components";
import { useState } from "react";


const getItemsQuery = gql`
  query {
    items {
      id
      label
      isChecked
    }
  }
`;

export type ItemListProps = {
  label: string;
  isChecked: boolean;
};

export const HomePage: React.FC = () => {
  const { data: dataItems, loading: loadingItems } = useQuery(getItemsQuery);
  const [items, setItems] = useState<ItemListProps[]>(dataItems);

  const deleteItem = (label: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.label !== label));
  };

  const toggleItem = (label: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.label === label ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  if (loadingItems) return <Text>Loading items...</Text>;

  return (
    <Layout style={{ flex: 1 }}>
      <TopBar items={items} setItems={setItems} />
      <TodoList
        items={items}
        deleteItem={deleteItem}
        toggleItem={toggleItem}
      />
    </Layout>
  );
}
