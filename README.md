为了便于开发者理解和上手企业微信的 Api 开发，我们整理了企业微信使用最高频的几个接口示例，并将代码托管在 [Github 仓库](https://github.com/WecomTeam/CodeSamples "Github 仓库") 中，开发者可根据需要下载或者 Clone 至本地进行安装和运行，同时示例中的代码也可直接用于实际的项目开发。

本项目代码示例包含企业微信开放平台常用 Api 的使用示例，该项目基于 `Express` 与 `VueCli` 构建。

参考以下操作，下载示例代码并完成服务部署：

## 下载官方示例代码

打开命令行工具，执行以下命令，下载服务端代码。

```bash
git clone https://github.com/WecomTeam/CodeSameples.git
```

## 配置项目信息

打开下载的代码工程，在根目录将 `main.config.demo.js` 复制一份到 `main.config.js` 文件中，并根据实际项目情况补充以下配置信息：

> **提示：**该文件配置的信息极其重要，切勿泄漏。

```javascript
{
	// 对应群聊机器人的 Webhook URL
	webhookurl : 'PLEASE_INPUT_YOUR_WEBHOOK_URL'
}
module.exports = {
	// 企业corpid
    corpid:'YOUR_CORP_ID',
    secret:{
		// 自建应用secret
        common: 'YOUR_APP_SECRET',
		// 通讯录管理secret
        contact: 'YOUR_CONTACT_SECRET',
		// 外部联系人管理secret
        external: 'YOUR_EXTERNAL_CONTACT_SECRET'
    }
}
```

## 安装项目依赖

在已下载的示例代码项目根目录下，执行以下代码完成依赖安装：
```bash
# with npm
npm install 
# with yarn
yarn i
```

## 启动服务

执行以下命令，启动后端服务

```bash
# with npm
npm run start
# with yarn
yarn  start
```

## 访问服务

在浏览器中访问 http://localhost:3000/#/ 检查服务是否启动成功。显示如下页面表示启动成功。

![](https://wework.qpic.cn/wwpic/146295_LOOQ6mBuQXCIATH_1630067089/0)