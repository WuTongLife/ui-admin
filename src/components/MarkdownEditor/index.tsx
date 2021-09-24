import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/theme/pastel-on-dark.css";

import "codemirror/lib/codemirror.js";

import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/xml-fold.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/vue/vue.js";
import "codemirror/mode/markdown/markdown.js";

import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/sql-hint";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/hint/css-hint";
import "codemirror/addon/hint/show-hint.css";

import { UnControlled as CodeMirror } from "react-codemirror2";
import marked from "marked";
import hljs from "highlight.js";
import classnames from "classnames";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/atom-one-dark.css";
import styles from "./index.module.less";

import {
  BoldOutlined,
  CalendarOutlined,
  ClearOutlined,
  DesktopOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  QuestionCircleOutlined,
  RightOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import { Space } from "antd";
import { useMarkdownHook } from "./hook";
import { useDebounceFn, useFullscreen } from "ahooks";
import TableTool from "./components/TableTool";
import LinkOutLinedTool from "./components/LinkOutLinedTool";
import PictureTool from "./components/PictureTool";

interface IMarkdownEditorProps {
  theme?: "default" | "pastel-on-dark";
  fullScreen?: boolean;
  content: string;
}

const MarkdownEditor = forwardRef(({ theme = "default", fullScreen, content }: IMarkdownEditorProps, ref) => {
  const [mirrorRef, tool, options] = useMarkdownHook();
  const [markHtml, setMarkHtml] = useState<string>("");
  const [isFullscreen, { toggleFull }] = useFullscreen(document.documentElement);
  const editorOnChange = useDebounceFn(
    (editor, data, value) => {
      setMarkHtml(marked(value));
      localStorage.setItem("marked", value);
    },
    { wait: 100 }
  );

  useEffect(() => {
    setMarkHtml(marked(content));
  }, [content]);

  useEffect(() => {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      breaks: true,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });
  }, []);

  useImperativeHandle(ref, () => ({
    editor: mirrorRef.current.editor
  }));

  // 上传内容图
  const uploadContent = useCallback((src) => {
    const editor = mirrorRef.current?.editor;
    let { ch, line } = editor.getCursor();
    editor.replaceRange(`![avatar](${src})`, { ch, line });
  }, []);

  return (
    <div
      className={classnames({
        [styles["editor-default"]]: theme === "default",
        [styles["editor-pastel-on-dark"]]: theme === "pastel-on-dark",
        [styles["editor-fullscreen"]]: options.fullScreen || fullScreen,
        [styles["editor-preview"]]: !options.fullPreview, // 开启、关闭全屏预览
        [styles["editor-close"]]: !options.isOpenPreview // 开启、关闭实时预览
      })}
    >
      <Space className={styles["editor-tool"]}>
        <BoldOutlined title="加粗" onClick={tool.toBlod} />
        <StrikethroughOutlined title="删除线" onClick={tool.toDeleteLine} />
        <ItalicOutlined title="斜体" onClick={tool.toItalics} />
        <UnorderedListOutlined title="无序列表" onClick={tool.toUnorderedList} />
        <OrderedListOutlined title="有序列表" onClick={tool.toOrderedList} />
        <UnderlineOutlined title="下划线" onClick={tool.toUnderLine} />
        <RightOutlined title="引用" onClick={tool.toReference} />
        <span onClick={() => tool.toTitle(1)}>H1</span>
        <span onClick={() => tool.toTitle(2)}>H2</span>
        <span onClick={() => tool.toTitle(3)}>H3</span>
        <span onClick={() => tool.toTitle(4)}>H4</span>
        <span onClick={() => tool.toTitle(5)}>H5</span>
        <span onClick={() => tool.toTitle(6)}>H6</span>
        <LinkOutLinedTool title="链接" toAddLink={tool.toReplaceSelection} />
        <PictureTool title="添加图片" uploadAfter={uploadContent} />
        <TableTool getTableString={tool.getSelectionValue} onClick={tool.toReplaceSelection} />
        <CalendarOutlined title="日期时间" onClick={tool.toDateTime} />
        <ClearOutlined title="清空" onClick={tool.toClear} />
        {options.isOpenPreview ? (
          <EyeInvisibleOutlined title="关闭实时预览" onClick={tool.toPreview} />
        ) : (
          <EyeOutlined title="开启实时预览" onClick={tool.toPreview} />
        )}
        <DesktopOutlined title="全窗口预览" onClick={tool.fullScreenPreview} />
        {isFullscreen ? (
          <FullscreenExitOutlined title="缩小" onClick={toggleFull} />
        ) : (
          <FullscreenOutlined title="放大" onClick={toggleFull} />
        )}
        <QuestionCircleOutlined title="使用帮助" />
      </Space>
      <div className={styles["editor-content"]}>
        <div>
          {useMemo(
            () => (
              <CodeMirror
                ref={mirrorRef}
                // className={styles["editor-code"]}
                value={content}
                options={{
                  theme,
                  mode: "markdown",
                  lineNumbers: true,
                  lineWrapping: true,
                  foldGutter: true,
                  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
                }}
                onChange={editorOnChange.run}
              />
            ),
            [content]
          )}
        </div>
        {/* <ReactMarkdown
          className="markdown-body"
          children={markHtml}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ref, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={vs}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        /> */}
        <div
          className={styles["html-detail"]}
          dangerouslySetInnerHTML={{
            __html: markHtml
          }}
        />
      </div>
    </div>
  );
});

export default MarkdownEditor;
