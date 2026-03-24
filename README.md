# Sticker Master

> Turn any TikTok moment into a sticker

A mobile app that lets users create custom stickers from TikTok videos. Share a video from TikTok, draw around what you want, and get a transparent PNG sticker ready to share on WhatsApp, iMessage, or any messaging app.

## Stack

- **React Native** + **Expo** (SDK 50)
- **TypeScript** (strict mode)
- **@shopify/react-native-skia** for image cropping
- **react-native-svg** + **gesture-handler** for drawing
- Clean Architecture (Domain / Infrastructure / Presentation)

## Setup

```bash
# Install dependencies
npm install

# Start Expo dev server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## Project Structure

```
src/
├── domain/          # Entities, use cases, repository interfaces
├── infrastructure/  # Expo implementations of repositories/services
├── presentation/    # Screens, components, hooks, navigation, theme
└── di/              # Dependency injection container
```

## CI/CD

GitHub Actions runs on every push/PR to `main`:
- TypeScript type checking
- Unit tests with 70% coverage threshold
