import { COLORS } from "@/constants/theme";
import { Text, View } from "react-native";

const NoPostsFound = () => (
    <View style={{
       flex:1,
       backgroundColor: COLORS.background,
       justifyContent: "center",
       alignItems: "center",
    }}>
      <Text style={{ fontSize:20, color: COLORS.primary }}>No posts yet</Text>
    </View>
)

export default NoPostsFound;