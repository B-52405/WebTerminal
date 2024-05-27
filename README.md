<div style="display: flex; height: 200px; justify-content: center; align-items: center;">
    <img src="./dist/webterminal.png" alt="Description" style="margin: 0; height: 100%">
</div>

# WebTerminal

WebTerminal 是一个基于 Vue 编写的前端组件，可以在浏览器中实现一个终端程序，并允许用户使用纯JS编写在其上运行的控制台应用。

# 说明

* WebTerminal 并非可以下载并在计算机上运行的应用程序，它更像是一个网页上的终端模拟器，它模仿了真正的终端的行为，使用户编写的JS程序像普通的控制台应用一样运行。
* WebTerminal 为了更好地模拟终端的各种输出，实现了一个自己的命令解析接口：`commanding`。不用担心，这个接口的使用十分简单，如果你曾经使用过诸如 commander 之类的库，那么一瞬间就能上手。
* WebTerminal 并非真正的终端，它只能运行使用用户自己编写的，使用 `commanding` 注册了的JS程序。

# 开始使用

推荐的使用方式是 Vite + Vue。 

* 安装 WebTerminal :

```
// npm
npm install @b52405/webterminal

// yarn
yarn add @b52405/webterminal

// ES6 见下方示例
```

* WebTerminal 像所有其他 Vue 组件一样使用。 

```
import { createApp } from 'vue'
import { Terminal } from "@b52405/webterminal"
import "@b52405/webterminal/dist/style.css"

createApp(Terminal).mount('#web_terminal_app')
```

* 也可以通过CDN方式引入:

```
<!DOCTYPE html>
<html>

<head>
    <title>Web Terminal</title>
    <link rel="stylesheet" href="https://unpkg.com/@b52405/webterminal@1.1.0/dist/style.css">
    <style>
        body {
            margin: 0;
        }
        #web_terminal_app {
            box-sizing: border-box;
            height: 100vh;
        }
    </style>
</head>

<body>
    <div id="web_terminal_app"></div>
    <script type="module">
        import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
        import { Terminal } from 'https://unpkg.com/@b52405/webterminal@1.1.0/dist/webterminal.es.js'
        import "@b52405/webterminal/dist/style.css"

        commanding
            .Command("hello")
            .Description("Say hello to the world.")
            .Param({ name: "name", type: "String", default: "world", description: "Say hello to who." })
            .Option({ name: "ending", type: "String", default: "!", short: "e", description: "Punctuation." })
            .Option({ name: "hide", type: "Boolean", short: "s", description: "Whether to display punctuation marks." })
            .Action((name, ending, hide) => {
                return `hello ${name}${(!hide) ? ending : ""}`
            })

        createApp(Terminal).mount("#web_terminal_app")
    </script>
</body>

</html>
```

# 定义自己的命令

WebTerminal 自带两个命令：`help` 和 `color`。你可以使用 `help` 命令查看他们的用法。例如:

```
WebTerminal> help color
```

显然，原生命令的功能极其有限，因而需要用户自定义命令。上文提到的 `commanding` 提供了足够普通需求使用的自定义选项。

### 使用 `Commanding`

```
import { commanding } from "@b52405/webterminal"

commanding
    //命令名
    .Command("hello")

    //命令说明，help命令会打印各个命令的说明
    .Description("Say hello to the world.")

    //每个命令可以有多个参数
    //声明参数时，name，type，default是必选项
    //name不能带有空格
    //type必须是String，Number，Float的其中一种
    .Param({name: "name", type: "String", default: "world", description: "Say hello to who"})

    //每个命令可以有多个选项
    //声明非Boolean选项时，name，type，default是必选项
    //声明Boolean选项时，name，type是必选项
    //name不能带有空格
    //type必须是String，Number，Float，Boolean的其中一种
    .Option({name: "ending", type: "String", default: "!", short: "e", description: "Punctuation"})
    .Option({name: "show", type: "Boolean", short: "s" ,description: "Whether to display punctuation marks"})

    //命令的行为函数
    //所有形参的顺序必须和之前声明的参数和选项的顺序一致
    //命令的行为函数允许有三种格式的返回值：
    //  1. 字符串：输出在终端中会被打印成一行
    //  2. 字符串数组：每个字符串打印成一行
    //  3. 每次yield一个字符串的生成器：每个字符串打印成一行
    .Action((name, ending, show)=>{
        return `hello ${name}${show ? ending : ""}`
    })

commanding
    //删除命令
    .Remove("hello")
    .Remove("color")
```

# 定义命令的输出

WebTerminal 提供的 `Clause` API 允许用户以终端输出的字符串的片段为单位，自定义每个片段的样式和点击事件。

### 使用 `Clause`

Clause本质上是用于输出到终端的字符串片段，多个Clause共同组成终端输出中的一行。在定义命令的行为函数时，返回值中每一个字符串都可以用等价的Clause数组代替。

* Clause 基础功能

```
import { Clause } from "@b52405/webterminal"

//命令行为函数示例
function example_command_action(){
    //等价于 return "hello world!"
    //等价于 return [Clause("hello "), Clause("world!")]
    //等价于 return [Clause("hello world!")]
    return [Clause("hello"), " ", Clause("world")]
}
```

* 自定义 Clause

```
import { Clause } from "@b52405/webterminal"

//命令行为函数示例
function example_command_action(){
    const clause =  Clause("hello")
        //为文本添加一个css类
        .Cls("example_css_class")

        //设置多个css类
        //Clss方法会使所有在这之前设置的css类无效
        .Clss(["example_css_class_1","example_css_class_2"])

        //添加一个内联样式
        .Property("background-color","blue")

        //设置多个内联样式
        //Style方法会使所有在这之前设置的内联样式无效
        .Style({"background-color": "red", color: "blue"})

        //添加点击事件的响应
        .Click(()=>{
            console.log("click")
        })

    //命令的行为函数的返回值不能是单个Clause，可以是Clause数组
    //对于终端来说，Clause数组相当于一个string
    return [clause]
}
```

# 终端设置

终端本身的设置选项包括：
* prompt：提示符
* prompt_visibility：提示符可见性
* background_color：终端背景颜色
* font_color：字体颜色
* logging_interval：打印每一行的时间间隔，单位：ms

### 设置终端

```
import { setting } from "@b52405/webterminal"

setting.prompt = "WebTermianl> "
setting.prompt_visibility = true
setting.background_color = "gray"
setting.font_color = "white"
setting.logging_interval = 24
```
