import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const router = useRouter();

  const openDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/json',
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled) return;

    const file = result.assets[0];
    const response = await fetch(file.uri);
    const text = await response.text();

    try {
      const json = JSON.parse(text);
      router.push({
        pathname: '/jsonviewer',
        params: { data: encodeURIComponent(JSON.stringify(json)) },
      });
    } catch {
      console.warn('Invalid JSON');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button mode="elevated" onPress={openDocument}>Open file</Button>
    </View>
  );
}
