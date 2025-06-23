import MenuBar from '@/components/menubar';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function JsonViewer() {
  const params = useLocalSearchParams();
  const [jsonContent, setJsonContent] = useState<any>(null);

  const filename = params.filename as string || 'JSON Viewer';

  useEffect(() => {
    if (params.data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(params.data as string));
        setJsonContent(parsed);
      } catch (error) {
        console.error('Invalid JSON');
      }
    }
  }, [params]);

  const renderJsonAsText = (data: any, indent = 0): string => {
    if (typeof data === 'object' && data !== null) {
      return Object.entries(data)
        .map(
          ([key, value]) =>
            `${'  '.repeat(indent)}${key}: ${
              typeof value === 'object' ? '\n' + renderJsonAsText(value, indent + 1) : String(value)
            }`
        )
        .join('\n');
    }
    return `${'  '.repeat(indent)}${String(data)}`;
  };

  return (
    <View style={styles.container}>
      <MenuBar title={filename} />
      {jsonContent ? (
        <Text style={styles.jsonText}>
          {renderJsonAsText(jsonContent)}
        </Text>
      ) : (
        <Text style={styles.placeholder}>Nenhum JSON carregado</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: '100%',
  },
  jsonText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#333',
  },
  placeholder: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});