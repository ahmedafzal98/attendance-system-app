import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import SwipeButton from "rn-swipe-button"; // install this: npm i rn-swipe-button
import Toast from "react-native-toast-message";
import { useState } from "react";
import ActivitySection from "../../components/activitySection";

export default function Attendance() {
  const [today] = useState(new Date());

  const dates = Array.from({ length: 7 }, (_, i) => {
    let d = new Date();
    d.setDate(today.getDate() + (i - 3)); // past 3, today, next 3
    return d;
  });

  return (
    <ScrollView style={styles.container}>
      {/* 1 - Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Ahmed Afzal</Text>
          <Text style={styles.designation}>Software Engineer</Text>
        </View>
      </View>

      {/* 2 - Dates */}
      <FlatList
        horizontal
        data={dates}
        keyExtractor={(item, idx) => idx.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isToday = item.toDateString() === today.toDateString();
          return (
            <View style={[styles.dateBox, isToday && styles.todayBox]}>
              <Text style={[styles.dateDay, isToday && styles.todayText]}>
                {item.getDate().toString().padStart(2, "0")}
              </Text>
              <Text style={[styles.dateMonth, isToday && styles.todayText]}>
                {item.toLocaleDateString("en-US", { weekday: "short" })}
              </Text>
            </View>
          );
        }}
      />

      {/* 3 - Today Attendance */}
      <Text style={styles.sectionTitle}>Today’s Attendance</Text>
      <View style={styles.grid}>
        <View style={styles.card}>
          <View style={styles.cardName}>
            <Ionicons name="log-in-outline" size={24} color="#3b82f6" />
            <Text style={styles.cardNameSpace}>Check In</Text>
          </View>
          <Text style={styles.cardTime}>09:00 AM</Text>
          <Text style={styles.cardRemark}>On time</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardName}>
            <MaterialIcons name="lunch-dining" size={24} color="#3b82f6" />
            <Text style={styles.cardNameSpace}>Break Time</Text>
          </View>
          <Text style={styles.cardTime}>12:30 PM</Text>
          <Text style={styles.cardRemark}>Avg: 30 min</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardName}>
            <Ionicons name="calendar-outline" size={24} color="#3b82f6" />
            <Text style={styles.cardNameSpace}>Total Days</Text>
          </View>
          <Text style={styles.cardTime}>15</Text>
          <Text style={styles.cardRemark}>Working days</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardName}>
            <Ionicons name="stats-chart-outline" size={24} color="#3b82f6" />
            <Text style={styles.cardNameSpace}>Performance</Text>
          </View>
          <Text style={styles.cardTime}>92%</Text>
          <Text style={styles.cardRemark}>On time this month</Text>
        </View>
      </View>

      {/* 4 - Activity */}
      <ActivitySection />

      <View style={styles.swipeButton}>
        <SwipeButton
          thumbIconBackgroundColor="#fff"
          railBackgroundColor="#3b82f6"
          railBorderColor="#e5e7eb"
          title="Swipe to Checkout"
          titleColor="#fff"
          onSwipeSuccess={() => {
            Toast.show({
              type: "success",
              text1: `Checked out at ${new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`,
            });
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
  name: { fontSize: 18, fontWeight: "bold" },
  designation: { fontSize: 14, color: "gray" },
  dateList: { marginBottom: 20, backgroundColor: "red" },
  dateBox: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,

    // Android shadow
    elevation: 2,
  },
  todayBox: { backgroundColor: "#3b82f6" },
  dateDay: { fontSize: 16, fontWeight: "bold" },
  dateMonth: { fontSize: 12, color: "gray" },
  todayText: { color: "#fff" },
  sectionTitle: {
    fontSize: 18,
    marginTop: 30,
    fontWeight: "600",
    marginVertical: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f9fafb",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,

    // Android shadow
    elevation: 2,
  },
  cardName: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  cardTime: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  cardRemark: { fontSize: 12, color: "gray" },
  cardNameSpace: { marginLeft: 5 },
  swipeButton: { marginBottom: 20 },
});
