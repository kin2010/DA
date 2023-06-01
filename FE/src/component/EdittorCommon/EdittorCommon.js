/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useEffect, useRef } from "react";
// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// export default function Editor({ name, handleChange }) {
//   // const [editorRef, setEdittor] = useRef();
//   // const editorRef = useRef();
//   const [editorLoaded, setEditorLoaded] = useState(false);
//   // const { CKEditor, ClassicEditor } = editorRef.current || {};
//   const [data, setData] = useState("");
//   useEffect(() => {
//     /* eslint-disable @typescript-eslint/no-var-requires */
//     // editorRef.current = {
//     //   CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
//     //   ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
//     // };
//     // console.log(editorRef, 131);
//     setEditorLoaded(true);
//   }, []);

//   useEffect(() => {
//     // if (!!handleChange) {
//     //   handleChange(name, data);
//     // }
//   }, [data]);
//   return (
//     <>
//       {editorLoaded ? (
//         <CKEditor
//           editor={ClassicEditor}
//           data={data}
//           onReady={(editor) => {
//             console.log("Editor is ready to use!", editor);
//           }}
//           onError={(e) => console.log(e)}
//           onChange={(event, editor) => {
//             console.log("ss");
//             if (!!editor) {
//               const result = editor.getData();
//               setData(result);
//             }
//           }}
//         />
//       ) : (
//         <p>Carregando...</p>
//       )}
//     </>
//   );
// }
import React, { Component, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useFormikContext } from "formik";

const EditorCommon = ({ handleChange, name, value }) => {
  const [data, setData] = useState("");
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (!!value) {
      setData(value);
    }
  }, [value]);

  useEffect(() => {
    setFieldValue(name, data);
  }, [data]);
  return (
    <div className="App">
      {/* <h2>Using CKEditor 5 build in React</h2> */}
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ data });
          if (!!handleChange) {
            handleChange(name, data);
          }
          setData(data);
        }}
        onBlur={(event, editor) => {
          // console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          // console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default EditorCommon;
