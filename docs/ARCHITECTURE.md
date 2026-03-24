# Sticker Master - Arquitectura del Sistema

## 1. Stack Tecnológico

| Tecnología | Versión | Justificación |
|---|---|---|
| React Native | 0.73+ | Framework cross-platform, rendimiento nativo |
| TypeScript | 5.3+ | Tipado estricto, mejora mantenibilidad |
| Expo | SDK 50+ | Toolchain, Share Extension, acceso a galería |
| expo-av | latest | Reproducción de video y extracción de frames |
| expo-media-library | latest | Guardar stickers en galería del dispositivo |
| expo-sharing | latest | Share sheet nativo para compartir stickers |
| expo-file-system | latest | Gestión de archivos locales (stickers) |
| expo-haptics | latest | Feedback háptico en acciones importantes |
| react-native-gesture-handler | latest | Detección de gestos de dibujo (pan gesture) |
| react-native-svg | latest | Renderizar path de dibujo en tiempo real |
| @shopify/react-native-skia | latest | Canvas para recorte con máscara y export PNG |
| @react-navigation/native | 6+ | Navegación entre pantallas |
| async-storage | latest | Persistencia del historial de stickers |
| jest | latest | Testing framework |

## 2. Arquitectura: Clean Architecture

```
┌──────────────────────────────────────────────┐
│                 Presentation                  │
│  (Screens, Components, Hooks, Navigation)     │
├──────────────────────────────────────────────┤
│                   Domain                      │
│  (Use Cases, Entities, Repository Interfaces) │
├──────────────────────────────────────────────┤
│               Infrastructure                  │
│  (Repository Implementations, Services)       │
└──────────────────────────────────────────────┘
```

### Capas

- **Presentation**: Screens, componentes UI, custom hooks, navegación. Solo conoce Domain.
- **Domain**: Entidades, interfaces de repositorios, use cases (lógica de negocio pura). No conoce ninguna otra capa.
- **Infrastructure**: Implementaciones de repositorios, servicios nativos (cámara, galería, filesystem). Conoce Domain.

### Regla de Dependencia

Las dependencias solo apuntan hacia adentro: Presentation → Domain ← Infrastructure

## 3. Estructura de Carpetas

```
src/
├── domain/
│   ├── entities/
│   │   └── Sticker.ts              # Entidad Sticker
│   ├── repositories/
│   │   ├── StickerRepository.ts     # Interface del repositorio de stickers
│   │   └── MediaRepository.ts      # Interface del repositorio de media
│   └── usecases/
│       ├── ExtractFrameUseCase.ts   # Extraer frame de video
│       ├── CropImageUseCase.ts      # Recortar imagen con path
│       ├── SaveStickerUseCase.ts    # Guardar sticker
│       ├── GetStickersUseCase.ts    # Obtener historial
│       ├── DeleteStickerUseCase.ts  # Eliminar sticker
│       └── ShareStickerUseCase.ts   # Compartir sticker
│
├── infrastructure/
│   ├── repositories/
│   │   ├── ExpoStickerRepository.ts # Implementación con Expo FileSystem
│   │   └── ExpoMediaRepository.ts   # Implementación con Expo AV/MediaLibrary
│   └── services/
│       ├── ImageProcessingService.ts # Recorte con Skia
│       └── HapticsService.ts        # Feedback háptico
│
├── presentation/
│   ├── navigation/
│   │   └── AppNavigator.tsx         # Stack navigator
│   ├── screens/
│   │   ├── HomeScreen.tsx           # Pantalla principal
│   │   ├── EditorScreen.tsx         # Editor de dibujo
│   │   └── PreviewScreen.tsx        # Preview del sticker
│   ├── components/
│   │   ├── DrawingCanvas.tsx        # Canvas de dibujo con gestos
│   │   ├── StickerGrid.tsx          # Grilla de historial
│   │   ├── StickerCard.tsx          # Card individual de sticker
│   │   ├── TransparencyGrid.tsx     # Fondo cuadrícula de transparencia
│   │   ├── InstructionsCard.tsx     # Instrucciones de uso
│   │   └── ActionButton.tsx         # Botón reutilizable
│   ├── hooks/
│   │   ├── useDrawing.ts            # Lógica de dibujo
│   │   ├── useStickers.ts           # CRUD de stickers
│   │   └── useShareIntent.ts        # Recibir video compartido
│   └── theme/
│       └── theme.ts                 # Colores, espaciado, tipografía
│
├── di/
│   └── container.ts                 # Dependency injection container
│
└── App.tsx                          # Entry point
```

