import request from "@/utils/request";

export async function fetchCurrentUser() {
  return request<API.IResponse<Entity.User>>(`/api/user/currentUser`);
}
