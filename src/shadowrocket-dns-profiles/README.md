# Shadowrocket 机场 DNS 配置

本目录包含两份独立的 Shadowrocket `.conf` 配置：

- `suying.conf`：搭配速鹰 666 节点订阅
- `kuaiqiangshou.conf`：搭配快枪手节点订阅

它们基于同一份 Shadowrocket 规则配置，仅 `proxy-dns-server` 不同。机场订阅仍在 Shadowrocket 首页单独管理，配置文件不保存订阅 URL、token 或节点密码。

## 为什么需要分成两份

Shadowrocket 的 `proxy-dns-server` 用于解析当前所有代理节点的服务器域名，是配置级全局参数，不支持根据机场名称自动切换：

- 速鹰 666：`https://query.nmsls.pub/dns-query`
- 快枪手：机场 Clash 配置提供的专用 DoH

切换机场订阅后，要同时切换到对应 `.conf` 配置。

普通 App 请求的 DNS 仍保持：

```ini
dns-server = system
fallback-dns-server = system
```

因此这里修改的是“代理节点服务器域名解析”，不是把 YouTube 等 App 目标域名统一交给机场 DNS。

## 导入地址

### 速鹰 666

- Raw：<https://raw.githubusercontent.com/AllenGong0/store-room/master/src/shadowrocket-dns-profiles/suying.conf>

### 快枪手

- Raw：<https://raw.githubusercontent.com/AllenGong0/store-room/master/src/shadowrocket-dns-profiles/kuaiqiangshou.conf>

在 Shadowrocket 的“配置”页面点击右上角 `+`，粘贴对应 Raw 地址。Shadowrocket 也支持 `shadowrocket://config/add/{url}` URL Scheme，但直接粘贴 Raw 地址更简单，也不依赖第三方跳转网站。

## 快枪手备用 DoH

`kuaiqiangshou.conf` 默认使用机场列表中的第一个 DoH。若它以后不可达，可以编辑配置，把 `proxy-dns-server` 替换成下面任意一个：

```ini
proxy-dns-server = https://20.239.241.138:55228/dns-query/clash?site=kuaiqiangshou
```

或：

```ini
proxy-dns-server = https://104.208.122.199:62201/dns-query/clash?site=kuaiqiangshou
```

没有把三个地址写成逗号列表，是因为 Shadowrocket 官方说明只明确展示了单个 `proxy-dns-server`，这里采用保守、可验证的写法。

## 使用步骤

1. 在 Shadowrocket 首页刷新并选择机场节点。
2. 进入“配置”，选中与机场同名的 `.conf`。
3. 返回首页，断开后重新连接。
4. 运行连通性测试；若仍超时，导出 PacketTunnel 日志检查节点域名解析结果。

## 参考

- [Shadowrocket 官方频道：proxy-dns-server](https://t.me/s/ShadowrocketNews/934)
- [Shadowrocket URL Scheme 说明](https://github.com/free-nodes/shadowrocket/blob/main/docs/shadowrocket_manual.md#url-schemes)
