import { Image, Pressable, Text, TouchableOpacity, View, } from "react-native";
import { Styles } from "../../styles/auth.styles";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={Styles.container} >
      <Link href={"/notifications"}>visit notifications screen</Link>
    </View>
  );
}

