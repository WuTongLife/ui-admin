declare namespace Store {
  type Types = InitStateType;
  interface Action<P = {}> {
    type: Types;
    payload?: P;
  }

  interface Models {
    initState: InitStateValue;
  }

  type InitStateType = "SAVE_CURRENT_USER";
  type InitStateValue = {
    currentUser?: Entity.User;
  };
  type InitStateAction = Action<InitStateValue>;
}
