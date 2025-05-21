import type { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import Underline from "@editorjs/underline";

export const EDITOR_JS_TOOLS: Record<string, ToolConstructable | ToolSettings> = {
  paragraph: {
    class: Paragraph as unknown as ToolConstructable, 
    inlineToolbar: ["bold", "italic", "link", "underline", "marker"],
  },
  header: {
    class: Header as unknown as ToolConstructable,
    inlineToolbar: true,
  },
  list: {
    class: List as unknown as ToolConstructable,
    inlineToolbar: true,
  },
  embed: Embed as unknown as ToolConstructable,
  table: Table as unknown as ToolConstructable,
  warning: Warning as unknown as ToolConstructable,
  code: Code as unknown as ToolConstructable,
  linkTool: {
    class: LinkTool as unknown as ToolConstructable,
    config: {
      endpoint: "/api/fetch-url", 
    },
  },
  image: {
    class: ImageTool as unknown as ToolConstructable,
    config: {
      uploader: {
        uploadByFile: async (file: File) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); 

            reader.onload = () => {
              const images = JSON.parse(localStorage.getItem("editorImages") || "[]");
              images.push({ name: file.name, base64: reader.result });
              localStorage.setItem("editorImages", JSON.stringify(images));

              resolve({
                success: 1,
                file: {
                  url: URL.createObjectURL(file),
                  name: file.name,
                },
              });
            };

            reader.onerror = (error) => reject(error);
          });
        },
      },
    },
  },
  raw: Raw as unknown as ToolConstructable,
  quote: Quote as unknown as ToolConstructable,
  marker: Marker as unknown as ToolConstructable,
  checklist: CheckList as unknown as ToolConstructable,
  delimiter: Delimiter as unknown as ToolConstructable,
  inlineCode: InlineCode as unknown as ToolConstructable,
  simpleImage: SimpleImage as unknown as ToolConstructable,
  underline: Underline as unknown as ToolConstructable,
};
