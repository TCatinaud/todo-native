import { TodoListItem } from "@/components/TodoListItem";
import { ItemListProps } from "@/pages/home/HomePage";
import { Divider, List } from "@ui-kitten/components";

type TodoListProps = {
  items: ItemListProps[];
  deleteItem: (label: string) => void;
  toggleItem: (label: string) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  items,
  deleteItem,
  toggleItem,
}) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: ItemListProps;
    index: number;
  }) => (
    <TodoListItem
      label={item.label}
      isChecked={item.isChecked}
      deleteItem={deleteItem}
      toggleItem={toggleItem}
    />
  );

  return (
    <List
      data={items}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
    />
  );
};
