import { View, Text } from 'react-native'
import { Redirect } from 'expo-router'

export default function index() {
  return <Redirect href="/(auth)/login" />
}

