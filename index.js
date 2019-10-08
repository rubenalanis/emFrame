let eventSource;

const getDomainReqBody = cmpName => {
  return {
    "cmpNames": [
      cmpName + "Domains"
    ],
    "source": "tenants-mock",
    "context": {
      "airline": {
        "code": "*"
      },
      "product_scope": {
        "name": "airTRFX",
        "version": "2.0"
      },
      "datasource": {
        "step": "n/a",
        "type": "n/a"
      },
      "geo": {
        "language": {

        },
        "location": {
        }
      },
      "modules": [],
      "extra_info": {},
      "ctx_version": "1.0"
    }
  };
}
const emcid = (origin) => {
  let domains = [];

  const http = new XMLHttpRequest();
  const url = 'https://em-frontend-get.airtrfx.com/integration/settings/v1';
  const body = getDomainReqBody('emcid');
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/json');
  http.onreadystatechange = () => {
    if (http.readyState == 4 && http.status == 200) {
      const reqBody = JSON.parse(http.responseText)
      domains = reqBody.domains;
      if (!domains.includes(origin))
        return;
      else {
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
    }
  };
  http.send(JSON.stringify(body));
}

const kpis = (origin, opts) => {
  let domains = [];

  const http = new XMLHttpRequest();
  const url = 'https://em-frontend-get.airtrfx.com/integration/settings/v1';
  const body = getDomainReqBody('kpi');
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/json');
  http.onreadystatechange = () => {
    if (http.readyState == 4 && http.status == 200) {
      const reqBody = JSON.parse(http.responseText)
      domains = reqBody.domains;
      if (!domains.includes(origin)){
        return;
      }
      else {
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
    }
  }
  http.send(JSON.stringify(body));
}


const messageHandler = event => {
  const { key, opts } = event.data;
  eventSource = event.source;
  switch (key) {
    case 'emcid':
      emcid(event.origin);
      break;
    case 'kpi':
      kpis(event.origin, opts);
      break;
    default:
      console.log(`Invalid key ${key}. Ignoring message.`);
  }
}

window.addEventListener("message", messageHandler, false);
