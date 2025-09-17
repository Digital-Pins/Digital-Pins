## دراسة حالة تنفيذ منصة التحول الرقمي — DigitalPin

ملف توثيقي مهني يروي قصة بناء البنية الرقمية المتكاملة لشركة DigitalPin: من تخطيط الأهداف، ثم تهيئة الـERP (Dolibarr) وتفعيل الـAPI، إلى تصميم ونشر بوابة العملاء والموقع الرئيسي مع ضوابط أمان وإتاحة على مستوى الإنتاج.

### ملخص تنفيذي
- الهدف: تمكين الشركات المتوسطة والصغيرة من العبور إلى التشغيل الرقمي عبر ERP حديث وبوابة عملاء متكاملة وموقع تعريفي احترافي.
- النتيجة: بنية جاهزة للإنتاج تضم Dolibarr v22 (REST API)، بوابة Next.js آمنة، وموقع تسويقي حديث، تعمل تحت Nginx وCloudflare بتهيئة TLS صارمة وسياسات أمان متقدمة.

---

## 1) النطاق والأهداف
- نطاق العمل:
  - ترقية ونشر Dolibarr ERP v22 مع REST API واستكشافه (explorer + Swagger).
  - تخصيص واجهة الدخول بعلامة تجارية عبر وحدة آمنة (custom module).
  - بناء بوابة عملاء Next.js (فواتير/تذاكر/مدفوعات) تعتمد على بروكسي آمن لواجهة ERP.
  - نشر موقع تسويقي english للمجال digitalpin.online.
  - تأمين النشر: Nginx، HSTS، CSP، Cloudflare (Full strict) مع قواعد كاش مناسبة.
- مؤشرات نجاح:
  - عمل API ERP بشكل مباشر ورصد رموز الحالات (200/401/403) وفق الحقوق.
  - بناء إنتاجي ناجح للبوابة والموقع (Next.js) بلا أخطاء.
  - توجيه النطاقات إلى الخدمات الصحيحة مع شهادات TLS سارية ومتوافقة.

---

## 2) البيئة والبنية التحتية
- البنية:
  - نظام: Linux، خدمات: Nginx 1.18، PHP-FPM 8.1، MariaDB 10.6، Node.js 20.
  - ERP: Dolibarr v22.0.0 مع REST على المسار `/api/index.php` ودعم PATH_INFO.
  - بوابة العملاء: Next.js 14 (App Router، TypeScript)، تشغيل منفصل على منفذ 3210.
  - الموقع الرئيسي: Next.js 14 + Tailwind، تشغيل على منفذ 3220.
  - أمامية: Cloudflare SSL/TLS (Full strict)، قواعد كاش انتقائية.

### رسم معماري نصّي (مختصر)
```
Internet
  └─ Cloudflare (Full strict)
      └─ Nginx (TLS) ──► digitalpin.online  → Next.js (website, :3220)
                      ├► app.digitalpin.online → Next.js (customer portal, :3210)
                      └► erp.digitalpin.online → PHP-FPM 8.1 (Dolibarr)
                                              └─ MariaDB 10.6
```

---

## 3) تفعيل REST API في Dolibarr
- تفعيل وحدات: Web services/API (REST) + Third parties + Billing/Invoices (+ Tickets عند الحاجة).
- توليد مفتاح API من بطاقة مستخدم خدمة مخصص وربطه بالطرف الثالث عند كونه مستخدمًا خارجيًا.
- منح صلاحيات قراءة لازمة: فواتير/أطراف ثالثة (وأي صلاحيات إضافية مطلوبة).
- ملاحظات الاستجابة:
  - 200: مفتاح صحيح وصلاحيات كافية.
  - 403: المفتاح معروف لكن الصلاحيات ناقصة (يجب تحديث الأذونات).
  - 401: لم يُقرأ المفتاح (استخدم الهيدر DOLAPIKEY أو البارامتر DOLAPIKEY في الرابط).

أدلة مختصرة (نماذج مبسطة للردود):
- استدعاء بهيدر DOLAPIKEY على `/invoices?limit=1` → 403 Forbidden عند نقص الأذونات.
- استدعاء بهيدر غير صحيح (X-API-KEY) → 401 Unauthorized مع رسالة توضح وجوب DOLAPIKEY.

مرجع تفصيلي وخطوات عملية توجد في: `API-config steps.md`.

---

