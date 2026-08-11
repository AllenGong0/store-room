# Stash tvOS 主配置

Apple TV / tvOS 不能启用独立 `.stoverride` DNS 覆写，因此必须把节点 DNS 规则直接写进主 YAML：

- 主配置：[stash-tvos-airport.yaml](./stash-tvos-airport.yaml)
- GitHub Raw：<https://raw.githubusercontent.com/AllenGong0/store-room/master/src/stash-tvos-airport.yaml>

## 使用步骤

1. 在 iPhone/Mac 下载主配置，并在 Stash 中作为本地配置打开。
2. 使用纯文本或可视化编辑器，把 `proxy-providers.suying.url` 和 `proxy-providers.kuaiqiangshou.url` 的 `example.invalid` 占位地址换成各自机场订阅地址。
3. 不要把填入 token 的本地配置上传到公开 GitHub。
4. 刷新两个 Proxy Provider，确认策略组里出现节点并能完成延迟测试。
5. 开启 Stash 的 iCloud 配置同步，让这份**主配置**同步到 Apple TV。
6. 在 Apple TV 的 Stash 中选择该主配置并启动。

## 重要边界

`proxy-providers` 只从机场订阅读取 `proxies` 节点，不会把远端完整配置里的 `rules`、`proxy-groups` 和普通 `dns` 自动合并进来。本模板提供的是一套简化分流：局域网与中国 IP 直连，其余走“节点选择”。

在 tvOS 不支持独立覆写的前提下，如果还要求完整保留机场配置并持续自动更新，只剩三类方案：

1. 每次机场更新后，手动把 DNS 段合并到完整 YAML；
2. 使用 Sub-Store 等中间层自动合并；
3. 由机场直接提供已经兼容 Stash tvOS 的完整订阅。

无法同时做到“任意机场完整配置自动更新、客户端覆写、没有中间层”，因为 tvOS 缺少独立覆写这一环。

## 官方文档

- [Stash 配置文件结构](https://stash.wiki/configuration/example-config)
- [远程代理集 Proxy Provider](https://stash.wiki/proxy-protocols/proxy-providers)
- [内置 DNS 服务](https://stash.wiki/features/dns-server)
- [Stash tvOS 更新说明](https://stash.wiki/en/release-notes/tvos)
