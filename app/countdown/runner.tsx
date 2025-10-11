import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useAudioPlayer } from "expo-audio";

export default function CountDownRunner() {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [flash, setFlash] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { duration } = useLocalSearchParams<{ duration?: string }>();

  const player = useAudioPlayer(require("../../assets/beep.mp3"));

  // Start countdown
  useEffect(() => {
    const total = parseInt(duration || "0", 10);
    if (isNaN(total) || total <= 0) return;

    setSecondsLeft(total);

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev - 1;

        if (next > 0 && next <= 3) {
          playBeep();
          triggerFlash();
        }

        if (next <= 0) {
          cleanup();
          router.back();
          return 0;
        }

        return next;
      });
    }, 1000);

    return cleanup;
  }, [duration]);

  // ✅ Play beep
  const playBeep = async () => {
    if (!player) return;
    try {
      await player.seekTo(0); // restart audio
      await player.play();
    } catch (error) {
      console.error("Failed to play beep:", error);
    }
  };

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
  };

  const cleanup = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleCancel = () => {
    cleanup();
    router.back();
  };

  return (
    <View
      style={[
        styles.container,
        flash ? styles.flashBackground : styles.normalBackground,
      ]}
    >
      <Text style={styles.timerText}>{secondsLeft}s</Text>

      <Pressable
        style={({ pressed }) => [
          styles.cancelButton,
          pressed && styles.cancelPressed,
        ]}
        onPress={handleCancel}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  normalBackground: {
    backgroundColor: "#ffffff",
  },
  flashBackground: {
    backgroundColor: "#ffdddd",
  },
  timerText: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#2ecc71",
  },
  cancelButton: {
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "#e74c3c",
    borderRadius: 8,
  },
  cancelPressed: {
    backgroundColor: "#c0392b",
  },
  cancelText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
