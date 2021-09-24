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
  /** 获取选中的值 */
  getSelectionValue: () => string;
  /** 替换选择的内容 */
  toReplaceSelection: (str: string) => void;
  /** 加粗 */
  toBlod: () => void;
  /** 删除线 */
  toDeleteLine: () => void;
  /** 斜体 */
  toItalics: () => void;
  /** 下划线 */
  toUnderLine: () => void;
  /** 标题 */
  toTitle: (num: number) => void;
  toFullScreen: () => void;
  /** 开启/关闭预览窗口 */
  toPreview: () => void;
  /** 全窗口预览 */
  fullScreenPreview: () => void;
  /** 无序列表 */
  toUnorderedList: () => void;
  /** 有序列表 */
  toOrderedList: () => void;
  /** 引用 */
  toReference: () => void;
  /** 添加时间 */
  toDateTime: () => void;
  /** 清空 */
  toClear: () => void;
}

interface MarkdownToolOptions {
  fullScreen: boolean;
  isOpenPreview: boolean;
  fullPreview: boolean;
}

const getWeek = (date?: Date) => {
  // 参数时间戳
  let week = moment(date).day();
  switch (week) {
    case 1:
      return "星期一";
    case 2:
      return "星期二";
    case 3:
      return "星期三";
    case 4:
      return "星期四";
    case 5:
      return "星期五";
    case 6:
      return "星期六";
    case 0:
      return "星期天";
  }
};
