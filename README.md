# React FileSystem Treeview (react-fs-treeview)

Specify a path of a directory on your machine and this component will render a treeview of the path including its child files/folders. This component uses lazy loading of the children hence making it blazing fast.

[![npm](https://img.shields.io/npm/v/react-simplified-modal.svg)](https://www.npmjs.com/package/react-fs-treeview)
![GitHub issues](https://img.shields.io/github/issues/soubhikchatterjee/react-fs-treeview.svg)
![GitHub pull requests](https://img.shields.io/github/issues-pr/soubhikchatterjee/react-fs-treeview.svg)
[![HitCount](http://hits.dwyl.io/soubhikchatterjee/react-fs-treeview.svg)](http://hits.dwyl.io/soubhikchatterjee/react-fs-treeview)

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

### Youtube Screencast

[![Screencast](http://img.youtube.com/vi/k9xwenhVJOU/0.jpg)](https://www.youtube.com/watch?v=k9xwenhVJOU)

## Install

`npm i react-fs-treeview`

## Import the modal.

```js
import Tree from "react-fs-treeview";
```

## Usage

```js
<Tree
  className="class1 class2 class3"
  basePath="/var/www/html"
  disableContextMenu={false}
  onItemSelected={selectedItem => console.log(selectedItem)}
/>
```

_Note:_ For actions like listing of trees, Rename, Delete, Moving items, it is required to run the treeview server. The server code can be found at: `./dist/server/server.js`. Incase if you wish to run the server on the non-default host or port i.e. `http://localhost:5000`, set an env variable `fsTreeViewUrl` and set its value to the server url.

## Props

basePath : (_string_) Path of the folder.

className : (_object_) CSS class(es) that you would like to apply to the treeview

disableContextMenu : (_boolean_) If `true` will show the options (Rename, Delete and Bookmark) when right clicked on a file/directory. Defaults to `false`.

onItemSelected : (_callback_) function called when a file/folder is clicked
