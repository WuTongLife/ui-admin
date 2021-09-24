declare namespace Common {
  interface IFile {
    name: string;
    src?: string;
    status?: "normal" | "exception" | "active" | "success";
    percent?: number;
    preview?: any;
    uid: number | string;
    originFileObj?: Blob;
    [key: string]: any;
  }
}
