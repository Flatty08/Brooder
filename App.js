import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

export default function QuickOverviewSetup() {
  const [chicksCount, setChicksCount] = useState('');
  const [daysCount, setDaysCount] = useState('');

  const handleSaveChicksCount = () => {
    console.log('Saving chicks count:', chicksCount);
  };

  const handleSaveDaysCount = () => {
    console.log('Saving days count:', daysCount);
  };

  const handleBack = () => {
    console.log('Navigate back to dashboard');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#1e3a8a" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Quick Overview Setup</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.card}>
          {/* Chicks Input Section */}
          <View style={styles.section}>
            <Text style={styles.label}>Number of Chicks per Batch</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter number of chicks"
              value={chicksCount}
              onChangeText={setChicksCount}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={handleSaveChicksCount} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Chicks Count</Text>
            </TouchableOpacity>
          </View>

          {/* Days Input Section */}
          <View style={styles.section}>
            <Text style={styles.label}>Number of Days per Batch</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter number of days (1-45)"
              value={daysCount}
              onChangeText={setDaysCount}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={handleSaveDaysCount} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Days Count</Text>
            </TouchableOpacity>
          </View>

          {/* Back to Dashboard Button */}
          <TouchableOpacity onPress={handleBack} style={styles.backToDashboardButton}>
            <Text style={styles.backToDashboardText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' }, // bg-gray-50
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb', // border-gray-200
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827', // text-gray-900
    marginLeft: 8,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827', // text-gray-900
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e5e7eb', // border-gray-200
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    color: '#111827', // text-gray-900
  },
  saveButton: {
    backgroundColor: '#1e40af', // bg-blue-900
    borderRadius: 12,
    paddingVertical: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  backToDashboardButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb', // border-gray-200
    borderRadius: 12,
    paddingVertical: 12,
  },
  backToDashboardText: {
    color: '#4b5563', // text-gray-700
    fontWeight: '500',
    textAlign: 'center',
  },
});
