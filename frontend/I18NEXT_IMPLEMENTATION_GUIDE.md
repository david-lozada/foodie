# i18next Implementation Guide for Foodie App

This guide provides a complete implementation of **react-i18next** with TypeScript support for your Expo React Native app.

## Step 1: Install Required Packages

```bash
pnpm add react-i18next i18next expo-localization
pnpm add @react-native-async-storage/async-storage
```

## Step 2: Create Translation Files

Create a `locales` folder structure:

```
foodie/
├── locales/
│   ├── en/
│   │   └── translation.json
│   ├── es/
│   │   └── translation.json
│   └── fr/
│       └── translation.json
```

### `locales/en/translation.json`

```json
{
  "login": {
    "title": "FOODIE",
    "subtitle": "Sign in to continue to Foodie",
    "username": "Username",
    "password": "Password",
    "forgotPassword": "Forgot Password?",
    "signIn": "Sign In",
    "orContinueWith": "or continue with",
    "dontHaveAccount": "Don't have an account?",
    "emailPlaceholder": "your.email@example.com",
    "passwordPlaceholder": "Enter your password",
    "show": "Show",
    "hide": "Hide"
  },
  "common": {
    "loading": "Loading...",
    "error": "An error occurred",
    "retry": "Retry",
    "cancel": "Cancel",
    "save": "Save"
  }
}
```

### `locales/es/translation.json`

```json
{
  "login": {
    "title": "FOODIE",
    "subtitle": "Inicia sesión para continuar a Foodie",
    "username": "Usuario",
    "password": "Contraseña",
    "forgotPassword": "¿Olvidaste tu contraseña?",
    "signIn": "Iniciar Sesión",
    "orContinueWith": "o continuar con",
    "dontHaveAccount": "¿No tienes una cuenta?",
    "emailPlaceholder": "tu.email@ejemplo.com",
    "passwordPlaceholder": "Ingresa tu contraseña",
    "show": "Mostrar",
    "hide": "Ocultar"
  },
  "common": {
    "loading": "Cargando...",
    "error": "Ocurrió un error",
    "retry": "Reintentar",
    "cancel": "Cancelar",
    "save": "Guardar"
  }
}
```

### `locales/fr/translation.json`

```json
{
  "login": {
    "title": "FOODIE",
    "subtitle": "Connectez-vous pour continuer vers Foodie",
    "username": "Nom d'utilisateur",
    "password": "Mot de passe",
    "forgotPassword": "Mot de passe oublié?",
    "signIn": "Se connecter",
    "orContinueWith": "ou continuer avec",
    "dontHaveAccount": "Vous n'avez pas de compte?",
    "emailPlaceholder": "votre.email@exemple.com",
    "passwordPlaceholder": "Entrez votre mot de passe",
    "show": "Afficher",
    "hide": "Masquer"
  },
  "common": {
    "loading": "Chargement...",
    "error": "Une erreur s'est produite",
    "retry": "Réessayer",
    "cancel": "Annuler",
    "save": "Enregistrer"
  }
}
```

## Step 3: Create i18n Configuration

Create `i18n/config.ts`:

```typescript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import translation files
import en from "../locales/en/translation.json";
import es from "../locales/es/translation.json";
import fr from "../locales/fr/translation.json";

const LANGUAGE_STORAGE_KEY = "user_language";

// Language detector plugin
const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      // Try to get saved language from AsyncStorage
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }

      // Fall back to device language
      const deviceLanguage = Localization.locale.split("-")[0];
      callback(deviceLanguage);
    } catch (error) {
      console.error("Error detecting language:", error);
      callback("en"); // Fallback to English
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      console.error("Error caching language:", error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3", // Important for React Native
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Important for React Native
    },
  });

export default i18n;
```

## Step 4: Create TypeScript Declarations (Optional but Recommended)

Create `i18n/types.ts`:

```typescript
import "react-i18next";
import en from "../locales/en/translation.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof en;
    };
  }
}
```

