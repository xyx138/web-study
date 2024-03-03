## 报错：fatal: unable to access 'https://github.com/.../.git': Could not resolve host: github.com


## 解决方案：
    git config --global --unset http.proxy 
    git config --global --unset https.proxy