## 4. Interfaces / Tipos Principales

### Entidades

```typescript
// domain/entities/Sticker.ts
interface Sticker {
  id: string;
  uri: string;           // Path al archivo PNG
  thumbnailUri: string;   // Path a la miniatura
  createdAt: Date;
  width: number;
  height: number;
}

// Tipos auxiliares
interface Point {
  x: number;
  y: number;
}

interface DrawingPath {
  points: Point[];
  isClosed: boolean;
}

interface FrameData {
  uri: string;
  width: number;
  height: number;
}
```

### Interfaces de Repositorios

```typescript
// domain/repositories/StickerRepository.ts
interface StickerRepository {
  save(imageUri: string): Promise<Sticker>;
  getAll(): Promise<Sticker[]>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Sticker | null>;
}

// domain/repositories/MediaRepository.ts
interface MediaRepository {
  extractFrame(videoUri: string): Promise<FrameData>;
  saveToGallery(stickerUri: string): Promise<string>;
  shareSticker(stickerUri: string): Promise<void>;
}
```

### Use Cases

```typescript
// Cada use case sigue este patrón:
interface UseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}
```

## 5. Patrones de Diseño

| Patrón | Uso |
|---|---|
| **Repository Pattern** | Abstracción de acceso a datos (stickers, media) |
| **Use Case Pattern** | Encapsular lógica de negocio en unidades independientes |
| **Dependency Injection** | Inyectar repositorios en use cases, facilitar testing |
| **Observer (hooks)** | React hooks como observers del estado de la UI |
| **Strategy** | Diferentes implementaciones de procesamiento de imagen |
| **Facade** | DI container como fachada para crear instancias |

## 6. Flujo de Datos

```
Share Extension (TikTok)
    │
    ▼
useShareIntent hook → ExtractFrameUseCase → MediaRepository.extractFrame()
    │
    ▼
EditorScreen (DrawingCanvas)
    │ useDrawing hook (gestiona puntos del path)
    ▼
CropImageUseCase → ImageProcessingService.crop(frameUri, path)
    │
    ▼
PreviewScreen
    │
    ├─ [Cancelar] → vuelve a EditorScreen
    │
    └─ [Listo] → SaveStickerUseCase → StickerRepository.save()
                                     → MediaRepository.saveToGallery()
         │
         └─ [Compartir] → ShareStickerUseCase → MediaRepository.shareSticker()
```

## 7. Navegación

```
Stack Navigator
├── HomeScreen (default cuando se abre directamente)
├── EditorScreen (cuando se recibe video via Share Extension)
└── PreviewScreen (después de recortar)
```

## 8. Theme / Design System

```typescript
const theme = {
  colors: {
    background: '#000000',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',
    primary: '#FF0050',      // Rosa TikTok
    secondary: '#00F2EA',    // Cyan TikTok
    text: '#FFFFFF',
    textSecondary: '#888888',
    error: '#FF4444',
    success: '#00CC66',
    transparencyGrid: ['#333333', '#444444'],
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
};
```

## 9. Decisiones Técnicas (ADRs)

### ADR-01: Skia para procesamiento de imagen
**Decisión**: Usar `@shopify/react-native-skia` para el recorte de imagen con máscara.
**Razón**: Rendimiento nativo, soporte de paths complejos, export directo a PNG con alpha channel. Alternativas como Canvas puro o react-native-canvas tienen limitaciones de rendimiento.

### ADR-02: SVG para el dibujo en tiempo real
**Decisión**: Usar `react-native-svg` para renderizar el path mientras el usuario dibuja.
**Razón**: Rendimiento fluido para actualización continua del path, integración nativa con el sistema de gestos.

### ADR-03: Expo para Share Extension
**Decisión**: Usar Expo con expo-sharing y expo-intent-launcher.
**Razón**: Simplifica la configuración de Share Extension en ambas plataformas. En iOS requiere configuración adicional del app group.

### ADR-04: AsyncStorage para historial
**Decisión**: Usar `@react-native-async-storage/async-storage` para persistir metadata de stickers.
**Razón**: Ligero, suficiente para el volumen de datos del historial. Los archivos PNG se almacenan en el filesystem.
