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
  
   content.rules = rules.filter( itme => !item.includes('paypal')) // 干掉paypal

  const paypal = ["DOMAIN-SUFFIX,paypal.com,Proxy", "DOMAIN-SUFFIX,paypalobjects.com,Proxy"]

  const openAi = ['DOMAIN-SUFFIX,openai.com,OpenAi','DOMAIN-SUFFIX,statsigapi.net,OpenAi']

  const xrender = ['DOMAIN-SUFFIX,xrender.fun,Proxy']

  content.rules.unshift(...paypal,...openAi,...xrender);

  return content;
}
