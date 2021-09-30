import request from "@/utils/request";

export async function createArticle(params: API.IArticleDto) {
  return request<API.IResponse>(`/api/article/cteate`, {
    method: "POST",
    data: params
  });
}
