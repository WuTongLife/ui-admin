import PageLoading from "@/components/PageLoading";
import Loadable from "react-loadable";

export default (loader: Promise<any>) => {
  return Loadable({
    loader: () => loader.then((d) => d.default),
    delay: 300,
    timeout: 60000,
    loading: PageLoading
  });
};
