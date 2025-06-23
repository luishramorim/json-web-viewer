import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Divider } from 'react-native-paper';

export default function JsonViewer() {
  const params = useLocalSearchParams();
  const [jsonContent, setJsonContent] = useState<any>(null);

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

  const renderJson = (data: any, indent = 0) => {
    if (typeof data === 'object' && data !== null) {
      return Object.entries(data).map(([key, value]) => (
        <Card key={key} style={[styles.card, { marginLeft: indent * 10 }]}>
          <Card.Content>
            <View style={styles.row}>
              <Text style={styles.key}>{key}:</Text>
              {typeof value === 'object' ? (
                <View style={{ flex: 1 }}>{renderJson(value, indent + 1)}</View>
              ) : (
                <Text style={styles.value}>{String(value)}</Text>
              )}
            </View>
          </Card.Content>
          <Divider />
        </Card>
      ));
    }
    return (
      <Card style={[styles.card, { marginLeft: indent * 10 }]}>
        <Card.Content>
          <View style={styles.row}>
            <Text style={styles.value}>{String(data)}</Text>
          </View>
        </Card.Content>
        <Divider />
      </Card>
    );
  };

  return (
    <View style={{ ...styles.container, overflow: 'scroll' }}>
      {jsonContent ? (
        renderJson(jsonContent)
      ) : (
        <Text style={styles.placeholder}>Nenhum JSON carregado</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
    maxWidth: 900,
    alignSelf: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  key: {
    fontWeight: '600',
    color: '#1565c0',
    fontSize: 15,
  },
  value: {
    color: '#37474f',
    fontSize: 15,
    flexShrink: 1,
  },
  placeholder: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  card: {
    marginVertical: 8,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});