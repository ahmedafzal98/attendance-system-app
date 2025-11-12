import { BaseToast, ErrorToast } from "react-native-toast-message";

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#3b82f6",
        backgroundColor: "white",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#3b82f6",
      }}
      text2Style={{
        fontSize: 14,
        color: "#374151",
      }}
      text2NumberOfLines={3} // 👈 allow up to 3 lines
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "red",
        backgroundColor: "white",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "red",
      }}
      text2Style={{
        fontSize: 14,
        color: "#374151",
      }}
      text2NumberOfLines={3} // 👈 allow up to 3 lines
    />
  ),
};

export default toastConfig;
