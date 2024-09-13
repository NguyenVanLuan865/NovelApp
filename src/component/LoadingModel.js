import React from 'react';
import { Modal, View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const LoadingModal = ({ visible, message }) => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          {message ? (
            <Text style={styles.message}>{message}</Text>
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 200,
    width: 200,
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    padding: 10,
    textAlign: 'center'
  }
});

export default LoadingModal;
