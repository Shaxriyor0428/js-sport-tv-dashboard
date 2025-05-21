import React, { useRef, useEffect, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { UseFormSetValue, UseFormGetValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { EDITOR_JS_TOOLS } from "@/components/editor/Tools";
import { INewsData } from "@/types";

interface FormData {
  content: string;
}

interface EditorProps {
  setValue: UseFormSetValue<FormData>;
  getValues: UseFormGetValues<FormData>;
  handleClose: () => void;
  handleBack: () => void;
  element?: INewsData;
  isDirty: boolean;
}

const Editor: React.FC<EditorProps> = ({
  getValues,
  setValue,
  handleClose,
  handleBack,
  element,
  isDirty,
}) => {
  const editorRef = useRef<EditorJS | null>(null);
  const [editorData, setEditorData] = useState<OutputData | null>(null);

  useEffect(() => {
    if (!editorData) {
      const content = getValues("content");
      try {
        setEditorData(content ? JSON.parse(content) : { blocks: [] });
      } catch (error) {
        console.error("Invalid JSON format in content", error);
        setEditorData({ blocks: [] });
      }
    }
  }, [getValues]);

  useEffect(() => {
    if (!editorRef.current && editorData) {
      const editor = new EditorJS({
        holder: "editor-container",
        autofocus: true,
        tools: EDITOR_JS_TOOLS,
        data: (() => {
          const content = getValues("content");
          try {
            return content ? JSON.parse(content) : { blocks: [] };
          } catch (error) {
            console.error("Invalid JSON format in content", error);
            return { blocks: [] };
          }
        })(),
        onChange: async () => {
          if (editorRef.current) {
            const content = await editorRef.current.save();
            setEditorData(content);
            setValue("content", JSON.stringify(content), { shouldDirty: true }); // ✅
          }
        },
      });

      editorRef.current = editor;
    }
  }, [getValues, editorData]);

  const handleSubmit = async () => {
    if (editorRef.current) {
      const content: OutputData = await editorRef.current.save();
      setValue("content", JSON.stringify(content), { shouldDirty: true }); // ✅
      handleClose();
    }
  };

  return (
    <div className="px-6 max-h-[60vh] overflow-y-auto pr-1">
      <div className="mb-4">
        <h2 className="text-xl font-semibold pt-4">Yangilik matni</h2>
        <p className="text-[#929CAC] font-medium text-sm text-end">Qadam 2/2</p>
      </div>

      <div className="editor-container border border-[#ccc] rounded-lg p-3">
        <div id="editor-container" className="min-h-[200px]" />
      </div>

      <div className="flex justify-end gap-5 mt-4">
        <Button type="button" onClick={handleBack}>Back</Button>
        <Button type="button" onClick={handleSubmit} disabled={!isDirty}>
          {element?.id ? "O'zgartirish" : "Yaratish"}
        </Button>
      </div>
    </div>
  );

};

export default Editor;
