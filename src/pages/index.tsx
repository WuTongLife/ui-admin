import UploadModal from "@/components/Upload/UploadModal";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import React, { useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";

const Index = (props: any) => {
  const intl = useIntl();
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      {intl.formatMessage({ id: "menu.home" })}
      <UploadModal />
      <FormattedMessage id="menu.home" />
      <img src="https://static.qqcywzc.cn/images/20210918/14130579.jpg" />
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        multiple
        headers={{
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiOGQ5NjllZWY2ZWNhZDNjMjlhM2E2MjkyODBlNjg2Y2YwYzNmNWQ1YTg2YWZmM2NhMTIwMjBjOTIzYWRjNmM5MiIsImlhdCI6MTYzMTk0NDk1MSwiZXhwIjoxNjMxOTUyMTUxfQ.UzQyxam531ZEzmSurk_AtpefyAvFy6YA3R-Vbyx7Uyw"
        }}
        action="/api/upload/file"
      >
        {uploadButton}
      </Upload>
    </div>
  );
};
// export default Index;
export default Index;
