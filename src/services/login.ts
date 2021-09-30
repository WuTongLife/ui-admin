import request from "@/utils/request";

export async function login(params: API.ILoginParams) {
  return request<API.IResponse>(`/api/auth/login`, {
    method: "POST",
    data: params
  });
}
