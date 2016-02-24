# x-enum
A powerful enum implementation to Javascript

## Installation

### To use in node:

`$ npm install x-enum`

Then require it using CommonJS:

`var Xenum = require('x-enum');`

Or import using ES6 syntax:

`import Xenum from 'x-enum';`

### To use in browser:

You can get the x-enum.js and x-enum.min.js scripts [here](https://github.com/osmanpontes/x-enum/tree/master/dist).

And use directly in the browser:

`<script src="path/to/yourCopyOf/x-enum.js"></script>`

`<script src="path/to/yourCopyOf/x-enum.min.js"></script>`

## Usage

### A very simple example:

```js
let Vowels = new XEnum('a', 'e', 'i', 'o', 'u');

console.log(Vowels.a.valueOf()); // 1
console.log(+Vowels.a); // 1
console.log(Vowels.a.toString()); // 'a'

console.log(Vowels.u.valueOf()); // 5
console.log(+Vowels.u); // 5
console.log(Vowels.u.toString()); // 'u'
```

### You can set a string different from element name:

```js
let Colors = new XEnum(
  {blue: 'Blue'},
  {lightBlue: 'Light Blue'}
);

console.log(+Colors.blue); // 1
console.log(Colors.blue.toString()); // 'Blue'

console.log(+Colors.lightBlue); // 2
console.log(Colors.lightBlue.toString()); // 'Light Blue'
```

### You can set values manually

```js
let Colors = new XEnum(
  {blue: 4},
  {lightBlue: 10}
);

console.log(+Colors.blue); // 4
console.log(Colors.blue.toString()); // 'blue'

console.log(+Colors.lightBlue); // 10
console.log(Colors.lightBlue.toString()); // 'lightBlue'
```

### You can set new attributes to enum elements:

```js
let Colors = new XEnum(
  {blue: {type: 'foo'}},
  {lightBlue: {type: 'bar'}}
);

console.log(+Colors.blue); // 1
console.log(Colors.blue.toString()); // 'blue'
console.log(Colors.blue.type); // 'foo'

console.log(+Colors.lightBlue); // 2
console.log(Colors.lightBlue.toString()); // 'lightBlue'
console.log(Colors.lightBlue.type); // 'bar'
```

### Or you can set whatever you want:

```js
let Colors = new XEnum(
  {blue: [4, 'Blue', {type: 'foo'}]},
  {lightBlue: [10, 'Light Blue', {type: 'bar'}]},
  {red: [11, 'Red']}
);

console.log(+Colors.blue); // 4
console.log(Colors.blue.toString()); // 'Blue'
console.log(Colors.blue.type); // 'foo'

console.log(+Colors.lightBlue); // 10
console.log(Colors.lightBlue.toString()); // 'Light Blue'
console.log(Colors.lightBlue.type); // 'bar'

console.log(+Colors.red); // 11
console.log(Colors.red.toString()); // 'Red'
console.log(Colors.red.type); // undefined
```

### If you want a little cleaner syntax:

```js
let Colors = new XEnum({
  blue: [4, 'Blue', {type: 'foo'}],
  lightBlue: [10, 'Light Blue', {type: 'bar'}],
  red: [11, 'Red']
});
```

## Note

I've used it more than a year in production and it helped me a lot.
I wish XEnum can be a good lib to you.

## License
MIT