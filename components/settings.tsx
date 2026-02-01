import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import WebViewer from './web-viewer';

interface SettingsProps {
  close: () => void;
}

const Settings: React.FC<SettingsProps> = ({ close }) => {
  const [webUri, setWebUri] = useState<string | null>(null);

  if (webUri) {
    // Show WebViewer instead of the settings list
    return <WebViewer uri={webUri} goBack={() => setWebUri(null)} />;
  }

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <View style={styles.closeButtonContainer}>
        <Pressable onPress={close} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
          <Text style={{ color: '#007AFF', fontSize: 16 }}>Close</Text>
        </Pressable>
      </View>

      {/* Main List */}
      <View style={styles.listContainer}>
        <View style={styles.card}>
          {/* Rate App */}
          <TouchableOpacity
            activeOpacity={0.1}
            style={styles.listItem}
            onPress={() =>
              Linking.openURL(
                'https://apps.apple.com/us/app/calculator-for-minimalists/id1560501633?action=write-review'
              )
            }
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="star-circle-outline" size={24} color="black" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Rate this app</Text>
            </View>
          </TouchableOpacity>

          {/* License */}
          <TouchableOpacity
            activeOpacity={0.1}
            style={styles.listItem}
            onPress={() =>
              setWebUri(
                'https://colinfran.github.io/calculator-for-minimalists/license.html'
              )
            }
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="copyright" size={24} color="black" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>License</Text>
            </View>
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity
            activeOpacity={0.1}
            style={styles.listItem}
            onPress={() =>
              setWebUri(
                'https://colinfran.github.io/calculator-for-minimalists/privacy-policy.html'
              )
            }
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="text-box-outline" size={24} color="black" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Privacy Policy</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Designed, developed, and built</Text>
        <Text style={styles.footerText}>by Colin Franceschini</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  closeButtonContainer: {
    position: 'absolute', 
    top: 15, 
    right: 25, 
    zIndex: 20, 
    backgroundColor: "none"
  },
  closeButton: { 
    backgroundColor: "transparent"
  },
  listContainer: { padding: 40, marginTop: 30 },
  card: { backgroundColor: '#fff', borderRadius: 10 },
  listItem: {
    flexDirection: 'row',
    borderBottomWidth: 0.8,
    borderBottomColor: '#ccc',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  iconContainer: { width: '20%', justifyContent: 'center', alignItems: 'center' },
  textContainer: { width: '80%', justifyContent: 'center' },
  text: { fontSize: 16, color: '#000' },
  footer: {
    // padding: 40,
    // paddingTop: 10,
    paddingVertical: 20,      // vertical padding only
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    marginBottom: 20,
  },
  footerText: { fontSize: 12, color: '#000' },
});

export default Settings;
