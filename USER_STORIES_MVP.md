# Sticker Master - User Stories MVP

> Generado por el rol CEO/Product Owner basado en `STICKER_MASTER_FICHA_TECNICA.md`

---

## Resumen del Producto

**Problema**: Los usuarios de TikTok quieren convertir momentos específicos de videos en stickers para compartir en WhatsApp, iMessage y otras apps de mensajería, pero no existe una forma rápida y sencilla de hacerlo.

**Solución**: Sticker Master permite recibir un video desde TikTok via Share Extension, seleccionar el frame, dibujar con el dedo el área deseada y obtener un sticker PNG con fondo transparente listo para compartir.

---

## Épicas

| ID    | Épica                    | Prioridad |
| ----- | ------------------------ | --------- |
| EP-01 | Share Extension          | P0        |
| EP-02 | Editor de Stickers       | P0        |
| EP-03 | Preview y Exportación    | P0        |
| EP-04 | Compartir Sticker        | P0        |
| EP-05 | Home Screen              | P1        |
| EP-06 | Historial de Stickers    | P1        |

---

## User Stories - P0 (Must Have MVP)

### EP-01: Share Extension

#### US-01: Recibir video desde TikTok

**Como** usuario de TikTok,
**quiero** compartir un video desde TikTok hacia Sticker Master,
**para** poder crear un sticker a partir de ese video.

**Criterios de aceptación:**

1. La app aparece en el menú "Compartir" de TikTok (y otras apps de video)
2. Al seleccionar Sticker Master, la app se abre automáticamente
3. El video compartido se recibe y se procesa correctamente
4. Si el formato del video no es compatible, se muestra un mensaje de error claro
5. Funciona tanto en iOS como en Android

---

#### US-02: Extraer frame del video compartido

**Como** usuario,
**quiero** que la app extraiga automáticamente el frame actual del video compartido,
**para** ver la imagen sobre la que voy a dibujar el sticker.

**Criterios de aceptación:**

1. Se extrae el primer frame del video compartido como imagen
2. La imagen se muestra en pantalla completa manteniendo la relación de aspecto
3. La extracción ocurre en menos de 3 segundos
4. Se muestra un indicador de carga mientras se procesa
5. Si la extracción falla, se muestra un mensaje de error con opción de reintentar

---

### EP-02: Editor de Stickers

#### US-03: Dibujar contorno con el dedo

**Como** usuario,
**quiero** dibujar con mi dedo alrededor del área de la imagen que quiero convertir en sticker,
**para** seleccionar exactamente la parte que me interesa.

**Criterios de aceptación:**

1. Al tocar la pantalla y arrastrar, se dibuja una línea visible siguiendo el recorrido del dedo
2. La línea se renderiza en tiempo real sin lag perceptible
3. La línea es claramente visible sobre cualquier fondo de imagen (color contrastante o borde)
4. Al levantar el dedo, el path se cierra automáticamente conectando el último punto con el primero
5. El trazo es suave (interpolación de puntos) para un resultado limpio

---

#### US-04: Reiniciar dibujo

**Como** usuario,
**quiero** poder borrar mi dibujo y empezar de nuevo,
**para** corregir errores si no quedó como quería.

**Criterios de aceptación:**

1. Existe un botón visible de "Reiniciar" o "Borrar" en la pantalla del editor
2. Al presionar, se elimina el path dibujado y se muestra la imagen limpia
3. Se puede dibujar un nuevo contorno inmediatamente después de reiniciar
4. Feedback háptico al presionar el botón

---

#### US-05: Recortar imagen según el path dibujado

**Como** usuario,
**quiero** que la app recorte la imagen siguiendo exactamente el contorno que dibujé,
**para** obtener solo la parte que seleccioné.

**Criterios de aceptación:**

1. El área dentro del path dibujado se conserva como imagen
2. El área fuera del path se vuelve completamente transparente (canal alpha)
3. El recorte respeta fielmente el path dibujado por el usuario
4. El resultado se genera en formato PNG con fondo transparente
5. El procesamiento ocurre en menos de 2 segundos

---

### EP-03: Preview y Exportación

#### US-06: Previsualizar sticker recortado

**Como** usuario,
**quiero** ver cómo quedó mi sticker antes de guardarlo,
**para** decidir si estoy satisfecho con el resultado.

**Criterios de aceptación:**

1. Se muestra el sticker recortado sobre un fondo de cuadrícula (patrón de transparencia)
2. El sticker se muestra centrado y a un tamaño que permita ver los detalles
3. Existe un botón **[Cancelar]** que vuelve al editor con la imagen original
4. Existe un botón **[Listo]** que procede a guardar el sticker
5. La transición entre pantallas es fluida

---

#### US-07: Guardar sticker en la galería

**Como** usuario,
**quiero** guardar mi sticker en la galería de fotos de mi dispositivo,
**para** tenerlo disponible y poder usarlo cuando quiera.

**Criterios de aceptación:**

1. Al presionar **[Listo]**, el sticker PNG se guarda en la galería del dispositivo
2. Se solicita permiso de acceso a la galería si es la primera vez
3. Se muestra confirmación visual de que el guardado fue exitoso
4. El archivo guardado es un PNG con transparencia funcional
5. Si el guardado falla (sin permisos, sin espacio), se muestra un error claro

