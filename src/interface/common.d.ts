declare namespace Common {
  export interface IResponse<T = any> {
    code: number;
    msg: string;
    data?: T;
  }
}
