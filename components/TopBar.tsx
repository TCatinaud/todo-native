import { ItemListProps } from "@/pages/home/HomePage";
import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Card,
  Input,
  Layout,
  Modal,
  Text,
} from "@ui-kitten/components";
import { useState } from "react";
import Toast from "react-native-toast-message";

type TopBarProps = {
  items: ItemListProps[];
  setItems: React.Dispatch<React.SetStateAction<ItemListProps[]>>;
};

const saveItemsMutation = gql`
  mutation SaveItems($items: [ItemInput!]!) {
    saveItems(items: $items) {
      id
      label
      isChecked
    }
  }
`;

export const TopBar: React.FC<TopBarProps> = ({ items, setItems }) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");

  const [saveItems] = useMutation(saveItemsMutation);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleChangeValue = (nextValue: string) => {
    setValue(nextValue);
  };

  const addNewItem = () => {
    if (value.trim() !== "") {
      setItems((prevItems) => [
        ...(prevItems ?? []),
        {
          label: value.trim(),
          isChecked: false,
        },
      ]);
      setValue("");
      toggleVisibility();
    }
  };

  const handleSave = async () => {
    try {
      const inputItems = items.map(({ label, isChecked }) => ({
        label,
        isChecked,
      }));

      const result = await saveItems({
        variables: { items: inputItems },
      });

      console.log("result", result);
      setItems(result.data.saveItems);

      Toast.show({
        type: "success",
        text1: "Items saved successfully",
      });
      console.log("Saved items:", result.data.saveItems);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Ooops, something went wrong",
        text2: err instanceof Error ? err.message : "Unknown error",
      });
    }
  };

  return (
    <Layout
      style={{
        margin: 16,
        gap: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text category="h1">My Todo List</Text>
      <Layout style={{ flexDirection: "row", gap: 8 }}>
        <Button onPress={toggleVisibility}>Add</Button>
        <Button onPress={handleSave} status="success">
          Save
        </Button>
      </Layout>

      <Modal
        visible={visible}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onBackdropPress={toggleVisibility}
      >
        <Card disabled={true}>
          <Text category="h2">Add a new item</Text>
          <Input
            label="New Item"
            value={value}
            onChangeText={(nextValue) => handleChangeValue(nextValue)}
            style={{ marginTop: 8, marginBottom: 8 }}
          />
          <Button onPress={addNewItem}>Add a new item</Button>
        </Card>
      </Modal>
    </Layout>
  );
};
