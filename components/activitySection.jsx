import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // you can swap icons if you want

const activities = [
  {
    id: 1,
    type: "checkin",
    title: "Check-In",
    subtitle: "On time",
    time: "09:00 AM",
    icon: "log-in-outline",
    color: "#3b82f6",
  },
  {
    id: 2,
    type: "break",
    title: "Break Start",
    subtitle: "Lunch Break",
    time: "12:30 PM",
    icon: "fast-food-outline",
    color: "#10b981",
  },
  {
    id: 3,
    type: "meeting",
    title: "Team Meeting",
    subtitle: "Project discussion",
    time: "02:00 PM",
    icon: "people-outline",
    color: "#f59e0b",
  },
  {
    id: 4,
    type: "checkout",
    title: "Checkout",
    subtitle: "Left office",
    time: "06:00 PM",
    icon: "log-out-outline",
    color: "#ef4444",
  },
];

export default function ActivitySection() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Your Activity</Text>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {activities.map((item, index) => (
          <View key={item.id} style={styles.activityItem}>
            {/* Left Column: Icon + Line */}
            <View style={styles.leftColumn}>
              <View
                style={[styles.iconWrapper, { backgroundColor: item.color }]}
              >
                <Ionicons name={item.icon} size={18} color="white" />
              </View>
              {index !== activities.length - 1 && (
                <View style={styles.verticalLine} />
              )}
            </View>

            {/* Right Content */}
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>

            {/* Time */}
            <Text style={styles.time}>{item.time}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#111827",
  },
  scrollArea: {
    maxHeight: 300, // only activity section scrolls, not whole screen
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 25,
  },
  leftColumn: {
    width: 40,
    alignItems: "center",
  },
  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  verticalLine: {
    flex: 1,
    width: 2,
    backgroundColor: "#e5e7eb",
    marginTop: 5,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
  },
  time: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#3b82f6",
  },
});
