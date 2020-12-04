# run-hol-code README

从0.0.2版本开始已发布至vscode插件商店，[点此跳转](https://marketplace.visualstudio.com/items?itemName=Renping.run-hol-code)。

## 插件设置

* `Auto`: 设置在使用lines功能时是否自动放入`e ( );`内执行，默认不开启。
* `HolPath`: 设置运行HOL的绝对路径，一般是HOL目录下的`bin/hol`文件，如`/home/xxx/HOL/bin/hol`。
  - 该设置的默认值为`hol`，在HOL目录下使用指令`sudo ln -r -s bin/hol /bin/hol`创建映射后，方可使用`hol`指令快捷启动。

## 插件功能

* `run-hol-code.cd`: 在终端中进入当前文件所在目录
* `run-hol-code.hol`: 在终端中使用hol运行该文档
* `run-hol-code.lines`: 在终端中运行选择的代码

## 插件安装方法

**推荐：在vscode插件商店搜索`run-hol-code`安装。**

或者：  
1. 下载`run-hol-code-x.x.x.vsix`文件
2. vscode - 扩展 - 更多操作 - 从VSIX安装...
3. 重新启动vscode  
![安装图示](https://raw.githubusercontent.com/Satone7/run-hol-code/master/image/install.png)


## Release Notes

避免在调试对策时重复写`e ( );`，方便后序整理成策略。

## run-hol-code-0.0.1

第一个测试版本。

## run-hol-code-0.0.2

增加了自动添加`e ( );`的选项，默认不开启。

## run-hol-code-0.0.3

更新上版本写错的README..

## 0.04

增加"format"功能，将选中的若干`e();`格式编写的对策格式化为`>>`方法连接的形式。

## Github

[Satone7/run-hol-code](https://github.com/Satone7/run-hol-code)

**Enjoy!**
