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
import { uploadFile } from "../../hook/LessionHook";

const EditorCustom = ({ handleChange, name, init }) => {
  const [data, setData] = useState(init || "");

  useEffect(() => {
    setData(init || "");
  }, [init]);

  function uploadAdapter(loader) {
    return {
      upload: async () => {
        return await new Promise((resolve, reject) => {
          try {
            const body = new FormData();
            loader.file.then(async (file) => {
              body.append("files", file);
              const formData = new FormData();
              formData.append("file", file);
              formData.append("upload_preset", "dzvpbt10");
              formData.append("api_key", "772276885786162");
              const res = await uploadFile(formData);
              resolve({ default: res?.data?.url });
            });
          } catch (error) {
            reject("");
          }
        });
      },
    };
  }
  function uploadPlugin(editor) {
    console.log(editor, 21421);
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      console.log(loader, 22);
      return uploadAdapter(loader);
    };
  }
  return (
    <div className="App">
      <CKEditor
        editor={ClassicEditor}
        data={data}
        config={{
          extraPlugins: [uploadPlugin],
        }}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          if (!!handleChange) {
            handleChange(name, data);
          }
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

export default EditorCustom;
