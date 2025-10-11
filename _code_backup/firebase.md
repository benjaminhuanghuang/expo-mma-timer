# Firebase

```js
// Monitor auth state
useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUserId(user?.uid || null);
});
return unsubscribe;
}, []);

const loadThemeFromFirebase = (uid: string) => {
    const userSettingsRef = doc(
      firestoreDb,
      "users",
      uid,
      "settings",
      "preferences"
    );

    const unsubscribe = onSnapshot(
      userSettingsRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const savedTheme = data.themeMode as ThemeMode;
          if (savedTheme) {
            setThemeModeState(savedTheme);
          }
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("Failed to load theme from Firebase:", error);
        // Fallback to local storage on error
        loadThemeFromLocal();
      }
    );

    return unsubscribe;
  };

```
