// Clash Verge Script
// Main function receives the config object directly
function main(config, profilename) {
	console.log(profilename);
	if (profilename.includes("kanyun.com.yaml") || profilename === '快枪手') {
		return config;
	}

	const suyingProxyName = "速鹰666";
	const mmyProxyName = "🔰国外流量";
	const proxyGroupName =
		profilename === "速鹰666" ? suyingProxyName : mmyProxyName;

	const proxyGroup = config["proxy-groups"];

	// Filter proxies for OpenAI group (Taiwan, US, Japan)
	const openAiProxies = config.proxies
		.filter(
			(item) =>
				item.name.includes("台湾") ||
				item.name.includes("美国") ||
				item.name.includes("日本")
		)
		.map((item) => item.name);

	// Add OpenAI proxy group at the beginning
	proxyGroup.unshift({
		name: "OpenAi",
		type: "select",
		proxies: [...openAiProxies],
	});

	// Remove paypal related rules
	config.rules = config.rules.filter((item) => {
		return !item.includes("paypal");
	});

	// Custom rules
	const github = [`DOMAIN-SUFFIX,github.com,${proxyGroupName}`];

	const cursor = [`DOMAIN-SUFFIX,cursor.com,${proxyGroupName}`];

	const google = [`DOMAIN-SUFFIX,googlesource.com,${proxyGroupName}`];

	const paypal = [
		`DOMAIN-SUFFIX,paypal.com,${proxyGroupName}`,
		`DOMAIN-SUFFIX,paypalobjects.com,${proxyGroupName}`,
	];

	const biying = [`DOMAIN-SUFFIX,bing.com,OpenAi`];

	const xrender = [`DOMAIN-SUFFIX,xrender.fun,${proxyGroupName}`];

	const openAi = [
		`DOMAIN-SUFFIX,openai.com,OpenAi`,
		`DOMAIN-SUFFIX,chatgpt.com,OpenAi`,
		`DOMAIN-SUFFIX,statsigapi.net,OpenAi`,
	];

	const yfd = [
		`DOMAIN-SUFFIX,zhenguanyu.com,DIRECT`,
		`DOMAIN-SUFFIX,yuanfudao.biz,DIRECT`,
		`DOMAIN-SUFFIX,moxt.ai,DIRECT`,
	];

	const mlProxy = [`dropboxusercontent.com`, `huggingface.co`].map(
		(item) => `DOMAIN-SUFFIX,${item},${proxyGroupName}`
	);

	const steam = [`steampowered.com`].map(
		(item) => `DOMAIN-SUFFIX,${item},${proxyGroupName}`
	);

	const ns = [`nintendo.com`].map(
		(item) => `DOMAIN-SUFFIX,${item},${proxyGroupName}`
	);

	const infuse = [`firecore.com`].map(
		(item) => `DOMAIN-SUFFIX,${item},${proxyGroupName}`
	);

	// Add custom rules at the beginning
	config.rules.unshift(
		...github,
		...paypal,
		...openAi,
		...yfd,
		...xrender,
		...mlProxy,
		...cursor,
		...ns,
		...infuse,
		...google
	);

	return config;
}
