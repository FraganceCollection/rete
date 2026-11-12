// Purchase help form (delta-spec 03z3, T6). Posts to
// POST /api/v1/support/purchase-requests. Everything shown to the user is set
// with textContent; nothing from the query or the API is parsed as HTML.
(function () {
  'use strict';

  var API = 'https://fragrance-coach-api.fragance-coach.workers.dev';
  var SITEKEY = '0x4AAAAAAF-kjKOBuoYKF--Y';
  var ENDPOINT_PATH = '/api/v1/support/purchase-requests';

  var STRINGS = {
    en: {
      pageTitle: 'Purchase help - Silaro',
      navSupport: 'Support',
      title: 'Purchase help',
      subtitle: "Paid for Silaro PRO and can't get it back? Tell us and we'll sort it out.",
      uidLine: 'ID: ',
      emailLabel: 'Email to reply to',
      platformLabel: 'Where did you buy it?',
      platformIos: 'iPhone or iPad (App Store)',
      platformAndroid: 'Android (Google Play)',
      platformUnknown: 'Not sure',
      orderLabel: 'Order ID',
      optional: '(optional)',
      orderHelpSummary: 'Where do I find it?',
      orderHelpIos: 'iPhone/iPad: in the receipt Apple emailed you, look for "Order ID". You can also find it at reportaproblem.apple.com.',
      orderHelpAndroid: 'Android: in the Google Play receipt email (it starts with GPA.), or in Play Store › Payments & subscriptions › Budget & history.',
      messageLabel: 'What happened?',
      privacyNote: 'We only use this information to resolve your request.',
      privacyLink: 'Privacy Policy',
      submit: 'Send request',
      sending: 'Sending…',
      successTitle: 'Request received',
      successBody: "We'll reply by email. Keep this reference:",
      footerHome: 'Home',
      footerPrivacy: 'Privacy',
      footerTerms: 'Terms',
      footerRights: '© 2026 Silaro. All rights reserved.',
      errEmail: 'Please enter a valid email address.',
      errMessage: 'Please describe what happened (at least 10 characters).',
      errOrderId: 'The order ID can only contain letters, numbers, dots, dashes and underscores.',
      errCaptchaPending: 'Please complete the verification above.',
      errCaptcha: "We couldn't verify you're not a robot. Please try again.",
      errRateLimited: 'Too many requests. Please wait a while and try again.',
      errGeneric: "Something went wrong and your request wasn't sent. Please try again in a few minutes."
    },
    es: {
      pageTitle: 'Ayuda con una compra - Silaro',
      navSupport: 'Soporte',
      title: 'Ayuda con una compra',
      subtitle: '¿Pagaste Silaro PRO y no lo recuperás? Contanos y lo resolvemos.',
      uidLine: 'ID: ',
      emailLabel: 'Email para responderte',
      platformLabel: '¿Dónde lo compraste?',
      platformIos: 'iPhone o iPad (App Store)',
      platformAndroid: 'Android (Google Play)',
      platformUnknown: 'No estoy seguro',
      orderLabel: 'ID de pedido',
      optional: '(opcional)',
      orderHelpSummary: '¿Dónde lo encuentro?',
      orderHelpIos: 'iPhone/iPad: en el recibo que te mandó Apple por email, buscá «Order ID» (ID de pedido). También aparece en reportaproblem.apple.com.',
      orderHelpAndroid: 'Android: en el recibo de Google Play que te llegó por email (empieza con GPA.), o en Play Store › Pagos y suscripciones › Presupuesto e historial.',
      messageLabel: '¿Qué pasó?',
      privacyNote: 'Usamos estos datos solo para resolver tu pedido.',
      privacyLink: 'Política de privacidad',
      submit: 'Enviar pedido',
      sending: 'Enviando…',
      successTitle: 'Recibimos tu pedido',
      successBody: 'Te respondemos por email. Guardá esta referencia:',
      footerHome: 'Inicio',
      footerPrivacy: 'Privacidad',
      footerTerms: 'Términos',
      footerRights: '© 2026 Silaro. Todos los derechos reservados.',
      errEmail: 'Ingresá un email válido.',
      errMessage: 'Contanos qué pasó (al menos 10 caracteres).',
      errOrderId: 'El ID de pedido solo puede tener letras, números, puntos, guiones y guiones bajos.',
      errCaptchaPending: 'Completá la verificación de arriba.',
      errCaptcha: 'No pudimos verificar que no seas un robot. Probá de nuevo.',
      errRateLimited: 'Demasiados pedidos. Esperá un rato y probá de nuevo.',
      errGeneric: 'Algo falló y tu pedido no se envió. Probá de nuevo en unos minutos.'
    },
    pt: {
      pageTitle: 'Ajuda com uma compra - Silaro',
      navSupport: 'Suporte',
      title: 'Ajuda com uma compra',
      subtitle: 'Pagou o Silaro PRO e não consegue recuperá-lo? Conte para a gente e resolvemos.',
      uidLine: 'ID: ',
      emailLabel: 'Email para resposta',
      platformLabel: 'Onde você comprou?',
      platformIos: 'iPhone ou iPad (App Store)',
      platformAndroid: 'Android (Google Play)',
      platformUnknown: 'Não tenho certeza',
      orderLabel: 'ID do pedido',
      optional: '(opcional)',
      orderHelpSummary: 'Onde encontro?',
      orderHelpIos: 'iPhone/iPad: no recibo que a Apple enviou por email, procure «Order ID» (ID do pedido). Também aparece em reportaproblem.apple.com.',
      orderHelpAndroid: 'Android: no recibo do Google Play enviado por email (começa com GPA.), ou na Play Store › Pagamentos e assinaturas › Orçamento e histórico.',
      messageLabel: 'O que aconteceu?',
      privacyNote: 'Usamos estes dados apenas para resolver o seu pedido.',
      privacyLink: 'Política de Privacidade',
      submit: 'Enviar pedido',
      sending: 'Enviando…',
      successTitle: 'Pedido recebido',
      successBody: 'Responderemos por email. Guarde esta referência:',
      footerHome: 'Início',
      footerPrivacy: 'Privacidade',
      footerTerms: 'Termos',
      footerRights: '© 2026 Silaro. Todos os direitos reservados.',
      errEmail: 'Informe um email válido.',
      errMessage: 'Conte o que aconteceu (pelo menos 10 caracteres).',
      errOrderId: 'O ID do pedido só pode ter letras, números, pontos, hífens e sublinhados.',
      errCaptchaPending: 'Conclua a verificação acima.',
      errCaptcha: 'Não conseguimos verificar que você não é um robô. Tente de novo.',
      errRateLimited: 'Pedidos demais. Aguarde um pouco e tente de novo.',
      errGeneric: 'Algo deu errado e o seu pedido não foi enviado. Tente de novo em alguns minutos.'
    }
  };

  // Same limits the backend enforces (src/services/support/validate.ts).
  var EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
  var UID_RE = /^[A-Za-z0-9_.:$-]{1,128}$/;
  var ORDER_RE = /^[A-Za-z0-9._-]{0,64}$/;
  var LANG_RE = /^[A-Za-z0-9._-]{1,10}$/;
  var VERSION_RE = /^[A-Za-z0-9._-]{1,20}$/;
  var PLATFORMS = ['ios', 'android', 'unknown'];

  // --- Query: read once, then wipe the PII from the address bar. ---
  var params = new URLSearchParams(location.search);
  var queryLang = params.get('lang') || '';
  var queryUid = params.get('uid') || '';
  var queryPlatform = params.get('platform') || '';
  var queryVersion = params.get('v') || '';
  var useStaging = location.hostname === 'localhost' && params.get('env') === 'staging';

  if (useStaging) {
    API = 'https://fragrance-coach-api-staging.fragance-coach.workers.dev';
    SITEKEY = '1x00000000000000000000AA'; // Cloudflare test key: always passes.
  }

  if (location.search) {
    // Keep only what is not personal so a reload keeps the language / env.
    var kept = new URLSearchParams();
    if (queryLang) kept.set('lang', queryLang);
    if (useStaging) kept.set('env', 'staging');
    var qs = kept.toString();
    history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
  }

  function pickLang() {
    var candidates = [queryLang, navigator.language || ''];
    for (var i = 0; i < candidates.length; i++) {
      var base = candidates[i].toLowerCase().split(/[-_]/)[0];
      if (STRINGS[base]) return base;
    }
    return 'en';
  }

  var lang = pickLang();
  var t = STRINGS[lang];

  // --- Static texts ---
  document.documentElement.lang = lang;
  document.title = t.pageTitle;
  var nodes = document.querySelectorAll('[data-i18n]');
  for (var n = 0; n < nodes.length; n++) {
    var key = nodes[n].getAttribute('data-i18n');
    if (t[key] !== undefined) nodes[n].textContent = t[key];
  }

  var form = document.getElementById('purchase-form');
  var emailInput = document.getElementById('email');
  var platformSelect = document.getElementById('platform');
  var orderInput = document.getElementById('orderId');
  var messageInput = document.getElementById('message');
  var honeypot = document.getElementById('website');
  var uidInput = document.getElementById('uid');
  var uidLine = document.getElementById('uid-line');
  var submitBtn = document.getElementById('submit');
  var statusEl = document.getElementById('status');
  var successEl = document.getElementById('success');
  var referenceEl = document.getElementById('reference');

  // A malformed uid would make the backend reject the whole request; drop it
  // instead, the email is enough to find the purchase.
  if (UID_RE.test(queryUid)) {
    uidInput.value = queryUid;
    uidLine.textContent = t.uidLine + queryUid;
    uidLine.hidden = false;
  }

  if (PLATFORMS.indexOf(queryPlatform) !== -1) {
    platformSelect.value = queryPlatform;
  } else if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    platformSelect.value = 'ios';
  } else if (/Android/.test(navigator.userAgent)) {
    platformSelect.value = 'android';
  } else {
    platformSelect.value = 'unknown';
  }

  // --- Turnstile (explicit render) ---
  var widgetId = null;
  var captchaToken = '';

  window.onSilaroTurnstileLoad = function () {
    widgetId = window.turnstile.render('#captcha', {
      sitekey: SITEKEY,
      language: lang,
      callback: function (token) { captchaToken = token; },
      'expired-callback': function () { captchaToken = ''; },
      'error-callback': function () { captchaToken = ''; }
    });
  };

  var ts = document.createElement('script');
  ts.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onSilaroTurnstileLoad';
  ts.async = true;
  ts.defer = true;
  document.head.appendChild(ts);

  function resetCaptcha() {
    captchaToken = '';
    if (window.turnstile && widgetId !== null) window.turnstile.reset(widgetId);
  }

  function showError(text) {
    statusEl.textContent = text;
  }

  function errorText(status, code) {
    if (status === 429 || code === 'rate_limited') return t.errRateLimited;
    if (code === 'captcha_failed' || code === 'invalid_turnstileToken') return t.errCaptcha;
    if (code === 'invalid_email') return t.errEmail;
    if (code === 'invalid_message') return t.errMessage;
    if (code === 'invalid_orderId') return t.errOrderId;
    return t.errGeneric;
  }

  function setBusy(busy) {
    submitBtn.disabled = busy;
    submitBtn.textContent = busy ? t.sending : t.submit;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    showError('');

    var email = emailInput.value.trim();
    var orderId = orderInput.value.trim();
    var message = messageInput.value.trim();

    if (email.length > 254 || !EMAIL_RE.test(email)) { showError(t.errEmail); emailInput.focus(); return; }
    if (!ORDER_RE.test(orderId)) { showError(t.errOrderId); orderInput.focus(); return; }
    if (message.length < 10 || message.length > 2000) { showError(t.errMessage); messageInput.focus(); return; }
    if (!captchaToken) { showError(t.errCaptchaPending); return; }

    var payload = {
      email: email,
      uid: uidInput.value || null,
      platform: platformSelect.value,
      orderId: orderId || null,
      message: message,
      // The app's own language (may be outside en/es/pt) helps when replying.
      lang: LANG_RE.test(queryLang) ? queryLang : lang,
      appVersion: VERSION_RE.test(queryVersion) ? queryVersion : null,
      turnstileToken: captchaToken,
      website: honeypot.value
    };

    setBusy(true);
    fetch(API + ENDPOINT_PATH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      referrerPolicy: 'no-referrer'
    })
      .then(function (res) {
        return res.json().catch(function () { return null; }).then(function (body) {
          return { status: res.status, body: body };
        });
      })
      .then(function (result) {
        var body = result.body;
        if (result.status === 200 && body && body.success && body.data && body.data.id) {
          referenceEl.textContent = String(body.data.id);
          form.hidden = true;
          successEl.hidden = false;
          return;
        }
        setBusy(false);
        showError(errorText(result.status, body && typeof body.error === 'string' ? body.error : ''));
        resetCaptcha();
      })
      .catch(function () {
        setBusy(false);
        showError(t.errGeneric);
        resetCaptcha();
      });
  });
})();
