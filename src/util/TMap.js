 export function TMap(key) {
    return new Promise(function (resolve, reject) {
           window.init = function () {
          resolve(window.qq)//注意这里
     }
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://map.qq.com/api/js?v=2.exp&callback=init&key=TMZBZ-S72K6-66ISB-ES3XG-CVJC6-HKFZG";
    script.onerror = reject;
    document.head.appendChild(script);
  })
}