// src/components/CustomButton.js
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ title, onPress, type = 'primary', disabled = false }) => {
  const handlePress = () => {
    console.log(`CustomButton "${title}" pressionado`);
    if (onPress) {
      onPress();
    } else {
      console.warn('onPress não definido para o botão');
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'primary' ? styles.primaryButton : styles.secondaryButton,
        disabled ? styles.disabled : null,
      ]}
      onPress={handlePress}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={[
        styles.text,
        type === 'primary' ? styles.primaryText : styles.secondaryText,
        disabled ? styles.disabledText : null,
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
    alignSelf: 'center',
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
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    // mantém a cor, apenas reduz opacidade do container
  },
});

export default CustomButton;