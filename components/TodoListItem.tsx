import { DeleteItem } from "@/components/DeleteItem";
import { CheckBox, ListItem } from "@ui-kitten/components";

type TodoListItemProps = {
  label: string;
  isChecked: boolean;
  deleteItem: (label: string) => void;
  toggleItem: (label: string) => void;
};

export const TodoListItem: React.FC<TodoListItemProps> = ({ label, isChecked, deleteItem, toggleItem }) => {
  const onDelete = () => {
    deleteItem(label);
  };

  return (
    <ListItem
      title={label}
      style={{
        ...(isChecked ? { opacity: 0.5 } : {}),
      }}
      onPress={() => toggleItem(label)}
      accessoryLeft={
        <CheckBox
          checked={isChecked}
          aria-label="Valid item"
          onChange={() => toggleItem(label)}
        />
      }
      accessoryRight={<DeleteItem deleteItem={onDelete} />}
    />
  );
};

