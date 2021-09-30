import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, Input, message, Select, Tooltip, Layout } from "antd";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/javascript/javascript.js";
import "highlight.js/styles/monokai-sublime.css";
import MarkdownEditor from "@/components/MarkdownEditor";
import "./index.less";
import { PictureOutlined, UserOutlined } from "@ant-design/icons";

const prefixCls = "blog-editor";
const { Header } = Layout;

const Index = (props: any) => {
  const articleId = props.match.params.id;
  const [article, setArticle] = useState<Partial<Entity.Article>>();
  const codeMirrorRef = useRef<any>(null);
  // 标题，图片，标签
  const [params, setParams] = useState<Partial<Entity.Article>>({
    article_title: undefined,
    article_cover_img: undefined,
    label_id: undefined
  });

  useEffect(() => {
    if (articleId) {
      // codeMirrorRef.current.editor.setValue(res.data.article_content);
    } else {
      codeMirrorRef.current?.editor?.setValue(localStorage.getItem("marked") || "");
    }
  }, []);

  const saveArticle = (isDraft: boolean) => {
    if (!params.article_title) {
      message.error("请填写标题");
      return;
    }
    if (!params.label_id) {
      message.error("请选择标签");
      return;
    }
    const { editor } = codeMirrorRef.current || {};
    if (articleId) {
      // articleOperate.updateArticle({
      //   ...params,
      //   article_id: articleId,
      //   article_content: editor?.getValue(),
      //   article_status: isDraft ? 2 : 1,
      //   article_cover_img: params.article_cover_img || article?.article_cover_img
      // });
    } else {
      // articleOperate.createArticle({
      //   ...params,
      //   article_content: editor?.getValue(),
      //   article_status: isDraft ? 2 : 1,
      //   article_cover_img: params.article_cover_img || article?.article_cover_img
      // });
    }
  };

  return (
    <div className={prefixCls}>
      <Header className={`${prefixCls}-header`}>
        <Input
          placeholder="输入文章标题"
          value={params.article_title}
          onChange={(e) => setParams({ ...params, article_title: e.target.value })}
        />
        <div className={`${prefixCls}-header-right`}>
          <Button type="primary" onClick={() => saveArticle(true)}>
            保存为草稿
          </Button>
          <Button type="primary" onClick={() => saveArticle(false)}>
            发布
          </Button>
          <Tooltip
            placement="bottom"
            overlayInnerStyle={{ backgroundColor: "#474545" }}
            title={
              <div className={`${prefixCls}-header-right-upload`}>
                {params.article_cover_img ? (
                  <img width="100%" height="100%" src={params.article_cover_img} />
                ) : (
                  "点击上传文件"
                )}
              </div>
            }
          >
            <PictureOutlined style={{ color: "gray" }} onClick={() => {}} />
          </Tooltip>
          <Select
            placeholder="请选择标签"
            style={{ width: 120 }}
            onSelect={(label_id) => setParams({ ...params, label_id })}
            value={params.label_id}
          >
            {[{ id: 1, name: "javascript" }].map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <Avatar style={{ backgroundColor: "#9CD8EF" }} size={40} />
        </div>
      </Header>
      <MarkdownEditor ref={codeMirrorRef} theme="pastel-on-dark" content={article?.article_content || ""} />
    </div>
  );
};
export default Index;
