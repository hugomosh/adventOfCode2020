# Notes

## Day 03

Indexes are always a pain. I guess it is always important to double check. I prefer to make it obvious. I struggled in this one trying to get the p2 right.

The best way to break it up I say would be to say. How many steps are we going to make. Then calculate the coordinates for each step.

Having `stepNumber = Math.floor( length / down)` and `[x,y] =step(stepNumber)` So instead of having

Me gusto este, en el sentido que se veía venir que era un pex los indices. El mapa realmente ayuda a visualizar el avance de los pasos adecuadamente. Por ejemplo, no estoy dibujando el mapa adecuado para descensos de más de un paso.

En esta ronda también ya metí tests para tener algo mas de confianza.

Sigo medio apenado de publicar cada progreso, y ademas de estar super atrasado pero cada uno nuevo pues me emociona 🤓 y hasta se me acelero y fantaseo con la idea de buscar la solución optima o en otro lenguaje. JS es una fichita pero ya lo tengo medio masticado. No se ni por que me asusto, se que nadie lo va leer y afortunadamente no es una entrevista de trabajo. Pero estoy seguro que hacer estos ejercicios entrenan bastante bien a cualquiera para lucirse en solución de problemas. Creo que yo disfruto mucho de estos problemas pero se de muy buenos programadores que su area de _expertise_ esta en otra parte. Y se que para gente de programación competitiva esto es un flan.

Supongo que solo quiero decir lo estoy disfrutando y ya veo por que es popular. Espero mas gente se anime a darle una oportunidad... Y dejemos de juzgar a la gente! O mejor dicho respetemos más! Y valoremos el arte de cada persona. La técnica se logra si hay la mezcla adecuada de pasión y constancia. O eso me han dicho. 😅

_Ahh ya lo hice notas personales y no de programación 🤷._

Coding is fun! ...when things work! ...or at leas some progress is being made!

## Day 04

Dia 4 p2 estuvo perro. Muy parecideo a la videa real jaja. Tenia la sensación de que ya lo tenia pero no comprobé que estaba extrayendo mal la estatura. Pensé que `substr`te daba los primos elementos hasta el la longitud menos el negativo. Pero no, te da una substring de length hasta el numero negativo : /

Tuve que buscar ayuda en internet. Sabia que tenia algo mal pero después de unos minutos (ya llevaba en total como una hora desde que empece el dia 04..) pues busque, quería algo que me dijera a que debía apuntar. Super trampa, lo se pero bueno sólo tengo una por cada dia max. Entonces encontré esta chingoneria o chingadera, jaja no se ni que pensar por el poco código que tiene o lo complicado que seria lidiar con esto pero definitivamente se aprende bastante de lo que esta aca. Y me encanto la forma en que prueba los rangos con regex. Tendré que buscar que es mas eficiente.

