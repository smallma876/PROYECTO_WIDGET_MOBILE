# STICKER MASTER - Especificación de Producto

> **Convierte cualquier momento de TikTok en sticker**

---

## 1. QUÉ ES STICKER MASTER

Una app móvil que permite a los usuarios crear stickers personalizados a partir de videos de TikTok. El usuario comparte un video desde TikTok, selecciona el frame exacto que quiere, dibuja con el dedo alrededor del área deseada, y obtiene un sticker PNG con fondo transparente listo para usar en WhatsApp, iMessage u otras apps.

---

## 2. PLATAFORMAS

- iOS
- Android

---

## 3. STACK TÉCNICO

| Tecnología   | Propósito                                    |
| ------------ | -------------------------------------------- |
| React Native | Framework mobile cross-platform              |
| TypeScript   | Tipado estático                              |
| Expo         | Toolchain, Share Extension, acceso a galería |

### Dependencias sugeridas (Claude Code decide la implementación)

- Video: reproducción y extracción de frames
- Gestos: detección de dibujo con el dedo
- Canvas/Gráficos: renderizar el path y aplicar máscara
- Storage: guardar stickers localmente
- Sharing: compartir a otras apps

---

## 4. ARQUITECTURA Y PRINCIPIOS

- **Clean Architecture**: separar presentación, lógica de negocio e infraestructura
- **Principios SOLID**: código mantenible y testeable
- **Dependency Injection**: para facilitar testing
- **Tests unitarios**: cobertura mínima 70% en lógica de negocio

---

## 5. USER FLOW

### Flujo principal

1. Usuario está en TikTok viendo un video
2. Pausa el video en el momento que quiere capturar
3. Toca "Compartir" → selecciona "Sticker Master"
4. La app abre mostrando el frame del video
5. Usuario dibuja con el dedo alrededor del área que quiere recortar
6. Aparece preview del sticker con fondo transparente
7. Dos opciones:
   - **[Cancelar]**: vuelve al inicio, descarta el sticker
   - **[Listo]**: guarda el sticker en la galería
8. Opción de compartir inmediatamente a WhatsApp/iMessage/otras apps

### Flujo alternativo (sin video compartido)

1. Usuario abre la app directamente
2. Ve pantalla de inicio con instrucciones de cómo usar
3. Puede ver historial de stickers creados anteriormente

---

## 6. PANTALLAS

### 6.1 Home Screen

- Instrucciones de uso (cómo compartir desde TikTok)
- Historial de stickers creados (si existen)
- Cada sticker del historial se puede compartir o eliminar

### 6.2 Editor Screen

- Muestra el frame del video recibido
- El usuario dibuja con el dedo el contorno del área
- La línea dibujada debe ser visible mientras dibuja
- Al soltar el dedo, el path se cierra automáticamente
- Botón para reiniciar el dibujo si se equivoca

### 6.3 Preview Screen

- Muestra el sticker recortado sobre fondo de cuadrícula (indica transparencia)
- Botón **[Cancelar]**: vuelve al editor
- Botón **[Listo]**: guarda y muestra opciones de compartir

---

## 7. FUNCIONALIDADES MVP

### Must Have (P0)

- Recibir video compartido desde TikTok via Share Extension
- Mostrar el frame del video compartido
- Dibujar contorno con el dedo sobre la imagen
- Recortar la imagen según el path dibujado
- Generar PNG con fondo transparente
- Guardar sticker en la galería del dispositivo
- Compartir sticker a otras apps (WhatsApp, iMessage, etc.)

### Should Have (P1)

- Historial de stickers creados
- Eliminar stickers del historial
- UI en dark mode

### Nice to Have (P2 - Post MVP)

- Límite de stickers gratis por día (modelo freemium)
- Auto-remove background con IA
- Agregar texto al sticker
- Export como WhatsApp Sticker Pack

---

## 8. ESPECIFICACIONES TÉCNICAS

### Share Extension

- La app debe registrarse para recibir videos compartidos
- Debe funcionar cuando el usuario comparte desde TikTok u otras apps de video
- El video compartido debe procesarse para extraer el frame actual

### Dibujo con el dedo

- Detectar el gesto de arrastre (pan gesture)
- Acumular los puntos del recorrido del dedo
- Mostrar visualmente la línea mientras dibuja
- Al soltar, conectar el último punto con el primero (cerrar el path)

### Recorte de imagen

- Usar el path dibujado como máscara
- El área dentro del path se conserva
- El área fuera del path se vuelve transparente
- Exportar como PNG con canal alpha

### Almacenamiento

- Guardar stickers en la galería del dispositivo
- Mantener un historial local de stickers creados
- Permitir eliminar del historial

---

## 9. DISEÑO UI/UX

### Estilo visual

- Dark mode por defecto (consistente con TikTok)
- Colores de acento: rosa (#FF0050) y cyan (#00F2EA) - paleta TikTok
- Interfaz minimalista y gestual
- Feedback háptico en acciones importantes

### Principios UX

- Mínimos pasos para crear un sticker
- El dibujo debe sentirse fluido y responsivo
- Preview claro de lo que se va a guardar
- Fácil acceso a compartir

---

## 10. CRITERIOS DE ACEPTACIÓN

### El MVP está completo cuando:

1. **Share Extension funciona**: Al compartir un video desde TikTok, la app se abre con el frame
2. **Dibujo funciona**: El usuario puede dibujar con el dedo y ve la línea en tiempo real
3. **Recorte funciona**: El área dibujada se recorta correctamente con fondo transparente
4. **Guardar funciona**: El sticker se guarda en la galería del dispositivo
5. **Compartir funciona**: El usuario puede enviar el sticker a WhatsApp u otras apps
6. **Tests existen**: Cobertura mínima de 70% en la lógica de negocio
7. **Código limpio**: TypeScript estricto, sin `any`, principios SOLID aplicados

---

## 11. INSTRUCCIONES PARA DESARROLLO

### Flujo de trabajo con roles

Usar el archivo CLAUDE.md que define los siguientes roles:

| Orden | Comando | Rol           | Qué hace                                              |
| ----- | ------- | ------------- | ----------------------------------------------------- |
| 1     | /ceo    | Product Owner | Analiza esta ficha y genera User Stories priorizadas  |
| 2     | /arch   | Arquitecto    | Diseña la estructura del proyecto y define interfaces |
| 3     | /dev    | Programador   | Implementa el código                                  |
| 4     | /test   | QA            | Crea los tests                                        |
| 5     | /review | Reviewer      | Revisa calidad del código                             |
| 6     | /devops | DevOps        | Configura build y CI/CD                               |

### Primer comando

```
/ceo Lee STICKER_MASTER_FICHA_TECNICA.md y genera las User Stories priorizadas con criterios de aceptación para el MVP
```

### Notas importantes

- Esta ficha es la especificación de QUÉ construir
- Claude Code decide CÓMO implementarlo
- El código debe seguir Clean Architecture y SOLID
- Los tests son obligatorios
