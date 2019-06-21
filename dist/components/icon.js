import React from "react";
import { faFolder, faFolderOpen, faFilePdf, faFilePowerpoint, faFileWord, faFileImage, faFileExcel, faFileCsv, faFile, faSearch, faWindowClose, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

var FileIcon = function FileIcon(node, bookmarks) {
  node.bookmarked = bookmarks && bookmarks[node.path] ? true : false;

  if (node.type === "file") {
    var fileDecotator = fileDecorator(node.extension);
    return React.createElement(FontAwesomeIcon, {
      className: "icon ".concat(fileDecotator.class, " ").concat(node.bookmarked ? "bookmarked" : null),
      icon: fileDecotator.icon,
      size: "1x"
    });
  }

  return React.createElement(FontAwesomeIcon, {
    className: "icon folder ".concat(node.bookmarked ? "bookmarked" : null),
    icon: node.isOpen ? faFolderOpen : faFolder,
    size: "1x"
  });
};

var SearchIcon = function SearchIcon() {
  return React.createElement(FontAwesomeIcon, {
    icon: faSearch
  });
};

var StarIcon = function StarIcon() {
  return React.createElement(FontAwesomeIcon, {
    className: "yellow",
    icon: faStar
  });
};

var CloseIcon = function CloseIcon() {
  return React.createElement(FontAwesomeIcon, {
    icon: faWindowClose
  });
};

var fileDecorator = function fileDecorator(fileExtension) {
  switch (fileExtension) {
    case ".jpg":
    case ".jpeg":
    case ".gif":
    case ".png":
    case ".bmp":
      return {
        icon: faFileImage,
        class: "purple"
      };

    case ".pdf":
      return {
        icon: faFilePdf,
        class: "tomato"
      };

    case ".ppt":
    case ".pptx":
      return {
        icon: faFilePowerpoint,
        class: "orange"
      };

    case ".doc":
    case ".docx":
      return {
        icon: faFileWord,
        class: "blue"
      };

    case ".xls":
    case ".xlsx":
      return {
        icon: faFileExcel,
        class: "green"
      };

    case ".csv":
      return {
        icon: faFileCsv,
        class: "brown"
      };

    default:
      return {
        icon: faFile,
        class: "grey"
      };
  }
};

export default {
  file: FileIcon,
  search: SearchIcon,
  star: StarIcon,
  close: CloseIcon
};