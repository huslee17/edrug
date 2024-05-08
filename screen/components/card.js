import * as React from "react";
import { Card, Text } from "react-native-paper";

const CardComponent = ({ data, url }) => (
  <>
    {data?.map((item, index) => (
      <Card key={index}>
        <Card.Content>
          <Text variant="titleLarge">{item.medical_post}</Text>
        </Card.Content>
        <Card.Cover source={{ uri: url[index] }} />
      </Card>
    ))}
  </>
);
export default CardComponent;
