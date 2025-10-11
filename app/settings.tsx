/*
Settings screen
- Render the settings on the screen
- Edit the setting and save it back to Firestore
*/
import React from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ScreenView from "@/components/ScreenView";

export default function SettingsScreen() {
  return (
    <ScreenView>
      <ThemeSwitcher />
    </ScreenView>
  );
}
