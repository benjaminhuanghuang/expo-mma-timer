# React query

```ts
const queryClient = useQueryClient();
  const [selectedTheme, setSelectedTheme] = useState<
    "light" | "dark" | "system"
  >("system");

  const {
    data: settings,
    isLoading,
    error,
  } = useQuery<Settings | null>({
    queryKey: ["settings"],
    queryFn: loadSettings,
  });

  const mutation = useMutation({
    mutationFn: ({
      id,
      theme,
    }: {
      id: string;
      theme: "light" | "dark" | "system";
    }) => updateSettings(id, { theme }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      Alert.alert("Success", "Settings have been updated.");
    },
    onError: (err: any) => {
      Alert.alert("Error", `Failed to update settings: ${err.message}`);
    },
  });
  ```
