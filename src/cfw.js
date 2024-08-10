module.exports.parse = ({ content, name, url }, { yaml, axios, notify }) => {
  console.log(content, "content");
  const openAiProxies = content.proxies
    .filter((item) => item.name.includes("台湾") || item.name.includes("美国"))
    .map((item) => item.name);
  content["proxy-groups"].unshift({
    name: "OpenAi",
    type: "select",
    proxies: [...openAiProxies],
  });
  const { rules } = content;

  content.rules = rules.filter((item) => {
    return !item.includes("paypal");
  }); // 干掉paypal

  const paypal = [
    "DOMAIN-SUFFIX,paypal.com,速鹰666",
    "DOMAIN-SUFFIX,paypalobjects.com,速鹰666",
  ];

  const biying = ["DOMAIN-SUFFIX,bing.com,OpenAi"];

  const xrender = ["DOMAIN-SUFFIX,xrender.fun,速鹰666"];

  const openAi = [
    "DOMAIN-SUFFIX,openai.com,OpenAi",
    "DOMAIN-SUFFIX,statsigapi.net,OpenAi",
    "DOMAIN-SUFFIX,chatgpt.com,OpenAi",
  ];

  const mlProxy = ["dropboxusercontent.com", "huggingface.co"].map(
    (item) => `DOMAIN-SUFFIX,${item},速鹰666`
  );

  const steam = ["steampowered.com"].map(
    (item) => `DOMAIN-SUFFIX,${item},速鹰666`
  );

  content.rules.unshift(...paypal, ...openAi, ...xrender, ...mlProxy);

  console.log("qwe", content);
  return content;
};
