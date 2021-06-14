# PluralKit.js
*A PluralKit API wrapper for JavaScript*

## About
[PluralKit](https://github.com/xske/pluralkit) is an 
incredibly useful tool for plurals, trans folks, and roleplayers that 
comes with an API for use alongside the bot. 
This wrapper was created to make interacting with the API in Node.js applications easier

This wrapper comes with features like:
- Full coverage of the API (up to v1)
- More options for setting values (eg: "red" is a valid `member.color`)
- Options to fetch members, fronters, and switches when fetching a system
- Promise based and object oriented

And more!

## Installation
With **Node 14.x or higher**, use this to install:  
`npm install pk.js`

## Dependencies
This library uses only a few dependencies, which are:
- axios - for request handling
- @vvo/tzdb - for verifying timezone
- chrono-node - for parsing birthdays
- tinycolor2 - for parsing colors
- valid-url - for verifying avatar urls

## Setup
The wrapper itself requires **zero setup.** However, there are still some options you can use:

```js
import PKAPI from 'pk.js';

// shown values are defaults!
const api = new PKAPI({
	base_url: "https://api.pluralkit.me", // base api url
	version: 1, // api version
	token: undefined // for authing requests. only set if you're using this for a single system!
})
```

**Note:** This library currently only supports APIv1. 
As of writing (06.14.2021), APIv2 is not yet released

## Examples
*Using the above setup; note that `exmpl` is a **real** system*
```js
// get a system by id
var system = await api.getSystem({id: 'exmpl'});

// authed version of above
var system = await api.getSystem({id: 'exmpl', token: process.env.TOKEN});

// edit the system
system.timezone = "est";
system.description = "Test system";

// patch
await system.patch(process.env.TOKEN);

// see the changes
console.log(system)
```

```js
// get member
var member = await api.getMember{id: 'gaznz'};

// edit
member.name = "Test Name";
member.visibility = true; // public
member.name_privacy = false; // private
await member.patch(process.env.TOKEN)

console.log(member)
```

# Docs
## The API Instance
You can get started by `import`ing the library and creating a `new` instance:
```
import PKAPI from 'pk.js";
const api = new PKAPI();'
```

### Options
| key | description | optional? | default |
|-----|-------------|-----------|---------|
| base_url | The URL for accessing the API, eg. `localhost:8080` for local testing | yes | `https://api.pluralkit.me` |
| version | The version of the API to use | yes | `1` |
| token | A system token to use for authorizing requests | yes | `undefined` |

**Note:** A token being given here will **always** override tokens used in options/arguments. 
Only set the token if you're *only* planning to affect one system with this instance!
### Methods
> **getSystem(opts)**

Used for fetching a system

**Options**
| key | description | optional? |
|-----|-------------|-----------|
| id | An account or system ID | no - *unless* using token |
| token | A token to use for authing the request | yes - *unless* not using ID |

**Returns**
A new `System` object

**Errors**
Throws for the following reasons:
- ID not supplied
- System not found (ID or token invalid)

> **getAccount(opts)**

Shortcut for getting a system with their account ID; works the same as above

> **patchSystem(data)**

Patches a system


**Options**
| key | description | optional? |
|-----|-------------|-----------|
| token | A token used for authing the request | no |
| [system data] | The data to patch the system with. See `Systems` below for keys | yes |

**Note:** All keys should be top level on the object, eg: `{token: "", name: "Test"}`

> 
## Systems
