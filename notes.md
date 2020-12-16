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
