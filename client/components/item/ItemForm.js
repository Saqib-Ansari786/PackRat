import { Box, Input, Button, Text, VStack, Radio } from "native-base";
import { DropdownComponent } from "../Dropdown";
import { theme } from "../../theme";
import { ItemCategoryEnum } from "../../constants/itemCategory";

const data = ["lbs", "oz", "kg", "g"];

export const ItemForm = ({
  name,
  setName,
  weight,
  setWeight,
  quantity,
  setQuantity,
  unit,
  setUnit,
  categoryType,
  setCategoryType,
  handleSubmit,
  showSubmitButton = true,
  isLoading,
  isEdit,
}) => {
  return (
    <Box>
      <VStack space={2}>
        <Input
          size="lg"
          value={name}
          variant="outline"
          placeholder="Item Name"
          onChangeText={(text) => setName(text)}
          width="100%"
        />
        <Box
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Input
            size="lg"
            value={weight}
            variant="outline"
            placeholder="Weight"
            onChangeText={(text) => setWeight(text)}
            flex={1}
          />
          {data && (
            <DropdownComponent
              data={data}
              value={unit}
              onValueChange={setUnit}
              placeholder={"Unit"}
              width="100"
            />
          )}
        </Box>

        <Input
          size="lg"
          value={quantity}
          variant="outline"
          placeholder="Quantity"
          onChangeText={(text) => setQuantity(text)}
          width="100%"
          type="text"
        />
        <Radio.Group
          value={categoryType}
          name="category"
          accessibilityLabel="category for the type of item"
          onChange={(nextVal) => setCategoryType(nextVal)}
        >
          {Object.values(ItemCategoryEnum).map((value, key) => {
            return (
              <Radio key={key} value={value} mx="2">
                {value}
              </Radio>
            );
          })}
        </Radio.Group>
        {showSubmitButton && (
          <Button onPress={handleSubmit}>
            <Text style={{ color: theme.colors.text }}>
              {isLoading
                ? "Loading.."
                : isEdit == true
                ? "Edit item"
                : "Add Item"}
            </Text>
          </Button>
        )}
      </VStack>
    </Box>
  );
};
