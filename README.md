<div align="center">

# Food Ordering App 🍔📦

Online food ordering with payment, delivery tracking on map, user profile and persistent shopping cart.

</div>

## Features

- User Profile: Edit information, change profile picture, logout with confirmation modal
- Settings: Notifications, location, language selection with Bottom Sheet
- Home, categories, product details
- Shopping Cart:
  - Add/remove, delete items
  - Active discount code (code: `food` with 25% discount)
  - Payment with success Toast and order creation
  - Paid items in cart become "in delivery" status and are trackable
- Delivery tracking on map: Display driver, route and order summary
- Data Persistence: Shopping cart and active order are preserved after closing the app

## Technologies and Libraries

- React Native 0.79 + React 19
- Expo 53 and Expo Router (file-based routing)
- Redux Toolkit + React Redux
- Redux Persist (AsyncStorage) for persisting cart and orders
- NativeWind (Tailwind CSS) for styling
- react-native-maps for maps and markers
- expo-image-picker for profile picture selection
- react-native-toast-message for Toast notifications

## Folder Structure

```
food-ordering-app/
├─ app/
│  ├─ _layout.tsx                 # Root navigator + PersistGate
│  ├─ auth/                       # Login/register/onboarding
│  └─ (tabs)/
│     ├─ index.tsx               # Home
│     ├─ cart/
│     │  ├─ index.tsx            # Shopping cart + payment + discount code
│     │  └─ map.tsx              # Order tracking map
│     ├─ profile/
│     │  ├─ index.tsx            # Profile
│     │  └─ settings.tsx         # Settings inside profile
│     └─ chat/ ...
├─ components/                    # UI components
├─ redux/
│  ├─ slice/
│  │  ├─ auth.ts
│  │  └─ product.ts              # Cart, active order, payment calculations
│  └─ store.ts                   # Store configuration + Persist
├─ type/                          # TypeScript types
└─ assets/ ...
```

## Installation and Run

```bash
pnpm i # or yarn / npm
npx expo start
```

## Production Preview

To run close to production mode:

```bash
npx expo start --no-dev --minify
```

## Build with EAS

1) Complete `app.json` with identifiers and permissions:

```json
{
  "expo": {
    "android": { "package": "com.yourco.foodapp" },
    "ios": {
      "bundleIdentifier": "com.yourco.foodapp",
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "We use your location to show delivery progress.",
        "NSPhotoLibraryUsageDescription": "We use your photo for profile avatar."
      }
    }
  }
}
```

2) If using Google Maps API, add the keys:

```json
{
  "expo": {
    "ios": { "config": { "googleMapsApiKey": "YOUR_IOS_KEY" } },
    "android": { "config": { "googleMaps": { "apiKey": "YOUR_ANDROID_KEY" } } }
  }
}
```

3) Create `eas.json` (example):

```json
{
  "cli": { "version": ">= 3.0.0" },
  "build": {
    "apk": { "android": { "buildType": "apk" } },
    "production": { "android": { "gradleCommand": ":app:bundleRelease" } }
  }
}
```

4) Build:

```bash
npx eas login
npx eas build -p android --profile apk       # Create APK for direct download
npx eas build -p android --profile production # AAB for Play Store
npx eas build -p ios --profile production     # Requires Apple account
```

## Implementation Notes

- Persistent Shopping Cart: With `redux-persist`, `productCartList` and `activeOrder` fields are stored.
- Payment: Clicking `Pay` creates an active order, displays success Toast and navigates to map.
- Discount Code: Code `food` applies 25% discount and is considered in payment summary and map.
- Paid Items: Shown in cart with "in delivery" status and have "View Status" button.

## Scripts

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "expo lint"
  }
}
```

## License

This project is for educational/product demo purposes only. For commercial use, configure identifiers and service keys according to your organization.
