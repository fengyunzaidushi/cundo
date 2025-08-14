# 发布指南

本文档介绍如何发布 cundo 包到 npm 注册表。

## 准备工作

1. 确保你有 npm 账号并已登录
2. 确保你有发布权限
3. 确保所有测试通过

## 发布步骤

### 1. 更新版本号

使用 npm version 命令更新版本号：

```bash
# 更新补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 更新次要版本 (1.0.0 -> 1.1.0)
npm version minor

# 更新主要版本 (1.0.0 -> 2.0.0)
npm version major
```

### 2. 更新 CHANGELOG.md

确保 CHANGELOG.md 文件已更新，包含新版本的所有更改。

### 3. 提交更改

```bash
git add .
git commit -m "Release vX.Y.Z"
git push origin main
```

### 4. 创建 GitHub Release

在 GitHub 上创建一个新的 Release，标签为 vX.Y.Z。

### 5. 发布到 npm

通过 GitHub Actions 自动发布：

- 当创建新的 GitHub Release 时，GitHub Actions 会自动发布到 npm

手动发布：

```bash
npm publish
```

## 发布后检查

发布完成后，检查包是否可以正常安装和使用：

```bash
npm install -g cundo
cundo --version
```

## 故障排除

如果发布过程中遇到问题，请检查：

1. npm 账号权限
2. package.json 中的版本号
3. GitHub Actions 日志
4. npm 注册表状态