---

### EP-04: Compartir Sticker

#### US-08: Compartir sticker a otras apps

**Como** usuario,
**quiero** compartir mi sticker directamente a WhatsApp, iMessage u otras apps,
**para** enviarlo rápidamente sin tener que buscar el archivo manualmente.

**Criterios de aceptación:**

1. Después de guardar, se muestra la opción de compartir (share sheet nativo)
2. El sticker se comparte como imagen PNG con transparencia
3. Funciona con WhatsApp, iMessage y otras apps que acepten imágenes
4. El usuario puede elegir no compartir y simplemente cerrar
5. Después de compartir (o cancelar), se vuelve a la pantalla principal

---

## User Stories - P1 (Should Have)

### EP-05: Home Screen

#### US-09: Pantalla de inicio con instrucciones

**Como** usuario nuevo,
**quiero** ver instrucciones claras de cómo usar la app al abrirla,
**para** entender que debo compartir un video desde TikTok.

**Criterios de aceptación:**

1. Al abrir la app directamente (sin video compartido), se muestra la pantalla Home
2. Se muestran instrucciones visuales paso a paso de cómo compartir desde TikTok
3. Las instrucciones son claras e intuitivas (con iconos o ilustraciones)
4. El diseño sigue el tema dark mode con colores de acento rosa (#FF0050) y cyan (#00F2EA)

---

### EP-06: Historial de Stickers

#### US-10: Ver historial de stickers creados

**Como** usuario,
**quiero** ver todos los stickers que he creado anteriormente en la pantalla principal,
**para** poder reutilizarlos o compartirlos de nuevo.

**Criterios de aceptación:**

1. Los stickers creados se muestran en una grilla en la pantalla Home
2. Cada sticker muestra su miniatura sobre fondo de cuadrícula
3. Si no hay stickers creados, se muestra un estado vacío con las instrucciones
4. Los stickers se ordenan del más reciente al más antiguo
5. Los stickers persisten entre sesiones (almacenamiento local)

---

#### US-11: Compartir sticker desde historial

**Como** usuario,
**quiero** poder compartir un sticker existente desde mi historial,
**para** no tener que buscarlo en la galería del teléfono.

**Criterios de aceptación:**

1. Al tocar un sticker del historial, se muestra opción de compartir
2. Se abre el share sheet nativo con el sticker seleccionado
3. El sticker compartido mantiene la transparencia PNG

---

#### US-12: Eliminar sticker del historial

**Como** usuario,
**quiero** poder eliminar stickers de mi historial,
**para** mantener organizada mi colección.

**Criterios de aceptación:**

1. Existe una acción de eliminar para cada sticker (swipe o botón)
2. Se pide confirmación antes de eliminar
3. Al confirmar, el sticker se elimina del historial local
4. La UI se actualiza inmediatamente reflejando la eliminación

---

## Priorización y Plan de Implementación

### Sprint 1 - Core MVP (P0)

| Orden | User Story | Épica                 | Dependencia |
| ----- | ---------- | --------------------- | ----------- |
| 1     | US-01      | Share Extension       | Ninguna     |
| 2     | US-02      | Share Extension       | US-01       |
| 3     | US-03      | Editor de Stickers    | US-02       |
| 4     | US-04      | Editor de Stickers    | US-03       |
| 5     | US-05      | Editor de Stickers    | US-03       |
| 6     | US-06      | Preview y Exportación | US-05       |
| 7     | US-07      | Preview y Exportación | US-06       |
| 8     | US-08      | Compartir Sticker     | US-07       |

### Sprint 2 - Mejoras (P1)

| Orden | User Story | Épica               | Dependencia |
| ----- | ---------- | ------------------- | ----------- |
| 1     | US-09      | Home Screen          | Ninguna     |
| 2     | US-10      | Historial            | US-07       |
| 3     | US-11      | Historial            | US-10       |
| 4     | US-12      | Historial            | US-10       |

---

## Requisitos No Funcionales

| ID     | Requisito                                                            | Prioridad |
| ------ | -------------------------------------------------------------------- | --------- |
| RNF-01 | TypeScript estricto, sin `any`                                       | P0        |
| RNF-02 | Clean Architecture (presentación, negocio, infraestructura)          | P0        |
| RNF-03 | Principios SOLID                                                     | P0        |
| RNF-04 | Tests unitarios con cobertura mínima 70% en lógica de negocio       | P0        |
| RNF-05 | Dark mode por defecto                                                | P1        |
| RNF-06 | Feedback háptico en acciones importantes                             | P1        |
| RNF-07 | Compatibilidad iOS y Android                                         | P0        |
| RNF-08 | Tiempo de procesamiento de recorte < 2 segundos                      | P0        |
| RNF-09 | Dibujo fluido sin lag perceptible                                    | P0        |

---

## Siguiente Paso

Ejecutar `/arch` para que el Arquitecto diseñe la estructura del proyecto, defina interfaces TypeScript y elija las dependencias específicas basándose en estas User Stories.
