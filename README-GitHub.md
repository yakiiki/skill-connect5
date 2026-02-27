# GitHub Pages 部署指南

## 📁 文件说明

您需要将以下文件上传到 GitHub 仓库：

```
graduation-project/
├── index.html              # 主页面（已准备好）
├── thesis-generator-app.js # JavaScript 逻辑（已准备好）
└── README.md               # 项目说明
```

## 🚀 部署步骤

### 第一步：创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 **+** → **New repository**
3. 填写仓库信息：
   - **Repository name**: `thesis-generator`（或您喜欢的名字）
   - **Description**: 关务与外贸服务毕业设计生成器
   - **Public**: 选中（GitHub Pages 需要公开仓库）
   - **Initialize this repository with a README**: 可选
4. 点击 **Create repository**

### 第二步：上传文件

#### 方法 A：通过 GitHub 网页上传

1. 在新创建的仓库页面，点击 **Add file** → **Upload files**
2. 将 `index.html` 和 `thesis-generator-app.js` 拖放到上传区域
3. 填写提交信息：`添加论文生成器文件`
4. 点击 **Commit changes**

#### 方法 B：通过 Git 命令行上传

```bash
# 克隆仓库到本地
git clone https://github.com/您的用户名/thesis-generator.git
cd thesis-generator

# 复制文件到仓库目录
# （将您的文件复制到此目录）

# 添加文件到 Git
git add index.html thesis-generator-app.js

# 提交更改
git commit -m "添加论文生成器"

# 推送到 GitHub
git push origin main
```

### 第三步：启用 GitHub Pages

1. 在仓库页面，点击 **Settings**（设置）
2. 左侧菜单选择 **Pages**
3. **Source** 部分选择：
   - Branch: `main`（或 `master`）
   - Folder: `/ (root)`
4. 点击 **Save**
5. 等待 1-2 分钟，页面会显示您的网站地址：
   ```
   Your site is live at https://您的用户名.github.io/thesis-generator/
   ```

## 📝 项目 README 模板

创建 `README.md` 文件，内容如下：

```markdown
# 📚 关务与外贸服务毕业设计生成器

纯前端实现的毕业设计论文生成工具，支持 GitHub Pages 部署。

## ✨ 功能特点

- 🤖 **生成模式**：从任务书生成完整毕业设计
- 📝 **格式转换**：文字转 Word 文档
- 🎨 **格式修改**：自定义格式规则调整文档样式
- ✨ **完善模式**：将论文雏形完善成完整论文

## 🚀 在线访问

https://您的用户名.github.io/thesis-generator/

## 📖 使用说明

1. 打开网页后选择工作模式
2. 上传文件或粘贴文本内容
3. 根据需要配置参数
4. 预览效果并下载 Word 文档

## ⚠️ 免责声明

本工具仅用于学习参考，请遵守学术诚信规范。

## 🛠️ 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- GitHub Pages

---
Made with ❤️ for 关务与外贸服务专业
```

## 🔧 自定义域名（可选）

如果您有自己的域名，可以配置自定义域名：

1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容填写您的域名，例如：
   ```
   thesis.yourdomain.com
   ```
3. 在域名 DNS 设置中添加 CNAME 记录指向 `您的用户名.github.io`

## 📱 访问您的网站

部署完成后，您可以通过以下地址访问：

```
https://您的用户名.github.io/thesis-generator/
```

例如：
```
https://zhangsan.github.io/thesis-generator/
```

## 🔄 更新网站

当您修改代码后，只需重新上传文件到 GitHub，网站会自动更新（可能需要 1-2 分钟刷新）。

## ❓ 常见问题

### Q: 网站显示 404 错误？
A: 请检查：
- 文件是否上传到正确位置（根目录）
- GitHub Pages 设置是否正确启用
- 等待 1-2 分钟让更改生效

### Q: 样式没有正确加载？
A: 确保 `index.html` 和 `thesis-generator-app.js` 在同一目录下。

### Q: 如何删除网站？
A: 在仓库 Settings → Pages 中将 Source 设置为 None，或删除整个仓库。

## 📞 需要帮助？

如有问题，请在 GitHub 仓库中创建 Issue 寻求帮助。
