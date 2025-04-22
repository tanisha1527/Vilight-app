import { FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View, } from "react-native";
import { styles } from "../../styles/feed.styles";
import { Link } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { STORIES } from "@/constants/mock-data";
import Story from "@/components/Story";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader } from "@/components/Loader";
import Post from "@/components/Post";

export default function Index() {
  const {signOut} = useAuth();

  const posts = useQuery(api.posts.getFeedPosts)

  if(posts === undefined) return <Loader />
  if(posts.length === 0) return <NoPostsFound />

  return (
    <View style={styles.container}>
        {/* HEADER */ }
         <View style={styles.header}>
            <Text style={styles.headerTitle}>Vilight</Text>
             <TouchableOpacity onPress={() => signOut()}>
              <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
             </TouchableOpacity>
         </View>

         <FlatList 
           data={posts}
           renderItem={({item}) => <Post post={item} />}
           keyExtractor={(item) => item._id}
           showsVerticalScrollIndicator={false}
           contentContainerStyle={{ paddingBottom: 60 }}
           ListHeaderComponent={<StoriesSection />}
         />
    </View>
  );
}

const StoriesSection = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
      {STORIES.map((story) => (
        <Story key={story.id} story={story} />
      ))}
      </ScrollView>
    )
}

const NoPostsFound = () => (
    <View style={{
       flex:1,
       backgroundColor: COLORS.background,
       justifyContent: "center",
       alignItems: "center",
    }}>
      <Text style={{ fontSize:20, color: COLORS.primary }}>No posts yet</Text>
    </View>
);

