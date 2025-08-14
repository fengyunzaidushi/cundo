# cundo - Claude Code Undo Tool

## 项目说明

cundo 是从原始的[ccundo](https://github.com/RonitSachdev/ccundo)项目 fork 而来的增强版本。原项目有一些 bug 但作者没有更新，因此我们创建了这个改进版本。

## 主要改进

1. **项目重命名**：从 ccundo 更名为 cundo，更简洁易记
2. **配置路径更新**：所有配置路径从`.ccundo`更改为`.cundo`
3. **代码质量改进**：修复了代码格式和样式问题
4. **错误处理增强**：改进了错误处理机制
5. **文档更新**：更新了所有文档以反映新的项目名称

## 安装方法

```bash
npm install -g cundo
```

## 使用方法

基本用法与原 ccundo 项目相同：

```bash
# 列出当前Claude Code会话中的操作
cundo list

# 预览撤销操作
cundo preview

# 执行撤销操作
cundo undo

# 重做已撤销的操作
cundo redo

# 查看和切换语言
cundo language
```

详细用法请参考[README.md](../README.md)文件。

## 配置文件位置

cundo 将配置文件存储在`~/.cundo/`目录下：

```
~/.cundo/
├── config.json              # 语言偏好设置
├── undone-operations.json   # 撤销/重做状态跟踪
├── sessions/                # 本地会话跟踪
└── backups/                 # 操作备份
```

## 从 ccundo 迁移

如果您之前使用过 ccundo，您的配置文件和备份将保留在`~/.ccundo/`目录中。安装 cundo 后，您需要手动将这些文件迁移到`~/.cundo/`目录，或者让 cundo 重新创建配置文件。

## 贡献

欢迎提交 Pull Request 来改进 cundo 项目。

## 许可证

MIT © Ronit Sachdev
