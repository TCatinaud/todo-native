import { Button, Card, Input, Layout, Modal, Text } from "@ui-kitten/components";
import { useState } from "react";

type TopBarProps = {
  addItem: (label: string) => void;
};

export const TopBar: React.FC<TopBarProps> = ({addItem}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleChangeValue = (nextValue: string) => {
    setValue(nextValue);
  };

  const addNewItem = () => {
    if (value.trim() !== "") {
      addItem(value);
      setValue("");
      toggleVisibility();
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
      <Button onPress={toggleVisibility}>Add</Button>

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
