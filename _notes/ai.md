## AI design

// ==========================================
// FOLDER STRUCTURE (Expo Router)
// ==========================================

/*
app/
  ├── _layout.tsx                    # Root layout
  │
  ├── (tabs)/                        # Tab layout group
  │   ├──_layout.tsx               # Tabs configuration
  │   ├── index.tsx                 # Home - All timer types
  │   ├── my-timers.tsx             # User's saved timers
  │   └── settings.tsx              # Settings
  │
  ├── timer/                         # Timer screens
  │   ├── [type].tsx                # Dynamic timer screen
  │   └── config.tsx                # Timer configuration
  │
  ├── create-timer.tsx               # Modal for creating timer
  │
  └── modal/
      └── timer-info.tsx            # Timer info modal

constants/
  └── TimerTypes.ts                 # Timer type definitions

components/
  ├── timers/
  │   ├── CountdownTimer.tsx
  │   ├── PomodoroTimer.tsx
  │   ├── IntervalTimer.tsx
  │   ├── PromptTimer.tsx
  │   └── StopwatchTimer.tsx
  │
  └── TimerCard.tsx                 # Card component for timer list
*/

// ==========================================
// constants/TimerTypes.ts
// ==========================================

export enum TimerType {
  COUNTDOWN = 'countdown',
  POMODORO = 'pomodoro',
  INTERVAL = 'interval',
  STOPWATCH = 'stopwatch',
  PROMPT = 'prompt',
  HIIT = 'hiit',
  TABATA = 'tabata',
  CUSTOM = 'custom'
}

export interface TimerConfig {
  id: string;
  type: TimerType;
  name: string;
  description: string;
  icon: string;
  config: any; // Type varies by timer type
  createdAt: Date;
  updatedAt: Date;
}

export const DEFAULT_TIMERS = [
  {
    type: TimerType.COUNTDOWN,
    name: 'Countdown Timer',
    description: 'Simple countdown from set duration',
    icon: 'timer-outline',
    defaultConfig: { duration: 300 } // 5 minutes
  },
  {
    type: TimerType.POMODORO,
    name: 'Pomodoro Timer',
    description: '25min work, 5min break technique',
    icon: 'timer',
    defaultConfig: {
      workDuration: 1500, // 25 min
      breakDuration: 300, // 5 min
      longBreakDuration: 900, // 15 min
      cycles: 4
    }
  },
  {
    type: TimerType.INTERVAL,
    name: 'Interval Timer',
    description: 'Alternating work and rest periods',
    icon: 'repeat',
    defaultConfig: {
      workDuration: 45,
      restDuration: 15,
      rounds: 8
    }
  },
  {
    type: TimerType.STOPWATCH,
    name: 'Stopwatch',
    description: 'Count up from zero',
    icon: 'stopwatch',
    defaultConfig: {}
  },
  {
    type: TimerType.PROMPT,
    name: 'Prompt Timer',
    description: 'Timed reminders with custom messages',
    icon: 'notifications',
    defaultConfig: {
      interval: 300, // 5 minutes
      prompts: ['Take a break', 'Drink water', 'Stretch']
    }
  },
  {
    type: TimerType.HIIT,
    name: 'HIIT Timer',
    description: 'High-intensity interval training',
    icon: 'fitness',
    defaultConfig: {
      workDuration: 30,
      restDuration: 10,
      rounds: 10,
      prepareDuration: 10
    }
  },
  {
    type: TimerType.TABATA,
    name: 'Tabata Timer',
    description: '20s work, 10s rest, 8 rounds',
    icon: 'flash',
    defaultConfig: {
      workDuration: 20,
      restDuration: 10,
      rounds: 8,
      prepareDuration: 10
    }
  }
];

// ==========================================
// app/_layout.tsx (Root Layout)
// ==========================================

