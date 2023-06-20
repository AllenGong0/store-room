module.exports.parse = ({ content, name, url }, { yaml, axios, notify }) => {
  const proxyGroup = content['proxy-groups'];

  const openAiProxies = content.proxies
    .filter((item) => item.name.includes('台湾') || item.name.includes('美国'))
    .map((item) => item.name);
  proxyGroup.push({
    name: 'OpenAi',
    type: 'select',
    proxies: [...openAiProxies, 'Proxy'],
  });
  const { rules } = content;

  content.rules = rules.filter((item) => {
    console.log(item.includes('paypal'), 'item', item);
  }); // 干掉paypal

  const paypal = ['DOMAIN-SUFFIX,paypal.com,Proxy', 'DOMAIN-SUFFIX,paypalobjects.com,Proxy'];

  const openAi = ['DOMAIN-SUFFIX,openai.com,OpenAi', 'DOMAIN-SUFFIX,statsigapi.net,OpenAi'];

  const xrender = ['DOMAIN-SUFFIX,xrender.fun,Proxy'];

  const yfd = ['DOMAIN-SUFFIX,zhenguanyu.com,DIRECT', 'DOMAIN-SUFFIX,yuanfudao.biz,DIRECT'];

  const mlProxy = ['dropboxusercontent.com','huggingface.co'].map( item => `DOMAIN-SUFFIX,${item},Proxy`)

  content.rules.unshift(...paypal, ...openAi, ...yfd, ...xrender, ...mlProxy);

  return content;
}
