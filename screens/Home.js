import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import QuickSetupModal from "./Components/QuickSetupModal";

// Replace static import with a dynamic require + in-memory fallback.
// This avoids a crash when @react-native-async-storage/async-storage is not installed.
let AsyncStorage;
try {
  // try to require the community package (works in metro bundler environment)
  const mod = require("@react-native-async-storage/async-storage");
  AsyncStorage = mod && mod.default ? mod.default : mod;
} catch (e) {
  console.warn(
    "[AsyncStorage] @react-native-async-storage/async-storage not found — using in-memory fallback. Install the package to persist data between app restarts."
  );
  // Simple in-memory shim that mimics AsyncStorage API (not persistent across reloads)
  const _store = {};
  AsyncStorage = {
    getItem: async (key) => {
      return Object.prototype.hasOwnProperty.call(_store, key)
        ? _store[key]
        : null;
    },
    setItem: async (key, value) => {
      _store[key] = String(value);
    },
    removeItem: async (key) => {
      delete _store[key];
    },
    // optional helpers
    clear: async () => {
      Object.keys(_store).forEach((k) => delete _store[k]);
    },
  };
}

class ErrorBoundary extends React.Component {
  state = { hasError: false, err: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, err: error };
  }
  componentDidCatch(error, info) {
    console.warn("[ErrorBoundary]", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
          <Text style={{ fontWeight: "700", fontSize: 18, marginBottom: 8 }}>
            Render Error
          </Text>
          <Text selectable>{String(this.state.err)}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function QuickOverviewSetup() {
  const [chicksCount, setChicksCount] = useState("");
  const [daysCount, setDaysCount] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [showQuickSetup, setShowQuickSetup] = useState(false);

  // Load saved data when component mounts
  useEffect(() => {
    loadSavedData();

    // Set today's date
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setTodayDate(formattedDate);

    console.log("[App] Mounted");
  }, []);

  const loadSavedData = async () => {
    try {
      const savedChicks = await AsyncStorage.getItem("chicksCount");
      const savedDays = await AsyncStorage.getItem("daysCount");

      if (savedChicks !== null) {
        setChicksCount(savedChicks);
      }
      if (savedDays !== null) {
        setDaysCount(savedDays);
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
  };

  const handleSaveChicksCount = async () => {
    if (!chicksCount || parseInt(chicksCount) <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid number of chicks");
      return;
    }

    try {
      await AsyncStorage.setItem("chicksCount", chicksCount);
      Alert.alert("Success", "Chicks count saved successfully");
      console.log("Saving chicks count:", chicksCount);
    } catch (error) {
      console.error("Error saving chicks count:", error);
      Alert.alert("Error", "Failed to save chicks count");
    }
  };

  const handleSaveDaysCount = async () => {
    const days = parseInt(daysCount);
    if (!daysCount || days < 1 || days > 45) {
      Alert.alert("Invalid Input", "Please enter a number between 1 and 45");
      return;
    }

    try {
      await AsyncStorage.setItem("daysCount", daysCount);
      Alert.alert("Success", "Days count saved successfully");
      console.log("Saving days count:", daysCount);
    } catch (error) {
      console.error("Error saving days count:", error);
      Alert.alert("Error", "Failed to save days count");
    }
  };

  const handleBack = () => {
    console.log("Navigate back to dashboard");
  };

  const openQuickSetup = () => setShowQuickSetup(true);
  const closeQuickSetup = () => setShowQuickSetup(false);

  const handleSaveChicksCountModal = (value) => {
    setChicksCount(value);
    setShowQuickSetup(false);
  };

  return (
    <ErrorBoundary>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.greeting}>Hello, User! 👋</Text>
            <Text style={styles.date}>{todayDate}</Text>
          </View>

          {/* System Status Card */}
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <View>
                <Text style={styles.statusLabel}>System Status</Text>
                <Text style={styles.statusText}>All Systems Normal</Text>
              </View>
              <View style={styles.statusIconContainer}>
                <Icon name="zap" size={28} color="#ffffff" />
              </View>
            </View>
          </View>

          {/* Sensor Monitoring Grid */}
          <Text style={styles.sectionTitle}>Live Monitoring</Text>
          <View style={styles.sensorGrid}>
            {/* Temperature Card */}
            <View style={styles.sensorCard}>
              <View style={styles.sensorIconRow}>
                <View style={styles.sensorIconContainer}>
                  <Icon name="thermometer" size={24} color="#000000" />
                </View>
                <Text style={styles.sensorName}>Temperature</Text>
              </View>
              <Text style={styles.sensorValue}>32°C</Text>
              <View style={styles.statusBadge}>
                <Icon name="check" size={14} color="#22c55e" />
                <Text style={[styles.statusBadgeText, styles.statusOptimal]}>Optimal</Text>
              </View>
            </View>

            {/* Water Level Card */}
            <View style={styles.sensorCard}>
              <View style={styles.sensorIconRow}>
                <View style={styles.sensorIconContainer}>
                  <Icon name="droplet" size={24} color="#1a1a1a" />
                </View>
                <Text style={styles.sensorName}>Water Level</Text>
              </View>
              <Text style={styles.sensorValue}>85%</Text>
              <View style={styles.statusBadge}>
                <Icon name="check" size={14} color="#eab308" />
                <Text style={[styles.statusBadgeText, styles.statusGood]}>Good</Text>
              </View>
            </View>

            {/* Feed Level Card */}
            <View style={styles.sensorCard}>
              <View style={styles.sensorIconRow}>
                <View style={styles.sensorIconContainer}>
                  <MaterialIcon name="food-drumstick" size={24} color="#1a1a1a" />
                </View>
                <Text style={styles.sensorName}>Feed Level</Text>
              </View>
              <Text style={styles.sensorValue}>62%</Text>
              <View style={styles.statusBadge}>
                <Icon name="check" size={14} color="#22c55e" />
                <Text style={[styles.statusBadgeText, styles.statusOptimal]}>Optimal</Text>
              </View>
            </View>

            {/* Solar Charge Card */}
            <View style={styles.sensorCard}>
              <View style={styles.sensorIconRow}>
                <View style={styles.sensorIconContainer}>
                  <Icon name="sun" size={24} color="#1a1a1a" />
                </View>
                <Text style={styles.sensorName}>Solar Charge</Text>
              </View>
              <Text style={styles.sensorValue}>62%</Text>
              <View style={styles.statusBadge}>
                <Icon name="check" size={14} color="#22c55e" />
                <Text style={[styles.statusBadgeText, styles.statusOptimal]}>Optimal</Text>
              </View>
            </View>

            {/* Humidity Card */}
            <View style={styles.sensorCard}>
              <View style={styles.sensorIconRow}>
                <View style={styles.sensorIconContainer}>
                  <MaterialIcon name="water-percent" size={24} color="#1a1a1a" />
                </View>
                <Text style={styles.sensorName}>Humidity</Text>
              </View>
              <Text style={styles.sensorValue}>78%</Text>
              <View style={styles.statusBadge}>
                <Icon name="check" size={14} color="#eab308" />
                <Text style={[styles.statusBadgeText, styles.statusGood]}>Good</Text>
              </View>
            </View>

            {/* Light Status Card */}
            <View style={styles.sensorCard}>
              <View style={styles.sensorIconRow}>
                <View style={styles.sensorIconContainer}>
                  <MaterialIcon name="lightbulb-on" size={24} color="#1a1a1a" />
                </View>
                <Text style={styles.sensorName}>Light Status</Text>
              </View>
              <Text style={styles.sensorValue}>On</Text>
              <View style={styles.statusBadge}>
                <Icon name="check" size={14} color="#22c55e" />
                <Text style={[styles.statusBadgeText, styles.statusOptimal]}>Active</Text>
              </View>
            </View>
          </View>

          {/* Recent Alerts Card */}
          <View style={styles.alertsContainer}>
            <View style={styles.alertsTitleRow}>
              <Icon name="alert-triangle" size={16} color="#000000" />
              <Text style={styles.alertsSectionTitle}>Recent Alerts</Text>
            </View>
            
            <View style={styles.alertItem}>
              <View style={styles.alertBullet}>
                <MaterialIcon name="circle" size={8} color="#3b82f6" />
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertText}>Feeding completed</Text>
                <Text style={styles.alertTime}>2 hours ago</Text>
              </View>
            </View>

            <View style={styles.alertItem}>
              <View style={styles.alertBullet}>
                <MaterialIcon name="circle" size={8} color="#3b82f6" />
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertText}>Temperature adjusted</Text>
                <Text style={styles.alertTime}>5 hours ago</Text>
              </View>
            </View>
          </View>

          {/* Brooder Information Card */}
          <View style={styles.brooderContainer}>
            <View style={styles.brooderTitleRow}>
              <Icon name="info" size={16} color="#ffffff" />
              <Text style={styles.brooderSectionTitle}>Brooder Information</Text>
            </View>
            <View style={styles.brooderCard}>
              <View style={styles.brooderRow}>
                <Text style={styles.brooderLabel}>Total Chicks</Text>
                <Text style={styles.brooderValue}>20</Text>
              </View>

              <View style={styles.brooderDivider} />

              <View style={styles.brooderRow}>
                <Text style={styles.brooderLabel}>Age</Text>
                <Text style={styles.brooderValue}>18 days</Text>
              </View>

              <View style={styles.brooderDivider} />

              <View style={styles.brooderRow}>
                <Text style={styles.brooderLabel}>Expected Harvest</Text>
                <Text style={styles.brooderValue}>27 days</Text>
              </View>
            </View>
          </View>

          {/* CTA Button */}
          <Pressable
            style={styles.ctaButton}
            activeOpacity={0.85}
            onPress={openQuickSetup}
          >
            {({ pressed }) => (
              <View style={[styles.ctaButtonInner, pressed && styles.ctaButtonPressed]}>
                <Text style={[styles.ctaText, pressed && styles.ctaTextPressed]}>
                  Go to Quick Overview
                </Text>
              </View>
            )}
          </Pressable>

          <QuickSetupModal
            visible={showQuickSetup}
            initialChicksCount={chicksCount}
            onSave={handleSaveChicksCountModal}
            onClose={closeQuickSetup}
          />
        </View>
      </ScrollView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  container: {
    backgroundColor: "#f8fafc",
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 12,
    marginTop: 8,
  },
  statusCard: {
    backgroundColor: "#22c55e",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 4,
  },
  statusText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  statusIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "  rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  sensorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sensorCard: {
    width: "48%",
    backgroundColor: "#F8FCFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#3b82f6",
  },
  sensorIconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sensorIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  sensorName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000000",
    flex: 1,
  },
  sensorValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000000",
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  statusBadgeText: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 4,
  },
  statusOptimal: {
    color: "#22c55e",
  },
  statusGood: {
    color: "#eab308",
  },
  alertsContainer: {
    backgroundColor: "#F8FCFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#3b82f6",
  },
  alertsTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  alertsSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    marginLeft: 8,
  },
  alertsCard: {
    backgroundColor: "#2c6486ff",
    borderRadius: 12,
    padding: 12,
  },
  alertItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#D4DFE6",
    borderRadius: 12,
    marginBottom: 8,
  },
  alertItemWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#94a3b8",
    marginBottom: 4,
  },
  alertBullet: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 3,
  },
  alertContent: {
    flex: 1,
  },
  alertText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 2,
  },
  alertTime: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  brooderContainer: {
    backgroundColor: "#F8FCFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#3b82f6",
  },
  brooderTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  brooderSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    marginLeft: 8,
  },
  brooderCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
  },
  brooderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  brooderLabel: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },
  brooderValue: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "700",
  },
  brooderDivider: {
    height: 0,
    backgroundColor: "#e2e8f0",
  },
  ctaButton: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  ctaButtonInner: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3b82f6",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  ctaButtonPressed: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  ctaText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 16,
  },
  ctaTextPressed: {
    color: "#ffffff",
  },
});
