
# El Kit de Herramientas

Sprig es un pequeño kit de construcción para crear juegos basados en baldosas (tiles).
Fue creado por Hack Club, una comunidad global de programadores adolescentes quienes
creen que las personas aprenden mejor haciendo cosas que les importan
y compartiéndolas con otros.

Si esta es tu primera vez usando Sprig intenta jugar a través del juego de inicio.
Después de eso echa un vistazo a la galería. También puedes comenzar con un archivo en blanco y
seguir [este tutorial](https://github.com/hackclub/sprig-gallery/blob/main/src/routes/getting-started.md#lets-make-our-first-game-in-sprig).

Si te quedas atorado, puedes hablar con otras personas de la comunidad
acerca de Sprig en el [Slack de Hack Club](https://hackclub.com/slack).

Ejecuta los juegos presionando el botón `Run` o presionando `shift+enter`.

## Diseño de Niveles

Los juegos de Sprig se componen de cuadrículas de tiles cuadradas.

### setLegend(bitmaps)

Dile a Sprig qué tipos de sprites están disponibles en tu juego. 
Las claves de mapa de bits (bitMap keys) deben de ser un solo carácter.
Recomendamos almacenar las claves de caracteres en variables.

```js
const player = "p"  
const wall = "w"  

setLegend(
  [ player, bitmap`...` ],
  [ wall, bitmap`...` ],
)  
```

Para crear un nuevo bitmap, escribe

```
bitmap`.`
```

¡Esas son comillas invertidas (backticks)! Haz clic en el botón del "bitmap" resaltado para editar tu dibujo.

El orden de los tipos de sprites en tu leyenda también determinan el orden z (z-order) de dibujarlos. Los tipos de sprites que aparecen primero se dibujan en la parte superior.

### setBackground(bitmapKey)

Coloca un bitmap como el fondo del juego:

```js
setBackground(spriteKey)
```

Esto solo cambia las imágenes del juego.

### setMap(level)

Diseñar un nivel es como dibujar un bitmap:

```js
map`...`
```

Los caracteres del mapa proceden del orden de la leyenda del mapa de bits.
No es necesario realizar un seguimiento de los niveles en una leyenda, deberías almacenarlos tu mismo en una variable. 

Puedes llamar a `setMap` para borrar el juego y cargar un nuevo nivel:

```js
const level = map`...`
setMap(level)
```

Es posible que desees realizar un seguimiento de varios niveles utilizando un array para cambiar entre ellos a mitad del juego:

```js
const levels = [
  map`...`,
  map`...`,
  // etc.
]
setMap(levels[0])

// Later:
setMap(levels[1])
```

### setSolids(bitmapKey)

Los sprites sólidos no pueden superponerse entre sí. 
Esto es útil para crear cosas como paredes:

```js
const player = "p"  
const wall = "w"  

setSolids([ player, wall ])  
```

### setPushables(pushMap)

Usa `setPushables` para hacer que los sprites empujen a otros sprites. El sprite de la izquierda podrá empujar todos los sprites enumerados a la derecha.

```js
const player = "p"  
const block = "b"  

setPushables({ 
  [player]: [ block, player ] 
})
```

**¡Cuidado!** Asegúrate de que todo lo que pase a `setPushables` también esté marcado como un sólido o no se desplazará.

## Entrada del Usuario

Gamelab tiene ocho entradas  `w`, `a`, `s`, `d`, `i`, `j`, `k`, `l`.

Típicamente `w`, `a`, `s`, `d` se utilizan como controles direccionales.

En caso de que esté utilizando un diseño de teclado diferente, las teclas de flecha se asignan a WASD y `1`, `2`, `3` y `4` se asignan a `j`, `k`, `i`, and `l` respectivamente (aunque todavía necesita referirse a las entradas por los nombres no asignados en su código). <!-- TODO: this is translated via Google Translate, verify the translation is correct -->

### onInput(type, callback)

Hacer algo cuando el jugador presiona un control:

```js
onInput("a", () => {
  // Mueve al jugador un tile a la derecha.
  getFirst(player).x += 1
})
```

### afterInput(callback)

Se ejecuta después de que cada evento de entrada haya terminado de manejarse. Útil para tareas como verificar los estados de victoria:

```js
afterInput(() => {
  if (getAll(block).length > 0) {
    console.log("you win")
  }
})
```

## Sprites y Tiles

Cada tile puede contener cualquier número de sprites apilados uno encima del otro.

Los sprites contienen:
```
{
  type
  x
  y
  dx
  dy
}
```

Puedes mover el sprite configurando `x` e `y`.

El `bitmapKey` también se puede cambiar para actualizar los gráficos renderizados y las reglas de colisión que seguirá el sprite.

```js
sprite.y += 1
sprite.type = "p"
```

`dx` y `dy` se borran después de `afterInput`.
Se pueden usar para verificar si el sprite se movió y qué tanto.

Puedes eliminar un sprite con `sprite.remove()`.

### getTile(x, y)

Devuelve una lista de los sprites en el tile especificado.

### tilesWith(type, ...)

Devuelve una lista de tiles con todos los tipos contenidos en ella.

```js
tilesWith(block)
```

`tilesWith` acepta múltiples tipos de sprites.

```js
tilesWith(block, player, ...)
```

### addSprite(x, y, spriteType)

Crea un nuevo sprite del tipo dado.

### clearTile(x, y)

Elimina todos los sprites del tile especificado.

### getAll(type)

Devuelve todos los sprites del tipo dado.
Si no se especifica ninguna clave de mapa de bits, devuelve todos los sprites del juego.

### getFirst(type)

Devuelve el primer sprite de un tipo dado.
Útil si sabes que solo hay uno por sprite, como con un personaje de jugador.

Atajo para `getAll(type)[0]`.

## Texto

### addText(string, options = { x, y, color })

Puedes agregar texto con `x`, `y` y `color` opcionales.

Por ejemplo:

```js
addText("hello", {
  x: 10,
  y: 4,
  color: color`3`
})
```

### clearText()

Borra todo el texto de la pantalla.

## Música y Efectos de Sonido

¡Sprig viene con un motor de sonido y un secuenciador integrados! Puede usar esto para escribir música de fondo o con un alto BPM para hacer efectos de sonido.

Puedes crear una melodía con la palabra clave `tune`.
Como de costumbre, haz clic en el botón para abrir una ventana de edición.

```js
// Crear una melodía:
const melody = tune`...`

// Reproducirla:
playTune(melody)

// Reproducirla 5 veces:
playTune(melody, 5)

// Reproducirla hasta la muerte térmica del universo:
const playback = playTune(melody, Infinity)

// O haz que se calle rápidamente:
playback.end()
```


## Debugging

Abra la consola de tu navegador para depurar.

Puedes ver el estado del juego por...

## Idioms

### Get Neighbors

### Find Pattern

### Replace

### Count Overlaps
