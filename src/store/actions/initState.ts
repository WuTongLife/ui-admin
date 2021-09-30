export const SAVE_CURRENT_USER = "SAVE_CURRENT_USER";

// 获取当前用户
export function saveCurrentUserAction(payload: Store.InitStateValue): Store.InitStateAction {
  return { type: SAVE_CURRENT_USER, payload };
}
