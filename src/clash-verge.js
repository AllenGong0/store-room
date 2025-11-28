// Clash Verge Script
// Main function receives the config object directly
function main(config, profilename) {
	console.log(profilename)
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
	const github = ["DOMAIN-SUFFIX,github.com,速鹰666"];

	const cursor = ["DOMAIN-SUFFIX,cursor.com,速鹰666"];

	const paypal = [
		"DOMAIN-SUFFIX,paypal.com,速鹰666",
		"DOMAIN-SUFFIX,paypalobjects.com,速鹰666",
	];

	const biying = ["DOMAIN-SUFFIX,bing.com,OpenAi"];

	const xrender = ["DOMAIN-SUFFIX,xrender.fun,速鹰666"];

	const openAi = [
		"DOMAIN-SUFFIX,openai.com,OpenAi",
		"DOMAIN-SUFFIX,chatgpt.com,OpenAi",
		"DOMAIN-SUFFIX,statsigapi.net,OpenAi",
	];
	const mlProxy = ["dropboxusercontent.com", "huggingface.co"].map(
		(item) => `DOMAIN-SUFFIX,${item},速鹰666`
	);

	const steam = ["steampowered.com"].map(
		(item) => `DOMAIN-SUFFIX,${item},速鹰666`
	);

	const ns = ["nintendo.com"].map((item) => `DOMAIN-SUFFIX,${item},速鹰666`);

	const infuse = ["firecore.com"].map(
		(item) => `DOMAIN-SUFFIX,${item},速鹰666`
	);

	// Add custom rules at the beginning
	config.rules.unshift(
		...github,
		...paypal,
		...openAi,
		...xrender,
		...mlProxy,
		...cursor,
		...ns,
		...infuse
	);

	return config;
}
