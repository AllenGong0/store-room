// Clash Verge Script
// Main function receives the config object directly
function main(config, profilename) {
	console.log(profilename);

	const suying = "速鹰666";
	const tag = "TAGMeta";

	const customConfigProfiles = [suying, tag];
	const customAiProxyGroupProfile = [suying];

	if (!customConfigProfiles.includes(profilename)) {
		return config;
	}

	const proxyGroup = config["proxy-groups"];
	const proxyGroupName = proxyGroup[0].name;

	const suffix = `DOMAIN-SUFFIX`;

	if (customAiProxyGroupProfile.includes(profilename)) {
		// Filter proxies for AI group (Taiwan, US, Japan)
		const AIProxies = config.proxies
			.filter(
				(item) =>
					item.name.includes("台湾") ||
					item.name.includes("美国") ||
					item.name.includes("日本") ||
					item.name.includes("菲律宾")
			)
			.map((item) => item.name);

		// Add AI proxy group at the beginning

		const AIName = "AI";

		proxyGroup.unshift({
			name: AIName,
			type: "select",
			proxies: [...AIProxies],
		});
		const AIProxyRule = [
			"openai.com",
			"chatgpt.com",
			"statsigapi.net",
			"x.ai",
			"grok.com",
		].map((item) => `${suffix},${item},${AIName}`);
		config.rules.unshift(...AIProxyRule);
	}

	// Remove paypal related rules
	config.rules = config.rules.filter((item) => {
		return !item.includes("paypal");
	});

	// Direct rules
	const yfdDomain = [
		`zhenguanyu.com`,
		`yuanfudao.com`,
		`yuanfudao.biz`,
		`moxt.ai`,
		`yuanfudaoschool.biz`,
	];

	const twoFADomain = [`2fa.fun`];

	const xSpeedy = [`x-speedy.top`]

	const directsProxyRules = [...yfdDomain, ...twoFADomain,...xSpeedy].map(
		(item) => `${suffix},${item},DIRECT`
	);

	// Proxy rules
	const github = [`github.com`];

	const cursor = [`cursor.com`];

	const google = [`googlesource.com`];

	const paypal = [`paypal.com`, `paypalobjects.com`];

	const xrender = [`xrender.fun`];

	const mlProxy = [`dropboxusercontent.com`, `huggingface.co`];

	const steam = [`steampowered.com`];

	const ns = [`nintendo.com`];

	const infuse = [`firecore.com`];

	const figma = [`figma.com`];

	const gitlab = [`gravatar.com`];

	const proxyRules = [
		...github,
		...paypal,
		...xrender,
		...mlProxy,
		...cursor,
		...ns,
		...infuse,
		...google,
		...figma,
		...gitlab,
	].map((item) => `${suffix},${item},${proxyGroupName}`);

	// Add custom rules at the beginning
	config.rules.unshift(...directsProxyRules, ...proxyRules);

	return config;
}
