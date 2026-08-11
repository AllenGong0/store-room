# Stash 机场节点 DNS 覆写（iOS/macOS）

> **Apple TV / tvOS 不使用此文件。** tvOS 端不能启用独立 DNS 覆写；请改用 [Stash tvOS 主配置模板](./stash-tvos-airport.yaml)，把 DNS 规则直接放进主 YAML。

推荐结构：**机场原订阅作为主配置 + 本覆写补充节点 DNS**。

这样不需要 Sub-Store，也不会把订阅令牌公开到 GitHub；机场更新节点、分流规则、策略组和普通 DNS 配置时，仍由原订阅负责。

## 适用机场

- 速鹰 666
  - 节点域名：`+.syddns-obno.xyz`、`+.novastd.net`、`+.cseplea.xyz`
  - 节点 DNS：`query.nmsls.pub` 提供的 DoH / DoT
- 快枪手
  - 节点域名：`+.kunlun03dns.com`
  - 节点 DNS：机场 Clash 配置提供的三个专用 DoH

## iPhone / iPad 设置

1. Stash → **设置** → **配置文件** → **从 URL 下载**，输入机场原订阅地址。每个机场分别导入一次。
2. 安装本覆写：
   - 一键安装：<https://link.stash.ws/install-override/raw.githubusercontent.com/AllenGong0/store-room/master/src/stash-airport-node-dns.stoverride>
   - 或在 Stash 的覆写页面从 URL 下载：<https://raw.githubusercontent.com/AllenGong0/store-room/master/src/stash-airport-node-dns.stoverride>
3. 回到首页，打开 **覆写** 开关；在覆写列表里只启用“机场节点 DNS 兼容（iOS/macOS）”。
4. 选择一个机场配置并启动。先刷新订阅，再在策略组中测试节点延迟。
5. 切换到另一个机场时，不需要更换覆写；未匹配到的 DNS policy 不会生效。

## Apple TV / tvOS

tvOS 端不能启用本独立覆写。iCloud 能同步配置与订阅，不代表 tvOS 支持 iOS 上的覆写开关。

Apple TV 必须使用 [stash-tvos-airport.yaml](./stash-tvos-airport.yaml) 这样的主配置，把 `dns.nameserver-policy` 和 `fake-ip-filter` 直接写在主 YAML 中。机场订阅地址含 token，模板只保留占位地址；请在 iPhone/Mac 上填入后，再通过 iCloud 同步主配置到 Apple TV。

## 边界与排查

- 覆写只修复“代理节点服务器域名如何解析”，不会改写 YouTube 等应用目标域名的分流逻辑。
- Stash 对字典字段递归合并，所以 `nameserver-policy` 会保留机场原有条目；数组字段会把覆写条目插到原数组前面。
- 不要把带 token 的机场订阅地址提交到公开仓库。
- 若某机场以后更换节点域名或专用 DNS，需要同步更新本覆写。
- 如果某个节点仍然超时，在 Stash 的 **工具 → 检视 DNS** 中搜索节点域名，先确认它返回真实公网 IP，而不是 `198.18.0.0/16` Fake IP。

## 官方文档

- [覆写文件](https://stash.wiki/configuration/override)
- [内置 DNS 服务](https://stash.wiki/features/dns-server)
- [快速上手](https://stash.wiki/get-started)
- [URL Scheme 与远程覆写](https://stash.wiki/faq/url-schema)
- [Stash 的 tvOS 与 iCloud 配置同步](https://stash.wiki/index)