This provides full TypeScript autocomplete for your translation keys!

## Step 5: Initialize i18n in Your App

Update `app/_layout.tsx`:

```typescript
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import '../i18n/config'; // Import i18n configuration

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
    </Stack>
  );
}
```

## Step 6: Update Login Component

Update `app/Login.tsx`:

```typescript
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function Login() {
  const router = useRouter();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleLogin = () => {
    console.log("🔐 Login attempt:", { email, password: "***" });
    router.push("/");
  };

  const handleSignUp = () => {
    console.log("📝 Navigate to sign up");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="flex-1 bg-gradient-to-b from-primary-100 to-primary-200"
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header Section */}
          <View className="mb-12">
            <Text className="text-5xl font-bold text-gray-800 mb-2">
              {t('login.title')}
            </Text>
            <Text className="text-lg text-gray-600">
              {t('login.subtitle')}
            </Text>
          </View>

          {/* Form Section */}
          <View className="space-y-5">
            {/* Email Input */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">
                {t('login.username')}
              </Text>
              <View
                className={`bg-white rounded-2xl px-5 py-4 shadow-sm border-2 ${
                  focusedInput === "email"
                    ? "border-secondary-200"
                    : "border-transparent"
                }`}
              >
                <TextInput
                  placeholder={t('login.emailPlaceholder')}
                  placeholderTextColor="#9ca3af"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  className="text-base text-gray-800"
                />
              </View>
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">
                {t('login.password')}
              </Text>
              <View
                className={`bg-white rounded-2xl px-5 py-4 shadow-sm border-2 flex-row items-center ${
                  focusedInput === "password"
                    ? "border-secondary-200"
                    : "border-transparent"
                }`}
              >
                <TextInput
                  placeholder={t('login.passwordPlaceholder')}
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoComplete="password"
                  className="flex-1 text-base text-gray-800"
                />
                <Pressable
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="ml-2"
                >
                  {({ pressed }) => (
                    <Text
                      className={`text-sm font-medium ${pressed ? "text-gray-700" : "text-gray-500"}`}
                    >
                      {isPasswordVisible ? t('login.hide') : t('login.show')}
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>

            {/* Forgot Password */}
            <Pressable className="self-end">
              {({ pressed }) => (
                <Text
                  className={`font-semibold text-sm ${pressed ? "text-secondary-100" : "text-secondary-200"}`}
                >
                  {t('login.forgotPassword')}
                </Text>
              )}
            </Pressable>

            {/* Login Button */}
            <Pressable onPress={handleLogin} className="shadow-lg mt-4">
              {({ pressed }) => (
                <View
                  className={`rounded-2xl py-4 ${pressed ? "bg-secondary-100" : "bg-secondary-200"}`}
                >
                  <Text className="text-white text-center font-bold text-lg">
                    {t('login.signIn')}
                  </Text>
                </View>
              )}
            </Pressable>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-gray-500 font-medium">
                {t('login.orContinueWith')}
              </Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Social Login Buttons */}
            <View className="flex-row gap-4">
              <Pressable className="flex-1">
                {({ pressed }) => (
                  <View
                    className={`bg-white rounded-2xl py-4 shadow-sm border border-gray-200 ${pressed ? "opacity-70" : "opacity-100"}`}
                  >
                    <Text className="text-center font-semibold text-gray-700">
                      🍎 Apple
                    </Text>
                  </View>
                )}
              </Pressable>
              <Pressable className="flex-1">
                {({ pressed }) => (
                  <View
                    className={`bg-white rounded-2xl py-4 shadow-sm border border-gray-200 ${pressed ? "opacity-70" : "opacity-100"}`}
                  >
                    <Text className="text-center font-semibold text-gray-700">
                      🔍 Google
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-600 text-base">
              {t('login.dontHaveAccount')}{" "}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
```

## Step 7: Create Language Selector Component

Create `components/LanguageSelector.tsx`:

