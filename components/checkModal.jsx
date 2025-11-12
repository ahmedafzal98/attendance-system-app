// components/CheckModal.jsx
import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CheckModal = ({ visible, onClose, type = "checkin", time, message }) => {
  // Choose icon and color based on type
  const iconData = {
    checkin: { name: "log-in-outline", color: "#4CAF50", title: "Checked In" },
    checkout: {
      name: "log-out-outline",
      color: "#F44336",
      title: "Checked Out",
    },
    break: {
      name: "restaurant-outline",
      color: "#FF9800",
      title: "Break Started",
    },
    default: {
      name: "checkmark-circle-outline",
      color: "#2196F3",
      title: "Success",
    },
  };

  const { name, color, title } = iconData[type] || iconData.default;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Icon name={name} size={50} color={color} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
          {message && <Text style={styles.message}>{message}</Text>}
          {time && <Text style={styles.time}>{time}</Text>}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CheckModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  icon: {
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 5,
  },
  time: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
