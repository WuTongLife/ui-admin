declare namespace Store {
  interface Action<T, P = {}> {
    type: T;
    payload: P;
  }
}
