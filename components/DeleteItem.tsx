import { Button } from "@ui-kitten/components";

type DeleteItemProps = {
  deleteItem: () => void;
};

export const DeleteItem: React.FC<DeleteItemProps> = ({ deleteItem }) => {
  return (
    <Button onPress={deleteItem} size="tiny">
      Delete
    </Button>
  );
};

