# :construction: find-pi :construction:

> Returns the IP address of a Raspberry Pi on a local network.

~~Requires arp (address resolution protocol) to work.~~

## Install
```
$ npm install find-pi --save

or

$ yarn add find-pi
```

## Usage
```js
// TBD
```

## Related
- ~~[Arp Wiki](https://en.wikipedia.org/wiki/Address_Resolution_Protocol) -  CLI for this module~~
- [find-pi-cli](https://github.com/dreamorosi/find-pi-cli) - CLI package for this module

## License
MIT © [Andrea Amorosi](mailto:dreamorosi@gmail.com)

## ToDo
- [ ] Finish writing tests for main module. [Link](../next/index.test.js#L46)
- [ ] Extract mock implementation. [Link](../next/index.test.js#L50)
- [ ] Write tests for fn.parseReport() and extract it as utility. [Link](../next/index.test.js#L72)
- [ ] Add schema validation ajv (?). [Link](../next/lib/findPi.js#L5)
- [ ] Add ping to mDNS as preferred way of discovery using options. [Link](../next/lib/findPi.js#L38)
- [ ] Add internal-ip to determine default CIDR based on own ip (i.e. if internal-ip === 192.168.1.69 then scan for 192.168.1.0/24). [Link](../next/lib/utils.js#L7)