// Clash Verge Script
// Main function receives the config object directly
function main(config, profilename) {


	console.log(profilename);

	const suying = "速鹰666";
	const mmy = "mmy";
	const tag = "TAGMeta";
	const kqs = "快枪手";
	const kanyun = "kanyun";

	const customConfigProfiles = [suying, mmy, tag];
	const customOpenAiProxyGroupProfile = [suying,mmy];

	if (!customConfigProfiles.includes(profilename)) {
		return config;
	}

	const proxyGroupNames = {
		[suying]: "速鹰666",
		[mmy]: "🔰国外流量",
		[tag]: "🛫 TAGSS",
	};

	const proxyGroupName = proxyGroupNames[profilename];
	const proxyGroup = config["proxy-groups"];

	if (customOpenAiProxyGroupProfile.includes(profilename)) {
		// Filter proxies for OpenAI group (Taiwan, US, Japan)
		const openAiProxies = config.proxies
			.filter(
				(item) =>
					item.name.includes("台湾") ||
					item.name.includes("美国") ||
					item.name.includes("日本") ||
					item.name.includes("菲律宾")
			)
			.map((item) => item.name);

		// Add OpenAI proxy group at the beginning
		proxyGroup.unshift({
			name: "OpenAi",
			type: "select",
			proxies: [...openAiProxies],
		});

		const openAi = [
			`DOMAIN-SUFFIX,openai.com,OpenAi`,
			`DOMAIN-SUFFIX,chatgpt.com,OpenAi`,
			`DOMAIN-SUFFIX,statsigapi.net,OpenAi`,
			`DOMAIN-SUFFIX,x.ai,OpenAi`,
			`DOMAIN-SUFFIX,grok.com,OpenAi`,
		];
		config.rules.unshift(...openAi);
	}

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

	const xrender = [`DOMAIN-SUFFIX,xrender.fun,${proxyGroupName}`];

	const yfd = [
		`DOMAIN-SUFFIX,zhenguanyu.com,DIRECT`,
		`DOMAIN-SUFFIX,yuanfudao.com,DIRECT`,
		`DOMAIN-SUFFIX,yuanfudao.biz,DIRECT`,
		`DOMAIN-SUFFIX,moxt.ai,DIRECT`,
		`DOMAIN-SUFFIX,yuanfudaoschool.biz,DIRECT`,
	];

	const directs = [`DOMAIN-SUFFIX,2fa.fun,DIRECT`];

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
		...yfd,
		...xrender,
		...mlProxy,
		...cursor,
		...ns,
		...infuse,
		...google,
		...directs
	);

	return config;
}
