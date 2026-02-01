import { FC } from 'react'
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'

// Rows of buttons with display labels
const buttons = [
  ['%', '(', ')', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['AC', '0', '.', '='],
]

// Map display labels to actual math values
const labelToValue: Record<string, string> = {
  '÷': '/',
  '×': '*',
  '%': '%',
  '+': '+',
  '-': '-',
  '(': '(',
  ')': ')',
  '=': '=',
  'AC': 'AC',
  '.': '.',
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
}

type Props = {
  value: string
  onChange: (v: string) => void
}

const CalculatorButtons: FC<Props> = ({ value, onChange }) => {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  const colors = {
    text: isDark ? '#fff' : '#000',
    background2: isDark ? '#303030' : '#e0e0e0',
    pressedBackground: isDark ? '#505050' : '#cfcfcf',
    borderColor: isDark ? '#fff' : '#303030',
  }

  const handlePress = (label: string) => {
    const val = labelToValue[label]

    if (val === '=') {
      try {
        const result = eval(value)
        onChange(String(result))
      } catch {
        onChange('Error')
      }
      return
    }

    if (val === 'AC') {
      onChange('0')
      return
    }

    if (value === '0' || value === 'Error') {
      onChange(val)
      return
    }

    onChange(value + val)
  }

  return (
    <View style={styles.container}>
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((label, index) => (
            <Pressable
              key={label}
              onPress={() => handlePress(label)}
              style={({ pressed }) => [
                styles.button,
                {
                  backgroundColor: pressed
                    ? colors.pressedBackground
                    : colors.background2,
                  borderColor: colors.borderColor,
                  // borderBottomLeftRadius: label === 'AC' ? 20 : 0,
                  // borderBottomRightRadius: label === '=' ? 20 : 0,
                  // borderWidth: 
                },
              ]}
            >
              <Text style={[styles.buttonText, { color: colors.text }]}>{label}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
  },
})

export default CalculatorButtons
