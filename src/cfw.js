async function customRules(content) {
  const proxyGroup = content["proxy-groups"];

  const openAiProxies = content.proxies
    .filter((item) => item.name.includes("美国"))
    .map((item) => item.name);
  proxyGroup.push({
    name: "OpenAi",
    type: "select",
    proxies: [...openAiProxies],
  });

  content.rules.unshift("DOMAIN-SUFFIX,openai.com,OpenAi");
  return content;
}
