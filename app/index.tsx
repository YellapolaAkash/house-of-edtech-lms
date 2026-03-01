// import { View, Text } from "react-native";

// export default function Index() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>House of Edtech LMS</Text>
//     </View>
//   );
// }

import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/auth/login" />;
}