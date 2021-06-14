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
Check out the [wiki](https://github.com/greysdawn/pk.js/wiki) for documentation