```typescript
import { View, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', label: '🇺🇸 English', name: 'English' },
  { code: 'es', label: '🇪🇸 Español', name: 'Spanish' },
  { code: 'fr', label: '🇫🇷 Français', name: 'French' },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = async (languageCode: string) => {
    await i18n.changeLanguage(languageCode);
  };

  return (
    <View className="p-4">
      <Text className="text-lg font-bold text-gray-800 mb-4">
        Select Language
      </Text>
      <View className="gap-3">
        {LANGUAGES.map((lang) => (
          <Pressable
            key={lang.code}
            onPress={() => changeLanguage(lang.code)}
            className={`px-4 py-3 rounded-xl border-2 ${
              i18n.language === lang.code
                ? 'bg-secondary-200 border-secondary-200'
                : 'bg-white border-gray-200'
            }`}
          >
            {({ pressed }) => (
              <View className="flex-row items-center justify-between">
                <Text
                  className={`text-base font-semibold ${
                    i18n.language === lang.code
                      ? 'text-white'
                      : pressed
                      ? 'text-gray-600'
                      : 'text-gray-700'
                  }`}
                >
                  {lang.label}
                </Text>
                {i18n.language === lang.code && (
                  <Text className="text-white text-lg">✓</Text>
                )}
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}
```

## Usage Examples

### Basic Translation

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return <Text>{t('login.title')}</Text>;
}
```

### Translation with Interpolation

**Translation file:**

```json
{
  "welcome": "Welcome, {{name}}!",
  "itemCount": "You have {{count}} items"
}
```

**Component:**

```typescript
<Text>{t('welcome', { name: 'John' })}</Text>
<Text>{t('itemCount', { count: 5 })}</Text>
```

### Pluralization

**Translation file:**

```json
{
  "items": "{{count}} item",
  "items_other": "{{count}} items"
}
```

**Component:**

```typescript
<Text>{t('items', { count: 1 })}</Text> // "1 item"
<Text>{t('items', { count: 5 })}</Text> // "5 items"
```

### Change Language

```typescript
import { useTranslation } from 'react-i18next';

function LanguageButton() {
  const { i18n } = useTranslation();

  const switchToSpanish = async () => {
    await i18n.changeLanguage('es');
  };

  return <Button onPress={switchToSpanish} title="Español" />;
}
```

### Get Current Language

```typescript
const { i18n } = useTranslation();
console.log(i18n.language); // 'en', 'es', 'fr', etc.
```

## Key Features of i18next

✅ **Type-safe translations** - Full TypeScript autocomplete  
✅ **Pluralization** - Automatic plural forms  
✅ **Interpolation** - Dynamic values in translations  
✅ **Namespaces** - Organize translations by feature  
✅ **Language detection** - Automatic device language detection  
✅ **Persistent storage** - Saves user's language preference  
✅ **Fallback language** - Falls back to English if translation missing  
✅ **React Native optimized** - Works perfectly with Expo

## File Structure After Implementation

```
foodie/
├── app/
│   ├── _layout.tsx (imports i18n config)
│   └── Login.tsx (using useTranslation)
├── components/
│   └── LanguageSelector.tsx
├── i18n/
│   ├── config.ts
│   └── types.ts (TypeScript declarations)
├── locales/
│   ├── en/
│   │   └── translation.json
│   ├── es/
│   │   └── translation.json
│   └── fr/
│       └── translation.json
└── package.json
```

## Testing the Implementation

1. **Install packages:**

   ```bash
   pnpm install
   ```

2. **Start the app:**

   ```bash
   pnpm start
   ```

3. **Test language switching:**
   - Add the `LanguageSelector` component to a screen
   - Click different languages and see the UI update
   - Close and reopen the app - your language choice should persist

## Additional Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [expo-localization Documentation](https://docs.expo.dev/versions/latest/sdk/localization/)
- [TypeScript Support](https://react.i18next.com/latest/typescript)
