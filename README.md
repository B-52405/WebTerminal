<img src="https://unpkg.com/@b52405/webterminal/dist/webterminal.png" alt="WebTerminal" style="height: 200px">

# WebTerminal

WebTerminal 是一个基于 Vue 编写的前端组件，可以在浏览器中实现一个终端程序，并允许用户使用纯 JavaScript 编写在其上运行的控制台应用。

# 说明

* WebTerminal 并非可以下载并在计算机上运行的应用程序，它更像是一个网页上的终端模拟器，它模仿了真正的终端的行为，使用户编写的JS程序像普通的控制台应用一样运行。
* WebTerminal 为了更好地模拟终端的各种输出，实现了一个自己的命令解析接口：`Commander`，跟一个很厉害的命令解析库同名。不用担心，这个接口的使用十分简单，如果你曾经使用过类似的库，那么一瞬间就能上手。
* WebTerminal 并非真正的终端，它只能运行用户自己编写的，使用 `Commander` 注册了的 JavaScript 程序。

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

```JavaScript
import { createApp } from 'vue'
import { Terminal } from "@b52405/webterminal"
import "@b52405/webterminal/dist/style.css"

createApp(Terminal).mount('#web_terminal_app')
```

* 也可以通过CDN方式引入:

```HTML
<!DOCTYPE html>
<html>

<head>
    <title>Web Terminal</title>
    <link rel="icon" type="image/png" sizes="192x192" href="https://unpkg.com/@b52405/webterminal/dist/webterminal.png">
    <link rel="stylesheet" href="https://unpkg.com/@b52405/webterminal/dist/style.css">
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
        import { Terminal, Commander, terminal } from 'https://unpkg.com/@b52405/webterminal/dist/webterminal.es.js'

        Commander
            .Command("hello")
            .Description("Say hello to the world.")
            .Param({ name: "ending", type: "String", default: "!", description: "Punctuation." })
            .Option({ name: "hide", type: "Boolean", short: "h", description: "Whether to display punctuation marks." })
            .Action(async (ending, hide) => {
                terminal.log(" ")
                const name = await terminal.input("  name: ")
                terminal.log(`  hello ${name}${hide ? "" : ending}`)
                terminal.log(" ")
            })

        createApp(Terminal).mount("#web_terminal_app")
    </script>
</body>

</html>
```

# 定义自己的命令

WebTerminal 自带三个命令：`help` , `clear` 和 `color`。你可以使用 `help` 命令查看他们的用法。例如:

```
WebTerminal> help color
```

显然，原生命令的功能极其有限，因而需要用户自定义命令。上文提到的 `Commander` 提供了足够普通需求使用的自定义选项。

### 使用 `Commander`

```JavaScript
import { terminal, Commander } from "@b52405/webterminal"

Commander
    //命令名
    .Command("hello")

    //命令说明，help命令会打印各个命令的说明
    .Description("Say hello to the world.")

    //每个命令可以有多个参数
    //声明参数时，name，type，default是必选项
    //name不能带有空格
    //type必须是String，Number，Float的其中一种
    .Param({ name: "name", type: "String", default: "world", description: "Say hello to who" })

    //每个命令可以有多个选项
    //声明非Boolean选项时，name，type，default是必选项
    //声明Boolean选项时，name，type是必选项
    //name不能带有空格
    //type必须是String，Number，Float，Boolean的其中一种
    .Option({ name: "ending", type: "String", default: "!", short: "e", description: "Punctuation" })
    .Option({ name: "show", type: "Boolean", short: "s", description: "Whether to display punctuation marks" })

    //命令的行为函数
    //所有形参的顺序必须和之前声明的参数和选项的顺序一致
    .Action((name, ending, show) => {
        terminal.log(`hello ${name}${show ? ending : ""}`)
    })

commanding
    //可以删除无用命令
    .Remove("hello")
    .Remove("color")
```

# 定义命令的输出

命令行为函数可以通过 WebTerminal 提供的 `terminal.log` 接口向终端打印内容。此外， WebTerminal 提供的 `Clause` API 允许用户以终端输出的字符串的片段为单位，自定义每个片段的样式和点击事件。

### 试用 `terminal.log`

只建议用户在命令行为函数内部使用 `terminal.log` 。

