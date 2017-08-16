# find-pi

> Returns the IP address of a Raspberry Pi on a local network.

Requires arp (address resolution protocol) to work.

## Install
```
$ npm install find-pi --save

or

$ yarn add find-pi
```

## Usage
```js
const findPi = require('find-pi')

findPi()
  .then(ip => console.log(ip))
  .catch(err => console.error(err))
// 192.168.1.2
```

## Related
- [Arp Wiki](https://en.wikipedia.org/wiki/Address_Resolution_Protocol) -  CLI for this module
- [find-pi-cli](https://github.com/dreamorosi/find-pi-cli) - CLI package for this module

## License
MIT © [Andrea Amorosi](https://dreamorosi.com)
