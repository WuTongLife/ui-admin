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
import classNames from "classnames";
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
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./preview.less";

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
      setMarkHtml(value);
      localStorage.setItem("marked", value);
    },
    { wait: 100 }
  );

  useEffect(() => {
    setMarkHtml(content);
  }, [content]);

  useImperativeHandle(ref, () => ({
    editor: mirrorRef.current.editor
  }));

  // ???????????????
  const uploadContent = useCallback((src) => {
    const editor = mirrorRef.current?.editor;
    let { ch, line } = editor.getCursor();
    editor.replaceRange(`![avatar](${src})`, { ch, line });
  }, []);

  return (
    <div
      className={classNames({
        [styles["editor-default"]]: theme === "default",
        [styles["editor-pastel-on-dark"]]: theme === "pastel-on-dark",
        [styles["editor-fullscreen"]]: options.fullScreen || fullScreen,
        [styles["editor-preview"]]: !options.fullPreview, // ???????????????????????????
        [styles["editor-close"]]: !options.isOpenPreview // ???????????????????????????
      })}
    >
      <Space className={styles["editor-tool"]}>
        <BoldOutlined title="??????" onClick={tool.toBlod} />
        <StrikethroughOutlined title="?????????" onClick={tool.toDeleteLine} />
        <ItalicOutlined title="??????" onClick={tool.toItalics} />
        <UnorderedListOutlined title="????????????" onClick={tool.toUnorderedList} />
        <OrderedListOutlined title="????????????" onClick={tool.toOrderedList} />
        <UnderlineOutlined title="?????????" onClick={tool.toUnderLine} />
        <RightOutlined title="??????" onClick={tool.toReference} />
        <span onClick={() => tool.toTitle(1)}>H1</span>
        <span onClick={() => tool.toTitle(2)}>H2</span>
        <span onClick={() => tool.toTitle(3)}>H3</span>
        <span onClick={() => tool.toTitle(4)}>H4</span>
        <span onClick={() => tool.toTitle(5)}>H5</span>
        <span onClick={() => tool.toTitle(6)}>H6</span>
        <LinkOutLinedTool title="??????" toAddLink={tool.toReplaceSelection} />
        <PictureTool title="????????????" uploadAfter={uploadContent} />
        <TableTool getTableString={tool.getSelectionValue} onClick={tool.toReplaceSelection} />
        <CalendarOutlined title="????????????" onClick={tool.toDateTime} />
        <ClearOutlined title="??????" onClick={tool.toClear} />
        {options.isOpenPreview ? (
          <EyeInvisibleOutlined title="??????????????????" onClick={tool.toPreview} />
        ) : (
          <EyeOutlined title="??????????????????" onClick={tool.toPreview} />
        )}
        <DesktopOutlined title="???????????????" onClick={tool.fullScreenPreview} />
        {isFullscreen ? (
          <FullscreenExitOutlined title="??????" onClick={toggleFull} />
        ) : (
          <FullscreenOutlined title="??????" onClick={toggleFull} />
        )}
        <QuestionCircleOutlined title="????????????" />
      </Space>
      <div className={styles["editor-content"]}>
        <div>
          {useMemo(
            () => (
              <CodeMirror
                ref={mirrorRef}
                className={styles["editor-code"]}
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
        <div className="markdowm-html">
          <ReactMarkdown
            className="write"
            children={markHtml}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ref, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              ul({ node, className, children, ref, ...props }) {
                return (
                  <ul className={classNames(className, { "ul-list": className === "contains-task-list" })} {...props}>
                    {children}
                  </ul>
                );
              },
              li({ node, className, children, ref, ...props }) {
                let checked = false;
                React.Children.forEach(children, (d) => {
                  if (React.isValidElement(d) && d.type === "input") {
                    checked = d.props.checked;
                  }
                });
                return (
                  <li
                    className={classNames(className, {
                      "md-task-list-item task-list-done": className === "task-list-item",
                      "task-list-done": checked,
                      "task-list-not-done": !checked
                    })}
                    {...props}
                  >
                    {children}
                  </li>
                );
              }
            }}
          />
        </div>
      </div>
    </div>
  );
});

export default MarkdownEditor;
