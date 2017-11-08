JXA Evernote
==============

The goal of this node module is to interact with Evernote through Apple Javascript for Automation. This alows you to create, update, and delete notes even if you are not connected to internet.

## Getting Started
### Prerequisites
This node module only works on Mac

### Installing

```sh
yarn add jxa-evernote
```

### Using this module in other modules

Here is a quick example of how this module can be used in other modules. The [TypeScript Module Resolution Logic](https://www.typescriptlang.org/docs/handbook/module-resolution.html) makes it quite easy. The file `src/index.ts` acts as an aggregator of all the functionality in this module. It imports from other files and re-exports to provide a unified interface for this module. The _package.json_ file contains `main` attribute that points to the generated `lib/index.js` file and `typings` attribute that points to the generated `lib/index.d.ts` file.

- To use the `Notebook` class in a TypeScript file -

```ts
import { Notebook } from "jxa-evernote";

Notebook.find("A new test Notebook") // Find a Notebook
  .then((book: Notebook) => {
    return book.notes(); // List notes in Notebook
  })
```

- To use the `Notebook` class in a JavaScript file -

```js
const Notebook = require('jxa-evernote').Notebook;

Notebook.find("A new test Notebook") // Find a Notebook
  .then(function (book) {
    return book.notes(); // List notes in Notebook
  })
```
