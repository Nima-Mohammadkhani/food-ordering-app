<div align="center">

# 🍔 Food Ordering App 🍔

### *Online food ordering with seamless payment, delivery tracking and persistent cart*

[![React Native](https://img.shields.io/badge/React%20Native-0.79-61DAFB.svg?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53-000020.svg?style=for-the-badge&logo=expo)](https://expo.dev/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC.svg?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

</div>

## Features

**User Profile & Settings**
- Edit user information and change profile picture
- Settings panel with notifications, location, and language selection
- Secure logout with confirmation modal

**Shopping Experience**
- Browse home, categories, and product details
- Shopping cart with add/remove items and quantity management
- Active discount code system (use code `food` for 25% discount)
- Seamless payment flow with success notifications

**Order Tracking**
- Real-time delivery tracking on interactive map
- Driver location and route visualization
- Complete order summary display
- Live status updates for paid orders

**Data Persistence**
- Shopping cart preserved between app sessions
- Active orders maintained after app closure
- Reliable data storage with AsyncStorage

## Tech Stack

<div align="center">

![React Native](https://img.shields.io/badge/-React_Native_0.79-61DAFB?style=flat-square&logo=react&logoColor=white)
![React](https://img.shields.io/badge/-React_19-61DAFB?style=flat-square&logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/-Expo_53-000020?style=flat-square&logo=expo&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/-Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)
![React Redux](https://img.shields.io/badge/-React_Redux-764ABC?style=flat-square&logo=redux&logoColor=white)
![Redux Persist](https://img.shields.io/badge/-Redux_Persist-764ABC?style=flat-square&logo=redux&logoColor=white)

![NativeWind](https://img.shields.io/badge/-NativeWind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React Native Maps](https://img.shields.io/badge/-React_Native_Maps-4285F4?style=flat-square&logo=googlemaps&logoColor=white)
![Expo Image Picker](https://img.shields.io/badge/-Expo_Image_Picker-000020?style=flat-square&logo=expo&logoColor=white)
![Toast Message](https://img.shields.io/badge/-Toast_Message-00D084?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![AsyncStorage](https://img.shields.io/badge/-AsyncStorage-FFA500?style=flat-square&logo=react&logoColor=white)

</div>

## Project Structure

```
food-ordering-app/
├── app/
│   ├── _layout.tsx                 # Root navigator + PersistGate
│   ├── auth/                       # Login/register/onboarding
│   └── (tabs)/
│       ├── index.tsx              # Home screen
│       ├── cart/
│       │   ├── index.tsx          # Shopping cart + payment + discounts
│       │   └── map.tsx            # Order tracking map
│       ├── profile/
│       │   ├── index.tsx          # User profile
│       │   └── settings.tsx       # App settings
│       └── chat/ ...
├── components/                     # Reusable UI components
├── redux/
│   ├── slice/
│   │   ├── auth.ts                # Authentication state
│   │   └── product.ts             # Cart, orders, payment calculations
│   └── store.ts                   # Redux store + persistence config
├── type/                          # TypeScript definitions
└── assets/                        # Images, icons, fonts
```

## Quick Start

### Installation

```bash
# Install dependencies
pnpm install
# or
yarn install
# or 
npm install
```

### Development

```bash
# Start development server
npx expo start

# Platform specific
npx expo start --android    # Android
npx expo start --ios        # iOS  
npx expo start --web        # Web
```

### Production Preview

```bash
# Test production build
npx expo start --no-dev --minify
```

## Build with EAS

### 1. Configure app.json

```json
{
  "expo": {
    "android": { 
      "package": "com.yourcompany.foodapp" 
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.foodapp",
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "We use your location to show delivery progress.",
        "NSPhotoLibraryUsageDescription": "We use your photo for profile avatar."
      }
    }
  }
}
```

### 2. Add Google Maps API Keys

```json
{
  "expo": {
    "ios": { 
      "config": { 
        "googleMapsApiKey": "YOUR_IOS_API_KEY" 
      } 
    },
    "android": { 
      "config": { 
        "googleMaps": { 
          "apiKey": "YOUR_ANDROID_API_KEY" 
        } 
      } 
    }
  }
}
```

### 3. Setup eas.json

```json
{
  "cli": { "version": ">= 3.0.0" },
  "build": {
    "apk": { 
      "android": { "buildType": "apk" } 
    },
    "production": { 
      "android": { "gradleCommand": ":app:bundleRelease" } 
    }
  }
}
```

### Build Commands

```bash
# Login to EAS
npx eas login

# Build APK for direct download
npx eas build -p android --profile apk

# Build AAB for Play Store
npx eas build -p android --profile production

# Build for iOS App Store (requires Apple Developer account)
npx eas build -p ios --profile production
```

## Implementation Notes

**Persistent Shopping Cart**
- Uses `redux-persist` with AsyncStorage to store `productCartList` and `activeOrder`
- Cart contents and active orders survive app restarts

**Payment Flow**
- Clicking `Pay` creates an active order and displays success Toast
- Automatically navigates to delivery tracking map
- Paid items show "In Delivery" status with "View Status" button

**Discount System**
- Code `food` applies 25% discount
- Discount is applied in payment summary and visible on tracking map

**Order Status Management**
- Paid items display delivery status in cart
- Real-time tracking available through map interface

## Available Scripts

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

This project is for educational and demo purposes only. For commercial use, configure identifiers and service keys according to your organization.

---