import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="create-timer"
          options={{
            presentation: 'modal',
            title: 'Create Timer'
          }}
        />
        <Stack.Screen name="timer/[type]" options={{ headerShown: false }} />
        <Stack.Screen
          name="timer/config"
          options={{
            title: 'Configure Timer',
            presentation: 'modal'
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}

// ==========================================
// app/(tabs)/_layout.tsx (Tabs Layout)
// ==========================================

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Timers',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-timers"
        options={{
          title: 'My Timers',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmarks" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// ==========================================
// app/(tabs)/index.tsx (Home Page)
// ==========================================

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DEFAULT_TIMERS } from '../../constants/TimerTypes';

export default function HomePage() {
  const handleTimerPress = (type: string) => {
    router.push({
      pathname: '/timer/[type]',
      params: { type }
    });
  };

  const handleCreateTimer = () => {
    router.push('/create-timer');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Timers</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateTimer}
        >
          <Ionicons name="add-circle" size={32} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={DEFAULT_TIMERS}
        numColumns={2}
        keyExtractor={(item) => item.type}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.timerCard}
            onPress={() => handleTimerPress(item.type)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon as any} size={48} color="#007AFF" />
            </View>
            <Text style={styles.timerName}>{item.name}</Text>
            <Text style={styles.timerDesc}>{item.description}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  createButton: {
    padding: 8,
  },
  listContent: {
    padding: 10,
  },
  timerCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  timerName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  timerDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

// ==========================================
// app/(tabs)/my-timers.tsx (Saved Timers)
// ==========================================

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function MyTimersPage() {
  const [savedTimers, setSavedTimers] = useState([]);

  const handleTimerPress = (timer: any) => {
    router.push({
      pathname: '/timer/[type]',
      params: {
        type: timer.type,
        config: JSON.stringify(timer.config),
        id: timer.id
      }
    });
  };

  const handleEditTimer = (timer: any) => {
    router.push({
      pathname: '/timer/config',
      params: {
        type: timer.type,
        currentConfig: JSON.stringify(timer.config),
        id: timer.id,
        mode: 'edit'
      }
    });
  };

  return (
    <View style={styles.container}>
      {savedTimers.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="timer-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No Saved Timers</Text>
          <Text style={styles.emptyText}>
            Create a custom timer to save it here
          </Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push('/create-timer')}
          >
            <Text style={styles.createButtonText}>Create Timer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={savedTimers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.timerItem}
              onPress={() => handleTimerPress(item)}
            >
              <View style={styles.timerContent}>
                <Text style={styles.timerName}>{item.name}</Text>
                <Text style={styles.timerType}>{item.type}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleEditTimer(item)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="create-outline" size={24} color="#007AFF" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  timerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timerContent: {
    flex: 1,
  },
  timerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  timerType: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
});

// ==========================================
// app/timer/[type].tsx (Dynamic Timer Screen)
// ==========================================

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function TimerScreen() {
  const { type, config } = useLocalSearchParams();
  const [isRunning, setIsRunning] = useState(false);
  
  const handleConfigure = () => {
    router.push({
      pathname: '/timer/config',
      params: { type, currentConfig: config }
    });
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{type} Timer</Text>
        <TouchableOpacity onPress={handleConfigure}>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.timerDisplay}>
        <Text style={styles.timeText}>00:00</Text>
        <Text style={styles.statusText}>
          {isRunning ? 'Running' : 'Ready'}
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]}
          onPress={toggleTimer}
        >
          <Ionicons 
            name={isRunning ? 'pause' : 'play'} 
            size={32} 
            color="#fff" 
          />
          <Text style={styles.buttonText}>
            {isRunning ? 'Pause' : 'Start'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Ionicons name="refresh" size={32} color="#000" />
          <Text style={styles.buttonTextSecondary}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  timerDisplay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 72,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  statusText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
  },
  controls: {
    padding: 20,
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});

// ==========================================
// app/timer/config.tsx (Configuration Screen)
// ==========================================

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function ConfigScreen() {
  const { type, currentConfig, mode } = useLocalSearchParams();
  const [timerName, setTimerName] = useState('');
  const [duration, setDuration] = useState('5');

  const handleSave = () => {
    // Save configuration logic here
    router.back();
  };

  const renderConfigFields = () => {
    // Render different fields based on timer type
    switch (type) {
      case 'countdown':
        return (
          <View style={styles.configSection}>
            <Text style={styles.label}>Duration (minutes)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={duration}
              onChangeText={setDuration}
              placeholder="5"
            />
          </View>
        );

      case 'pomodoro':
        return (
          <>
            <View style={styles.configSection}>
              <Text style={styles.label}>Work Duration (minutes)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="25"
              />
            </View>
            <View style={styles.configSection}>
              <Text style={styles.label}>Break Duration (minutes)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="5"
              />
            </View>
            <View style={styles.configSection}>
              <Text style={styles.label}>Cycles</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="4"
              />
            </View>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>
          {mode === 'edit' ? 'Edit' : 'Configure'} Timer
        </Text>
        <Text style={styles.subtitle}>
          {type} timer settings
        </Text>

        {mode === 'create' && (
          <View style={styles.configSection}>
            <Text style={styles.label}>Timer Name</Text>
            <TextInput
              style={styles.input}
              value={timerName}
              onChangeText={setTimerName}
              placeholder="My Custom Timer"
            />
          </View>
        )}

        {renderConfigFields()}

        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={24} color="#007AFF" />
          <Text style={styles.infoText}>
            You can save this configuration for quick access later
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>
            {mode === 'edit' ? 'Save Changes' : 'Save & Start'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textTransform: 'capitalize',
  },
  configSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#f0f7ff',
    padding: 16,
    borderRadius: 8,
    gap: 12,
    marginTop: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

// ==========================================
// app/create-timer.tsx (Create Timer Modal)
// ==========================================

import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DEFAULT_TIMERS } from '../constants/TimerTypes';

export default function CreateTimerModal() {
  const handleSelectType = (type: string) => {
    router.push({
      pathname: '/timer/config',
      params: { type, mode: 'create' }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create New Timer</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Choose a timer type</Text>

      <FlatList
        data={DEFAULT_TIMERS}
        keyExtractor={(item) => item.type}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.typeCard}
            onPress={() => handleSelectType(item.type)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon as any} size={32} color="#007AFF" />
            </View>
            <View style={styles.typeInfo}>
              <Text style={styles.typeName}>{item.name}</Text>
              <Text style={styles.typeDesc}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  typeInfo: {
    flex: 1,
  },
  typeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  typeDesc: {
    fontSize: 14,
    color: '#666',
  },
});

// ==========================================
// NAVIGATION FLOW SUMMARY
// ==========================================

/*
USER FLOWS:

1. Browse & Use Default Timer:
   Home (index) → Click timer type → Timer screen → Configure (optional)

2. Create Custom Timer:
   Home → "+" button → Create Timer Modal → Select type → Config screen → Save → Timer screen

3. Use Saved Timer:
   My Timers tab → Select timer → Timer screen (with saved config)

4. Edit Saved Timer:
   My Timers → Edit button → Config screen → Save

NAVIGATION EXAMPLES:

// Navigate to specific timer
router.push({ pathname: '/timer/[type]', params: { type: 'pomodoro' } });

// Navigate to config
router.push({ pathname: '/timer/config', params: { type: 'countdown' } });

// Open create modal
router.push('/create-timer');

// Go back
router.back();
*/
