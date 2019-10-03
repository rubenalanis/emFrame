const domains = [
  "https://aegean-dev.everymundo.com",
  "https://aeromexico-dev.everymundo.com",
  "https://airberlin-dev.everymundo.com",
  "https://aircanada-dev.everymundo.com",
  "https://aireuropa-dev.everymundo.com",
  "https://airnewzealand-dev.everymundo.com",
  "https://alitalia-dev.everymundo.com",
  "https://aa-dev.everymundo.com",
  "https://aav-dev.everymundo.com",
  "https://ana-dev.everymundo.com",
  "https://blueair-dev.everymundo.com",
  "https://capeair-dev.everymundo.com",
  "https://cathay-dev.everymundo.com",
  "https://copaair-dev.everymundo.com",
  "https://etihad-dev.everymundo.com",
  "https://eva-dev.everymundo.com",
  "https://fijiairways-dev.everymundo.com",
  "https://finnair-dev.everymundo.com",
  "https://frontier-dev.everymundo.com",
  "https://hainan-dev.everymundo.com",
  "https://jetairways-dev.everymundo.com",
  "https://kenyaairways-dev.everymundo.com",
  "https://klm-dev.everymundo.com",
  "https://latam-dev.everymundo.com",
  "https://pegasus-dev.everymundo.com",
  "https://royalbrunei-dev.everymundo.com",
  "https://ryanair-dev.everymundo.com",
  "https://singapore-dev.everymundo.com",
  "https://spirit-dev.everymundo.com",
  "https://star-dev.everymundo.com",
  "https://tap-dev.everymundo.com",
  "https://thaiairways-dev.everymundo.com",
  "https://thaiairways-dev.everymundo.com",
  "https://united-dev.everymundo.com",
  "https://virginaustralia-dev.everymundo.com",
  "https://volaris-dev.everymundo.com",
  "https://xiamen-dev.everymundo.com",
  "https://openair-dev.everymundo.com",
  "https://openair-prepro.everymundo.com",
  "https://openair.everymundo.com",
  "http://localhost:3000" //for testing local
]
let eventSource;

const emcid = () => {

  let emcidValue = window.localStorage.getItem('emcid');

  if (!emcidValue) {
    const numberGenerator = length => {
      let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let i;
      let isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
      let randomNum = '';
      let values;
      if (window.crypto && window.crypto.getRandomValues) {
        values = new Uint32Array(length);
        window.crypto.getRandomValues(values);
        for (i = 0; i < length; i++) {
          randomNum += charset[values[i] % charset.length];
        }
        return randomNum;
      } else if (isOpera) {
        for (i = 0; i < length; i++) {
          randomNum += charset[Math.floor(Math.random() * charset.length)];
        }
        return randomNum;
      }
      else
        return Math.random().toString(36).substr(2, 6);
    }

    const genEmcid = numberGenerator(6);

    window.localStorage.setItem('emcid', JSON.stringify(genEmcid));
    emcidValue = window.localStorage.getItem('emcid');

  }

  eventSource.postMessage(
    {
      key: "emcid",
      value: emcidValue
    },
    "*"
  );

}

const kpis = (opts) => {

  if (opts.method === 'set') {
    const airline = opts.airline;
    window.localStorage.setItem('kpi', airline);
  } else if (opts.method === 'logout') {
    localStorage.removeItem('kpi');
  } else if (opts.method === 'get') {
    const kpiValue = window.localStorage.getItem('kpi');
    if (kpiValue) {
      eventSource.postMessage(
        {
          key: "kpi",
          value: kpiValue
        },
        "*"
      );
    } else {
      eventSource.postMessage(
        {
          key: "kpi",
          value: false
        },
        "*"
      );
    }
  } else {
    //ignore
  }
  
}

const messageHandler = event => {

  if (!domains.includes(event.origin))
    return;

  const { key, opts } = event.data;
  eventSource = event.source;

  switch (key) {
    case 'emcid':
      emcid();
      break;
    case 'kpi':
      kpis(opts);
      break;
    default:
      console.log(`Invalid key ${key}. Ignoring message.`);
  }

}

window.addEventListener("message", messageHandler, false);
