const $ = jQuery;

const getProps = window.location.search;
const params = new URLSearchParams(getProps);
let paramObj = {};
for (let value of params.keys()) {
  paramObj[value] = params.get(value);
}
$('#title-name').text(`${paramObj.n}`)
$('#title-phone').text(`${paramObj.ph}`)
const sub15 = paramObj['sub15'] || ''
if (paramObj.sub14 === 'FB') {
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ?
        n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s)
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', sub15);
  fbq('track', 'PageView');
  fbq('track', 'Lead');
}
else {
  $('body').append(`
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-${sub15}"></script>
  <script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-'+${sub15});
  </script>
`)
}