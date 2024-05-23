import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor({ value, onChange }) {
  //   const [value, setValue] = useState("");

  //   useEffect(() => {
  //     // console.log(value);
  //   }, [value]);

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
}