```JavaScript
import { terminal, Clause } from "@b52405/webterminal"

//命令行为函数示例
async function example_command_action() {
    //terminal.log会将每个实参打印为终端中的一行
    terminal.log("line")
    //在终端中会打印成三行
    terminal.log("line1", "line2", "line3")
    //既不是string也不是Clause数组的参数会被解析为JSON字符串
    //这个例子中终端会打印：{"data":"something"}
    terminal.log({ data: "something" })

    //此外WebTerminal还提供了一个terminal.finish接口，用于主动结束打印并将控制权交还给终端
    //这一接口的推荐使用场景是：
    //命令行为函数可以在所有输出都已经结束，但还需要执行复杂计算等耗时操作时，主动调用terminal.finish
    //WebTerminal会拒绝terminal.finish之后的所有terminal.log
    terminal.finish()

    //不产生输出的耗时操作放在terminal.finish之后
    await setTimeout(() => { }, 1000)
}
```

### 使用 `Clause`

Clause本质上是用于输出到终端的字符串片段，多个Clause共同组成终端输出中的一行。在定义命令的行为函数时，返回值中每一个字符串都可以用等价的Clause数组代替。

* Clause 基础功能

```JavaScript
import { terminal, Clause } from "@b52405/webterminal"

//命令行为函数示例
function example_command_action(){
    //等价于 return "hello world!"
    //等价于 return [new Clause("hello "), new Clause("world!")]
    //等价于 return [new Clause("hello world!")]
    terminal.log([new Clause("hello"), " ", new Clause("world")])
}
```

* 自定义 Clause

```JavaScript
import { terminal, Clause } from "@b52405/webterminal"

//命令行为函数示例
function example_command_action() {
    const clause = new Clause("hello")
        //为文本添加一个css类
        .Cls("example_css_class")

        //设置多个css类
        //Clss方法会使所有在这之前设置的css类无效
        .Clss(["example_css_class_1", "example_css_class_2"])

        //添加一个内联样式
        .Property("background-color", "blue")

        //设置多个内联样式
        //Style方法会使所有在这之前设置的内联样式无效
        .Style({ "background-color": "red", color: "blue" })

        //添加点击事件的响应
        .Click(() => {
            console.log("click")
        })

    //命令的行为函数的返回值不能是单个Clause，可以是Clause数组
    //对于终端来说，Clause数组相当于一个string
    terminal.log([clause])
}

function example_command_action2() {

    //Clause自带三种预设
    //分别是Warning，Error和Button
    //三种预设分别表现为橙色，红色和浅绿色按钮
    const warning = new Clause("warning").Warning()
    const error = new Clause("error").Error()
    const button = new Clause("button").Button(
        //Button预设需要将一个Clause被点击时的处理函数作为参数
        () => { console.log("click button") }
    )

    //命令的行为函数的返回值不能是单个Clause，可以是Clause数组
    //对于终端来说，Clause数组相当于一个string
    terminal.log([warning, error, button])
}
```

# 终端设置

终端本身的设置选项包括：
* prompt：提示符
* prompt_visibility：提示符可见性
* background_color：终端背景颜色
* font_color：字体颜色
* logging_interval：打印每一行的时间间隔，单位：ms
* mounted：终端加载后自动调用的回调函数
* banner: 终端加载后自动打印的内容
* timeout: 无操作一段时间后自动登出，单位：ms

### 设置终端

```JavaScript
import { terminal } from "@b52405/webterminal"

terminal.setting.prompt = "WebTerminal> "
terminal.setting.prompt_visibility = true
terminal.setting.background_color = "gray"
terminal.setting.font_color = "white"
terminal.setting.logging_interval = 24
terminal.setting.mounted = () => { console.log("Terminal is ready.") }
terminal.setting.banner = ["Welcome to WebTerminal.", " "]
terminal.setting.timeout = 300000
```

# 读取用户输入

WebTerminal 允许在命令在执行的过程中主动要求读取用户在终端输入的字符串。其表现类似于C++中的cin。这一功能通过 `terminal.input` 接口实现。

```JavaScript
import { terminal } from "@b52405/webterminal"

//命令行为函数示例
async function example_command_action() {

    //终端会另起一行，显示"input message: "并等待用户输入
    //用户的输入会以string的形式返回
    const message = await terminal.input("input message: ")

    //将第二个参数设置为true可以隐藏用户输入内容
    const secret = await terminal.input("secret message: ", true)

    terminal.log(message)
}
```