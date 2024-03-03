## 报错：fatal: unable to access 'https://github.com/.../.git': Could not resolve host: github.com


## 解决方案：
    git config --global http.proxy 127.0.0.1:7890
    git config --global https.proxy 127.0.0.1:7890

原文地址：https://blog.csdn.net/qq_38415505/article/details/83687207