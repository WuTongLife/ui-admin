import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import vitePluginImp from "vite-plugin-style-import"; //实现按需加载样式
// import myPlugin from "./plugins/entry";
const { resolve } = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    vitePluginImp({
      libs: [
        {
          libraryName: "antd",
          resolveStyle: (name) => `antd/es/${name}/style`
        }
      ]
    })
    // myPlugin()
  ],
  define: {
    __CONST_DEFINE__: "0" // window.__CONST_DEFINE__
  },
  // base: "http://qk.qqcywzc.cn/", // index.html引用其他js,css的公共基础路径
  build: {
    // rollupOptions: {
    //   input: {
    //     main: resolve(__dirname, "index.html"),
    //   },
    //   output: {
    //     entryFileNames: (info) => {
    //       return `assets/[name].${Math.random().toString(36).substr(2)}.js`;
    //     }
    //   }
    // }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#3EBFBF",
          "@border-color-base": "#647D8B",
          "@border-color-split": "#233F4C",
          "@input-placeholder-color": "#8FA1AD",
          "@checkbox-check-color": "#edffff",
          "@input-number-handler-active-bg": "#edffff",
          "@heading-color": "#8C9DA5",
          "@btn-primary-color": "#edffff",
          "@icon-color-hover":"#8C9DA5",
          "@text-color": "#8C9DA5",
          "@text-color-secondary": "#edffff",
          "@component-background": "#172E3B",
          "@input-bg": "rgba(0,0,0,0)",
          "@menu-item-height": "48px",
          "@menu-inline-toplevel-item-height": "48px"
        },
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  server: {
    port: 3010
  }
});
