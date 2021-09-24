import request from "@/utils/request";

export async function manualUpload(params: any) {
  return request<API.IUploadResponse>(`/api/upload/files`, {
    method: "POST",
    data: params,
  });
}
