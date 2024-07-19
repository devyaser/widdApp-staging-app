import { useState } from "react";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { directUpload, getPreSignedUrl } from "services/upload.services";
import { AxiosResponse } from "axios";
interface IReactEditorProps {
  getHTML: (content: string) => void;
  values: any;
  setFieldValue: any;
}

const ReactEditor = ({ getHTML, setFieldValue, values }: IReactEditorProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: EditorState) => {
    // console.log("editorState", editorState);
    setEditorState(editorState);
  };

  const uploadCallback = (file: File, callback: any) => {
    return new Promise((resolve, reject) => {
      getPreSignedUrl(file.name)
        .then((res: AxiosResponse) => {
          const singedUrl = res?.data?.data?.signedUrl;
          const objectUrl = res?.data?.data?.objectUrl;
          
          directUpload(singedUrl, file as File)
            .then((res) => {
              setFieldValue("uploadImagesUrl", [...values.uploadImagesUrl, objectUrl])
              return resolve({ data: { link: objectUrl } });

            })
            .catch((err) => {reject(err); console.log("err", err)});
        })
        .catch((err) => {
          console.log("err", err);
        });
    });
  };

  return (
    <Editor
      editorClassName="react-draft-editor"
      toolbarClassName="react-draft-toolbar"
      wrapperClassName="react-draft-wrapper"
      editorState={editorState}
      onBlur={() => {
        getHTML(draftToHtml(convertToRaw(editorState.getCurrentContent())));
      }}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        image: { uploadCallback: uploadCallback },
        options: [
          "inline",
          "fontSize",
          // "fontFamily",
          "list",
          "textAlign",
          // "colorPicker",
          "link",
          // "embedded",
          "emoji",
          "image",
          "remove",
          "history",
        ],
        emoji: {
          // icon: <FaSmile />,
          className: undefined,
          component: undefined,
          popupClassName: undefined,
          emojis: [
            "😀",
            "😁",
            "😂",
            "😃",
            "😉",
            "😋",
            "😎",
            "😍",
            "😗",
            "🤗",
            "🤔",
            "😣",
            "😫",
            "😴",
            "😌",
            "🤓",
            "😛",
            "😜",
            "😠",
            "😇",
            "😷",
            "😈",
            "👻",
            "😺",
            "😸",
            "😹",
            "😻",
            "😼",
            "😽",
            "🙀",
            "🙈",
            "🙉",
            "🙊",
            "👼",
            "👮",
            "🕵",
            "💂",
            "👳",
            "🎅",
            "👸",
            "👰",
            "👲",
            "🙍",
            "🙇",
            "🚶",
            "🏃",
            "💃",
            "⛷",
            "🏂",
            "🏌",
            "🏄",
            "🚣",
            "🏊",
            "⛹",
            "🏋",
            "🚴",
            "👫",
            "💪",
            "👈",
            "👉",
            "👉",
            "👆",
            "🖕",
            "👇",
            "🖖",
            "🤘",
            "🖐",
            "👌",
            "👍",
            "👎",
            "✊",
            "👊",
            "👏",
            "🙌",
            "🙏",
            "🐵",
            "🐶",
            "🐇",
            "🐥",
            "🐸",
            "🐌",
            "🐛",
            "🐜",
            "🐝",
            "🍉",
            "🍄",
            "🍔",
            "🍤",
            "🍨",
            "🍪",
            "🎂",
            "🍰",
            "🍾",
            "🍷",
            "🍸",
            "🍺",
            "🌍",
            "🚑",
            "⏰",
            "🌙",
            "🌝",
            "🌞",
            "⭐",
            "🌟",
            "🌠",
            "🌨",
            "🌩",
            "⛄",
            "🔥",
            "🎄",
            "🎈",
            "🎉",
            "🎊",
            "🎁",
            "🎗",
            "🏀",
            "🏈",
            "🎲",
            "🔇",
            "🔈",
            "📣",
            "🔔",
            "🎵",
            "🎷",
            "💰",
            "🖊",
            "📅",
            "✅",
            "❎",
            "💯",
          ],
        },
      }}
    />
  );
};

export default ReactEditor;
