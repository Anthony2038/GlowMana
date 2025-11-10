// src/components/CustomButton.js
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ title, onPress, type = 'primary' }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'primary' ? styles.primaryButton : styles.secondaryButton
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.text,
        type === 'primary' ? styles.primaryText : styles.secondaryText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 8,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  secondaryButton: {
    backgroundColor: '#000000',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  primaryText: {
    color: '#000000',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
});

export default CustomButton;