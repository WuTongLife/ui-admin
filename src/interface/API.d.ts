declare namespace API {
  interface IResponse<T = any> {
    code: number;
    msg: string;
    data?: T;
  }

  type IUploadResponse = IResponse<
    { uploaded: boolean; path: string; src: string; message: string; fileName: string; id: number }[]
  >;
}
