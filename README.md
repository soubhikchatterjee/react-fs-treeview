# React FileSystem Treeview (react-fs-treeview)

Specify a path of a directory on your machine and this component will render a treeview of the path including its child files/folders. This component uses lazy loading of the children hence making it blazing fast.

### Features

- Deep nesting of folders till nth level.
- Lazy loading of child nodes.
- Bookmark a file.
- Search for a filename.
- Rename a node.
- Delete a node
- Drag/Drop a node to another folder.
- Resizable frame.

### Screenshot

![Screenshot](https://i.imgur.com/cxp9U8a.png "React FileSystem Treeview")

[![Screencast](http://img.youtube.com/vi/jhVRYDqTxNQ/0.jpg)](http://www.youtube.com/watch?v=jhVRYDqTxNQ)

[![npm](https://img.shields.io/npm/v/react-simplified-modal.svg)](https://www.npmjs.com/package/react-fs-treeview)
![GitHub issues](https://img.shields.io/github/issues/soubhikchatterjee/react-fs-treeview.svg)
![GitHub pull requests](https://img.shields.io/github/issues-pr/soubhikchatterjee/react-fs-treeview.svg)
[![HitCount](http://hits.dwyl.io/soubhikchatterjee/react-fs-treeview.svg)](http://hits.dwyl.io/soubhikchatterjee/react-fs-treeview)

## Install

`npm i react-fs-treeview`

## Import the modal.

```js
import Treeview from "react-fs-treeview";
```

## Usage

```js
<Tree
  styles={{ width: "500px", fontSize: "0.9em" }}
  basePath="/var/www/html"
  disableContextMenu={false}
/>
```

_Note:_ For actions like Rename, Delete, Moving items needs a nodejs server to be run on the backend. The server code can be found at: `./server/server.js`. Set an env variable `fsTreeViewUrl` and set its value to this server url (Eg: `http://localhost:5000`)

## Props

basePath : (_string_) Path of the folder.

styles : (_object_) Styles that you would like to apply to the treeview

disableContextMenu : (_boolean_) If `true` will show the options (Rename, Delete and Bookmark) when right clicked on a file/directory. Defaults to `false`.

onItemSelected : (_callback_) function called when a file/folder is clicked
