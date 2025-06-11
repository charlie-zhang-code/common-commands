import { defineConfig } from "vitepress";
import { getSidebarData, getNavData } from "./navSidebarUtil";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/common-commands/",
  title: "Common Commands",
  description: "个人常用命令 & 代码片段等速查手册",
  lastUpdated: true,
  themeConfig: {
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    search: {
      provider: "local",
    },
    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
    },
    nav: getNavData(),
    sidebar: getSidebarData(),
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' }
    // ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],
    socialLinks: [
      { icon: "github", link: "https://github.com/charlie-zhang-code" },
    ],
  },
});
