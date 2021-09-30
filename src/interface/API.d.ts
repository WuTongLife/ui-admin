declare namespace API {
  interface IResponse<T = any> {
    code: number;
    msg: string;
    data?: T;
  }

  type IUploadResponse = IResponse<
    { uploaded: boolean; path: string; src: string; message: string; fileName: string; id: number }[]
  >;

  /** 登录传参 */
  interface ILoginParams {
    username: string;
    password: string;
  }

  interface IArticleDto {
    title: string;
    coverImg?: string;
    content: string;
    status?: number;
    editorType?: number;
  }
}
