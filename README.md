# NYUSH Rates Development Guide
## 简介 📖：
目前采用React + Ant.d + SpringBoot 前后端分离的单页面应用(SPA)作为开发思路。
## 开发前准备 🕙：
1.前端：克隆后进入根目录执行`npm install`命令即可。

2.后端：统一使用jdk 11进行开发。
## 注意事项 ⚠️：
### 前端
目前webpack, React路由均已配置完毕，修改上述️配置文件时记得通知其他成员。
## 目录结构 🗄 :
```bash
NYU-Rates  
├─ LICENSE  
├─ README.md  
├─ package-lock.json    # nodejs 配置文件  
├─ package.json         # nodejs 配置文件  
├─ public               # webpack打包目录  
│    └─ index.html      # 入口html文件
├─ src                  # 源代码文件目录  
│    ├─ css  
│    │    └─ *.css  
│    └─ js  
│        └─ *.js  
└─ webpack.config.js    # webpack 配置文件
```
