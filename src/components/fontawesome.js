import React from "react";
import {
  faFolder,
  faFolderOpen,
  faFilePdf,
  faFilePowerpoint,
  faFileWord,
  faFileImage,
  faFileExcel,
  faFileCsv,
  faFile,
  faSearch,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FileIcon = node => {
  if (node.type === "file") {
    const fileDecotator = fileDecorator(node.extension);
    return (
      <FontAwesomeIcon
        className={`icon ${fileDecotator.class}`}
        icon={fileDecotator.icon}
        size="1x"
      />
    );
  }

  return (
    <FontAwesomeIcon
      className="icon folder"
      icon={node.isOpen ? faFolderOpen : faFolder}
      size="1x"
    />
  );
};

const SearchIcon = () => {
  return <FontAwesomeIcon icon={faSearch} />;
};

const CloseIcon = () => {
  return <FontAwesomeIcon icon={faWindowClose} />;
};

const fileDecorator = fileExtension => {
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
  close: CloseIcon
};
