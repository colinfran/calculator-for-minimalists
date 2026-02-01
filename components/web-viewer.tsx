import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface WebViewerProps {
  uri: string;
  goBack: () => void;
}

const WebViewer: React.FC<WebViewerProps> = ({ uri, goBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Back" onPress={goBack} />
      </View>
      <WebView
        source={{ uri }}
        scalesPageToFit={false}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 10, backgroundColor: '#fff' },
  webview: { flex: 1 },
});

export default WebViewer;
