import moment from "moment";
import { useCallback, useMemo, useRef, useState } from "react";

const initOptions: MarkdownToolOptions = { fullScreen: false, isOpenPreview: true, fullPreview: true };

export const useMarkdownHook = (): [React.RefObject<any>, MarkdownTool, MarkdownToolOptions] => {
  const codeMirrorRef = useRef<any>(null);
  const [options, setOptions] = useState<MarkdownToolOptions>(initOptions);

  const addPrefix = useCallback((pre: string, end?: string) => {
    const source = codeMirrorRef.current;
    if (source && source.editor) {
      const selectContent = source.editor.getSelection();
      if (selectContent) {
        source.editor.replaceSelection(`${pre}${selectContent}${end === undefined ? pre : end}`);
      }
    }
  }, []);

  const operate = useMemo((): MarkdownTool => {
    return {
      toReplaceSelection: (str) => codeMirrorRef.current?.editor.replaceSelection(str),
      getSelectionValue: () => codeMirrorRef.current?.editor.getSelection(),
      toBlod: () => addPrefix("**"),
      toDeleteLine: () => addPrefix("~~"),
      toItalics: () => addPrefix("*"),
      toUnderLine: () => addPrefix("<u>", "</u>"),
      toReference: () => addPrefix("> ", ""),
      toTitle: (num) => addPrefix(`${Array(num).fill("#").join("")} `, ""),
      toFullScreen: () => setOptions((ops) => ({ ...ops, fullScreen: !ops.fullScreen })),
      toPreview: () => setOptions((ops) => ({ ...ops, isOpenPreview: !ops.isOpenPreview })),
      fullScreenPreview: () => setOptions((ops) => ({ ...ops, fullPreview: !ops.fullPreview })),
      toOrderedList: () => {
        const editor = codeMirrorRef.current?.editor;
        const selectContent = editor?.getSelection();
        const row = (selectContent.split(/\n/g) as string[]).map((i, index) => `${index + 1}. ${i}`);
        editor.replaceSelection(row.join("\n"));
      },
      toUnorderedList: () => {
        const editor = codeMirrorRef.current?.editor;
        const selectContent = editor?.getSelection();
        const row = (selectContent.split(/\n/g) as string[]).map((i) => `- ${i}`);
        editor.replaceSelection(row.join("\n"));
      },
      toDateTime: () =>
        codeMirrorRef.current?.editor.replaceSelection(`${moment().format("YYYY-MM-DD HH:mm:ss")} ${getWeek()}`),
      toClear: () => codeMirrorRef.current?.editor.setValue("")
    };
  }, []);
  return [codeMirrorRef, operate, options];
};

interface MarkdownTool {
  /** ?????????????????? */
  getSelectionValue: () => string;
  /** ????????????????????? */
  toReplaceSelection: (str: string) => void;
  /** ?????? */
  toBlod: () => void;
  /** ????????? */
  toDeleteLine: () => void;
  /** ?????? */
  toItalics: () => void;
  /** ????????? */
  toUnderLine: () => void;
  /** ?????? */
  toTitle: (num: number) => void;
  toFullScreen: () => void;
  /** ??????/?????????????????? */
  toPreview: () => void;
  /** ??????????????? */
  fullScreenPreview: () => void;
  /** ???????????? */
  toUnorderedList: () => void;
  /** ???????????? */
  toOrderedList: () => void;
  /** ?????? */
  toReference: () => void;
  /** ???????????? */
  toDateTime: () => void;
  /** ?????? */
  toClear: () => void;
}

interface MarkdownToolOptions {
  fullScreen: boolean;
  isOpenPreview: boolean;
  fullPreview: boolean;
}

const getWeek = (date?: Date) => {
  // ???????????????
  let week = moment(date).day();
  switch (week) {
    case 1:
      return "?????????";
    case 2:
      return "?????????";
    case 3:
      return "?????????";
    case 4:
      return "?????????";
    case 5:
      return "?????????";
    case 6:
      return "?????????";
    case 0:
      return "?????????";
  }
};
