# Questions I had while doing this

- [x] What is a good way to count `chars` in a `string`? [stack](https://stackoverflow.com/a/881111/848755)
  - [x] `match` regex? is
  - A: The idea of using split was not terrible. `str.split(c).length - 1`
- [x] How to make a group in regex? `': '` [#a1](#a)
- [ ] How to replace char a position x in str?
  - [x] For the challenge I went for the split to array and come back.
  - [ ] Is there a better way?
- [ ] Best way to deal with indexes. Best practices? i++, i
  - [x] I like this answer [syntax - Why avoid increment ("++") and decrement ("--") operators in JavaScript? - Stack Overflow](https://stackoverflow.com/questions/971312/why-avoid-increment-and-decrement-operators-in-javascript)

## a1

Regex for substrings, not only chars.

So in regex `[]` matches single characters. To `(-|(: )|\s)` more over a non capturing group `(?:-|(: )|\s)`.