[mmr398](https://www.reddit.com/r/adventofcode/comments/k6e8sw/2020_day_04_solutions/gfdf2g9?utm_source=share&utm_medium=web2x&context=3)

```js
document.body.innerText.split("\n\n").filter((passport) => {
  x = passport
    .split(/\n|\s/)
    .reduce((a, f) => ({ ...a, [f.split(":")[0]]: f.split(":")[1] }), {});
  let valid = `byr:19[2-9]\\d\|(200[0-2]) iyr:201\\d|(2020) eyr:202\\d|(2030) ecl:^amb\|blu\|brn\|gry\|grn\|hzl\|oth$ pid:^\\d{9}$ hcl:#[a-z0-f]{6} hgt:(1[5-8]\\d\|19[0-3])cm\|(59\|6\\d\|7[0-6])in`;
  return valid
    .split(/\n|\s/)
    .reduce(
      (acc, cur) => RegExp(cur.split(":")[1]).test(x[cur.split(":")[0]]) && acc,
      true
    );
}).length;
```

Eso si, ya sabia el resultado **172** y yo tenia **174**. Asi que no iba a subir hasta que lo corrigiera. Aun con el resultado es difícil saber que esta pasando mal. Lo feo es que esos 3 o 2 que no estaba cachando del height estaban muy oculto los canijos.

El dia cuatro si estuvo feo, el código lo refleja. El numero de `console.log`es proporcional al struggle que pase. Pero bueno pues hay que estar sharp y siempre se aprender de estos errores. Y de soluciones de otros colegas.

## Day 05

Este dia me gusto. Tenia toda la facha de ser binario el problema. Entonces con calma se podia ver que nos estaban dando el código binario de la colum `BFFFBBB -> 1000111` y `LRL -> 010`. Y ahora me doy cuenta que multiplicar por 8 es desplazar (desfasar\*?) la primera parte tres lugares y ya nos queda un sistema para numerar todos los boletos.

Para este problema pase mas tiempo consultando como eran las operaciones con bits que resolviéndolo.

[Practical bit manipulation in JavaScript | by Joshua Parker | Medium](https://medium.com/@parkerjmed/practical-bit-manipulation-in-javascript-bfd9ef6d6c30)

Era vital recordar que `1<<x` nos da un 1 con x ceros. Entonces fui sumando el carácter en el espacio `i` si es `B` o `R` entoces sumar.

El mapa de lugares es un bonito problema. Estaría interesante ver como queda la numeración el el avion do 2^10 -1 lugares. No considere los casos limite pero creo que en este se perdona. Vamos a buscar el mapa. mmm No lo encontré voy a dibujar el mapa para 4 filas y 2 columnas

| Fila | L   | R   |
| ---- | --- | --- |
| 0    | 001 | 000 |
| 1    | 011 | 010 |
| 2    | 101 | 100 |
| 3    | 111 | 110 |

Y pues ya con 4 filas y 4 columnas es fácil ver el patron. Pense seria mas como una z, pero no se que estaba pensando :/

| Fila | L    |      |      | R    |
| ---- | ---- | ---- | ---- | ---- |
| 0    | 0011 | 0010 | 0001 | 0000 |
| 1    | 0111 | 0110 | 0101 | 0010 |

## Day 06

Otro sencillo pero esta vez si me quedo bastante feo. Me tropecé mucho con mi test, los datos se parecían al del dia 4 en el sentido de que son grupo de lineas separados por dos new lines `\n\n` asi que copie las lineas del dia 4 pero olvide el test : / jaja ahi se me fueron unos minutos.

Me gustaría corregir este código y buscar una solución mas eficiente pero bueno estamos resolviendo sin importar como, mientras corra en mi compu en tiempo razonable.
Aquí busque como hacer [Object.entries() - JavaScript | MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/entries) para el `for (const [k, v] of Object.entries(answers)) {` aunque en realidad solo ocupaba el values. _Jaja y digo fea implementación como si alguna otra haya sido bonita_ 😅

Wow, vean esta chulada en python [adventofcode/solutions.py at master · fuglede/adventofcode](https://github.com/fuglede/adventofcode/blob/master/2020/day06/solutions.py) _la descubrí viendo random a los leaderboards_

```py
with open('input') as f:
    data = f.read().strip()

groups = data.split('\n\n')

# Part one
print(sum(len(set(g.replace('\n', ''))) for g in groups))

# Part two
print(sum(len(set.intersection(*map(set, g.split('\n')))) for g in groups))
```

## Day 07

light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.

Este lo intente hacer el jueves 17 en la noche y creo que resolví el total de bolsas que tiene una `shiny gold` bag; en vez de cuantas bolsas externas contiene alguna `shiny gold` recursivamente :s que bruto y ahi me gaste mi stamina. Me gusta este problema, el punto es encontrar la estructura del grafo adecuado y versátil suficiente para el p2 aunque puede que ni se ocupe. Lo voy a intentar manhana ya con ojos frescos. Y ver la manera de facilitarme la vida con estructuras sencillas.

La idea es encontrar todas las reglas en que en algún punto encuentras una `shiny gold`. Esto puede ser desde abajo hacia arriba o por cada regla ir averiguando si en algun punto toca a la bolsa `shiny gold` sin que repitas nodos para evitar ciclos.

Me doy cuenta de lo oxidado que estoy con grafos y arboles. Lo divertido que son estos y fáciles para resolver problemas y dar respuesta a este tipo de quieres, quizá manhana ya que lo resuelva como sea le doy una repasada a estos en js. También me dan ganas de hacer el que sigue en `python` por lo conveniente y han sido los mas concretas y claras soluciones que he vista haya afuera. Si no `rust` pero vayamos viendo. Le tengo algo de fe a js.

---

_Dia (real) siguiente_ Pues ya , en tan solo unos minutos (10) ya pude salir con el plan de una solución bastante simple y obvia. El chiste es guardar para cada nodo los padres e hijos. Puede ser un `Set` para p1 pero creo vale la pena un `Map` para guardar los pesos del grafo por si las moscas en el p2. En estos 10 minutos también vi que la opción

[How JavaScript Maps Can Make Your Code Faster | by Bret Cameron | Medium](https://medium.com/@bretcameron/how-javascript-maps-can-make-your-code-faster-90f56bf61d9d)

- [ ] Me pregunto que podrá ayudar a la comunidad hispano hablante de programación mas. Mas articulos en espanhol? Preguntare en foros.

Ya con los mapas las soluciones quedaron mas fáciles. al final si era contar el numero de bolsas y este esta triqui. Hay que ser muy cuidadoso en como contar. Me fui por varios callejones incorrectos.
El chiste en este caso para mi fue pensar. Para cada bolsa dentro debo de contar el cuantas bolsas tiene el hijo para multiplicar eso por el numero de bolsas que tengo y añadir finalmente esas bolsas contenedoras. Osea `peso*(1+cuentaDeBolsasDelHijo)`.

---

Nota: Hago notas personales para sentir que convivo, y ojala después sirvan para recordar. Es bastante penoso saber que alguien mas puede leer esto pero si eres curioso dejame saber que estuviste aqui. Me daría gusto y algo de pena. Mucho gusto si te ayuda de alguna u otra manera.

> AL parecer no tome notas para 8 y 0. Me lo eche después del 8 y para el 10 tome unos dias entonces estoy aun mas retrasado. Creo que intente hacer el 18 para ver si podia competir para un dia pero pues no. Mejor voy a ir despacio este año y ya el que sigo lo hago al ritmo, PD.

## Day 08

Un ensamblador. Toda la carrera de computación esta en estos ejercicios.

## Day 09

Este era de códigos.

## Day 10

Vine vi vencí.

Que bonito problema. Me gusto mucho. Creo que este pasa de un orden bastante alto, creo 2^n a uno bajo. MM tendría que hacer el análisis. La solución naive no lo contaría eficiente pero aun asi sirve para resolver el problema.

Me tarde una hora y media pero estuvo divertido, quizá con mas práctica lo pueda hacer en unos minutos. Vi la solución del 2 pero quise evitarla hasta que vi que la magnitud era muuuy grande.

## Day 11

Un poco de problema con los indices y las reglas del p2 pero en menos de una hora. Creo que tengo un gran camino para poder competir. Me parece que el peor top 100 lo hace en uno 15 minutos.

Creo que si tengo ciertas funciones bien practicadas echas podría competir. Pero me falta practica y definitivamente python seria más ergonómico y ya con practica pues me sería más fácil y fluido.
