# Questions I had while doint

- [x] What is a good way to count `chars` in a `string`? [stack](https://stackoverflow.com/a/881111/848755)
  - [x] `match` regex? is
  - A: The idea of using split was not terrible. `str.split(c).length - 1`
- [x] How to make a group in regex? `': '` [#a1](#a)

## a1

Regex for substrings, not only chars.

So in regex `[]` matches single characters. To `(-|(: )|\s)` more over a non capturing group `(?:-|(: )|\s)`.