## 4) بوابة العملاء (Next.js)
- الوظائف: قائمة الفواتير وتفاصيلها، تذاكر الدعم (قابلة للتوسّع)، ملف شخصي ومدفوعات.
- نمط التكامل: خادم Next.js يقدّم مسارات `/api/*` كبروكسي إلى Dolibarr عبر axios مع حقن DOLAPIKEY من البيئة.
- إدارة البيئة: `.env.production.local` تُقرأ في وقت التشغيل عبر dotenv، ما يعالج إشكالات systemd مع الأسرار.
- أمان:
  - ضبط Security Headers: CSP، X-Frame-Options=DENY، X-Content-Type-Options=nosniff، Referrer-Policy، HSTS في الإنتاج.
  - حدود اتصال CSP تسمح للأصول/الاتصالات اللازمة فقط.

مشكلات تم حلها:
- خطأ 500 في `/api/invoices` بسبب عدم تحميل متغيرات البيئة في الإنتاج → الحل: dotenv + ضبط systemd.
- تغيّر الخطأ إلى 403 بعد إصلاح البيئة → تأكيد وصول الطلب للـERP وأن المشكلة صلاحيات.

---

## 5) الموقع الرئيسي (digitalpin.online)
- تقنية: Next.js (App Router) + Tailwind.
- محتوى إنجليزي موجّه لصنّاع القرار في التحول الرقمي: رسالة واضحة، حلول، منهجية، ونموذج تواصل.
- مسار `/api/lead`: يلتقط بيانات النموذج (حاليًا يسجّل في stdout، قابل للربط ببريد/CRM).

---

## 6) النشر والتشغيل
- systemd: خدمة لكل تطبيق (portal على :3210، website على :3220) باستخدام Next.js standalone.
- Nginx: خوادم افتراضية منفصلة لكل نطاق، ترويسات أمان، وتمرير رؤوس البروكسي الصحيحة.
- Cloudflare:
  - SSL/TLS = Full (strict) مع شهادة صالحة على الخادم.
  - قواعد كاش: استثناء `/api/*`، واستثناء مسارات ACME.
  - تعطيل Rocket Loader لتجنّب تعارض مع Next.js.

---

## 7) الأمن والامتثال
- TLS + HSTS (إنتاج فقط) + سياسات أمان متقدمة.
- أقل صلاحيات ممكنة لمستخدم مفتاح الـAPI.
- إدارة أسرار خارج الشيفرة (ملفات env محلية/مخازن أسرار)، وتدوير المفتاح دوريًا.
- عزل الخدمات وتحديد المنافذ، ومراجعة سجلات الأخطاء.

---

## 8) الأدلة والشواهد (مختصر)
- تحقق إعادة توجيه HTTPS للمضيف: `HTTP 301` من Nginx إلى HTTPS.
- بناء Next.js ناجح للبوابة والموقع: تقارير المسارات وFirst Load JS موثّقة من سجل البناء.
- استدعاءات ERP مباشرة:
  - `DOLAPIKEY` الصحيح → 403 عندما تنقص الأذونات.
  - هيدر خاطئ → 401 يوضّح آلية المصادقة الصحيحة.

يمكن توسعة هذا القسم بصور شاشة/مخرجات كاملة عند الحاجة.

---

## 9) المخاطر والتخفيف
- مخاطر صلاحيات زائدة لمفتاح الـAPI → التخفيف: مبدأ أقلّ صلاحية + تدوير.
- تضارب إعدادات Nginx/Cloudflare → التخفيف: فصل المضيفين وقواعد كاش دقيقة واختبارات دخانية.
- فشل تحميل أسرار بالخدمة → التخفيف: dotenv في وقت التشغيل + اقتباس الأسرار الحساسة إذا استخدم EnvironmentFile.

---

## 10) خارطة الطريق (Next)
- ربط `/api/lead` ببريد/CRM، وإضافة صفحات: About، Services، Case Studies.
- مراقبة وأتمتة نسخ احتياطي وتنبيهات.
- إضافة نسخة عربية للموقع.

---

## مراجع
- Dolibarr REST API: https://wiki.dolibarr.org/index.php?title=API_REST
- Next.js App Router: https://nextjs.org/docs/app
- Nginx Docs (reverse proxy): https://nginx.org/en/docs/
- Cloudflare SSL Full (strict): https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/
- systemd service files: https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html
- HTTP Security Headers (OWASP): https://owasp.org/www-project-secure-headers/
