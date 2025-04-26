import { Loader } from '@/components/Loader';
import Post from '@/components/Post';
import { COLORS } from '@/constants/theme';
import { api } from '@/convex/_generated/api';
import { styles } from '@/styles/feed.styles';
import { useQuery } from 'convex/react'
import { Image } from 'expo-image';
import { View, Text, ScrollView } from 'react-native'


export default function Bookmarks() {
  const bookmarksPosts = useQuery(api.bookmarks.getBookmarksPosts);

  if (bookmarksPosts === undefined) return <Loader />;
  if (bookmarksPosts.length === 0) return <NoBookmarksFound />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>

      {/* POSTS  */}

      <ScrollView
      contentContainerStyle={{
        padding: 8,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
      >
        {bookmarksPosts.map((Post) => {
           if(!Post) return null
           return (
            <View key={Post._id} style={{width: "33.33%", padding: 1 }}>
              <Image
                source={Post.imageUrl}
                style={{width: "100%", aspectRatio: 1 }}
                contentFit='cover'
                transition={200}
                cachePolicy="memory-disk"
              />
            </View>
           )
        })}
      </ScrollView>
    </View>
  )
}

function NoBookmarksFound() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.background,
    }}>
      <Text style={{color: COLORS.primary, fontSize:22}}>No bookmarked posts yet</Text>
    </View>
  )
}