import {
  ActivityIndicator,
  Snackbar,
  Text,
  Portal,
  List,
} from "react-native-paper";
import { View } from "react-native";
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_TOP_DRIPS = gql`
  query GetTopDrips {
    getMyTopDrips {
      id
      question {
        text
        emoji
      }
    }
  }
`;

const TopDrips = () => {
  const [errorVisible, setErrorVisible] = useState(false);
  const { loading, data } = useQuery(GET_TOP_DRIPS, {
    onError: (error) => {
      console.log(error);
      setErrorVisible(true);
    },
  });

  console.log(data);

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text variant="headlineSmall">Top Drips</Text>
      {loading && <ActivityIndicator animating={true} />}
      {!loading && data && data.getMyTopDrips.length === 0 && (
        <Text
          style={{
            paddingVertical: 12,
          }}
        >
          No top drips as of yet
        </Text>
      )}
      {!loading && data && data.getMyTopDrips.length > 0 && (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          {data.getMyTopDrips.map((drip: any) => (
            <List.Item
              title={drip.question.text}
              titleNumberOfLines={2}
              left={() => (
                <Text style={{ fontSize: 28 }}>{drip.question.emoji}</Text>
              )}
            />
          ))}
        </View>
      )}
      <Portal>
        <Snackbar
          visible={errorVisible}
          onDismiss={() => {
            setErrorVisible(false);
          }}
          action={{
            label: "Close",
          }}
        >
          Error fetching top drips
        </Snackbar>
      </Portal>
    </View>
  );
};

export default TopDrips;
