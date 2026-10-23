# Home

App web para el celular que funciona sin internet: rutina PHUL con bloque atlético, salud articular y cardio (4×4 guiado y meta OMS). Guarda todo en el propio teléfono (localStorage); nada sale del dispositivo.

**Dirección:** https://mrjuankx.github.io/HomeApp/

## Instalar en el celular (Android / Samsung)

1. Abre la dirección en Chrome.
2. Menú ⋮ → **Instalar app** (o **Añadir a pantalla de inicio**). En Samsung Internet: menú ≡ → **Añadir página a** → **Pantalla de inicio**.
3. Ábrela una vez con conexión. Desde ese momento funciona en modo avión.

En Ajustes, al final de la sección Datos, la app indica si el servidor tiene todo lo necesario para instalarse.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa (HTML, CSS y JS en un solo archivo). Incluye las tipografías Newsreader y Geist (licencia SIL OFL) incrustadas, así que no descarga nada. |
| `manifest.json` | Permite instalarla como app (nombre, colores, iconos). |
| `sw.js` | Service worker: guarda la app en el teléfono para que abra sin conexión. |
| `icono-*.png`, `icono.svg` | Iconos (estilo One UI: normal, adaptable y monocromo). |

## Publicar una versión nueva

Sube los cambios a `main` y aumenta `VERSION` en `sw.js` (por ejemplo `phul-v5`). La próxima vez que la app se abra con conexión, el teléfono descarga la versión nueva. Los datos no se tocan.

## Copias de seguridad

Ajustes → **Exportar copia de seguridad** genera un JSON con todo (pesas, cardio, peso corporal y rutina). Si se borran los datos del navegador o se desinstala la app, se pierde lo que no se haya exportado.
