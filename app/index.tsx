import Ionicons from '@expo/vector-icons/Ionicons'
import { Stack } from 'expo-router'
import { FC, useRef, useState } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'
import { SafeAreaView } from 'react-native-safe-area-context'

import Settings from '@/components/settings'
import CalculatorButtons from '@/components/ui/calculator-buttons'
import { Colors } from '@/constants/theme'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const DISPLAY_MAX_HEIGHT = 150

const CalculatorScreen: FC = () => {
  const scheme = useColorScheme() ?? 'light'
  const colors = Colors[scheme]

  const [expression, setExpression] = useState('')

  const sheetRef = useRef<ActionSheetRef>(null)
  const scrollRef = useRef<ScrollView>(null)

  const openSheet = () => sheetRef.current?.show()
  const closeSheet = () => sheetRef.current?.hide()

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <View style={[styles.contentContainer, { borderColor: colors.border }]}>
          {/* Info */}
          <TouchableOpacity onPress={openSheet} style={styles.infoButton}>
            <Ionicons
              name="information-circle-outline"
              size={28}
              color={colors.text}
            />
          </TouchableOpacity>

          {/* Display */}
          <View
            style={[
              styles.display,
              { borderColor: colors.border },
            ]}
          >
            <ScrollView
              ref={scrollRef}
              style={{ height: DISPLAY_MAX_HEIGHT }}
              contentContainerStyle={styles.displayScrollContent}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() =>
                scrollRef.current?.scrollToEnd({ animated: false })
              }
            >
              <Text style={[styles.displayText, { color: colors.text }]}>
                {expression || '0'}
              </Text>
            </ScrollView>
          </View>

          {/* Buttons */}
          <CalculatorButtons value={expression} onChange={setExpression} />
        </View>

        {/* ActionSheet */}
        <ActionSheet
          ref={sheetRef}
          containerStyle={styles.sheetContainer}
        >
          <Settings close={closeSheet} />
        </ActionSheet>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  contentContainer: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 12,
    margin: 12,
    overflow: 'hidden',
  },
  display: {
    padding: 16,
    marginTop: 24,
    justifyContent: 'flex-end',
  },
  displayScrollContent: {
    justifyContent: 'flex-end',
  },
  displayText: {
    fontSize: 48,
    fontWeight: '300',
    textAlign: 'right',
  },
  infoButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 10,
  },
  sheetContainer: {
    height: SCREEN_HEIGHT * 0.8,
    backgroundColor: '#e0e0e0',
  },
})

export default CalculatorScreen
