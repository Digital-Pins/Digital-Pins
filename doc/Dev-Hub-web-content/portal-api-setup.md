سأقترح خريطة شاملة لواجهات API التي نحتاجها للبوابة وتنسيقات البيئة المرتبطة بها، مع إبقاءها بسيطة أولاً وقابلة للتوسّع لاحقاً.

## الخلاصة السريعة
- عدد الحزم/الوحدات الرئيسية: 7–9 وحدات API.
- عدد المسارات المبدئية: نحو 12–18 مساراً (يمكن البدء بالحد الأدنى وتشغيل لاحقاً).
- متغيرات البيئة: 8–12 متغيراً أساسية (Dolibarr + جلسات + البريد + الدفع إن لزم).

## وحدات API المقترحة ومساراتها
1) Auth (جلسات)
- POST /api/portal/session — تسجيل الدخول (يرجع cookie جلسة).
- DELETE /api/portal/session — تسجيل الخروج.
- GET /api/portal/session — جلب حالة الجلسة الحالية.

2) Invoices (فواتير)
- GET /api/portal/invoices — قائمة فواتير العميل.
- GET /api/portal/invoices/[id] — تفاصيل فاتورة.
- Optional لاحقاً: GET /api/portal/invoices/[id]/pdf — تنزيل PDF.

3) Tickets (تذاكر دعم)
- GET /api/portal/tickets — قائمة تذاكر العميل.
- POST /api/portal/tickets — إنشاء تذكرة.
- GET /api/portal/tickets/[id] — تفاصيل تذكرة.
- POST /api/portal/tickets/[id]/messages — إضافة رد/رسالة.

4) Payments (مدفوعات) [اختياري مبدئياً]
- GET /api/portal/payments — قائمة المدفوعات.
- POST /api/portal/payments — بدء دفع (إحالة لمزود خارجي).
- POST /api/portal/payments/webhook — Webhook تأكيد من مزود الدفع.

5) Profile (ملف العميل)
- GET /api/portal/profile — بيانات العميل الأساسية.
- PATCH /api/portal/profile — تعديل بيانات بسيطة (هاتف/عنوان).

6) Files/Attachments (مرفقات) [اختياري]
- GET /api/portal/files?scope=ticket|invoice&id=xxx — قائمة مرفقات.
- POST /api/portal/files — رفع مرفق (مع قيود).
- GET /api/portal/files/[id]/download — تنزيل.

7) Notifications [اختياري لاحقاً]
- GET /api/portal/notifications — تنبيهات العميل (حالة فواتير/تذاكر).
- PATCH /api/portal/notifications/[id] — تعليم كمقروء.

8) Health/Diagnostics
- GET /api/portal/health — فحص الربط مع Dolibarr والتبعيات.

9) Search [اختياري]
- GET /api/portal/search?q=…&type=invoice|ticket — بحث موحّد.

الحد الأدنى للانطلاق (MVP):
- Auth: POST/DELETE/GET session
- Invoices: GET list + GET details
- Tickets: GET list + POST create + GET details

## طبقة lib (تكامل Dolibarr)
دوال أساسية سنعتمدها في lib/dolibarr.ts:
- auth: verifyCustomer(email/code?) أو تبادل توكن/مفاتيح.
- invoices: listCustomerInvoices(customerId, opts), getInvoiceById(id)
- tickets: listCustomerTickets(customerId, opts), createTicket(dto), getTicketById(id), addTicketMessage(id, dto)
- payments (لاحقاً): createPaymentIntent(invoiceId, amount), listPayments(customerId)
- profile: getCustomerProfile(customerId), updateCustomerProfile(customerId, patch)

## متغيرات البيئة المقترحة
Dolibarr:
- DOLIBARR_BASE_URL — عنوان خادم Dolibarr (server-only).
- DOLIBARR_API_KEY أو DOLIBARR_TOKEN — مفتاح/توكن API (server-only).
- DOLIBARR_TIMEOUT_MS — مهلة الطلبات (افتراضي 10000).

Auth/Session:
- PORTAL_SESSION_SECRET — سر تشفير/توقيع الجلسات (server-only).
- PORTAL_SESSION_MAX_AGE — مدة الجلسة بالثواني (مثلاً 43200 لــ 12 ساعة).
- PORTAL_LOGIN_MODE — email+code | sso | dolibarr (للتبديل لاحقاً).

App/Runtime:
- NEXT_PUBLIC_BASE_URL — الأساس لبناء روابط إعادة التوجيه بالمتصفح.
- NEXTAUTH_URL أو بديله لو استخدمنا مزود Auth لاحقاً.
- NODE_ENV — production/development.

Email (إن لزم إرسال أكواد/إشعارات):
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (server-only).
- MAIL_FROM — البريد المرسل.

Payments (اختياري):
- STRIPE_SECRET_KEY أو PAYFORT_* أو مزود آخر (server-only).
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (للعميل).

Storage/Uploads (اختياري لاحقاً):
- S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY, S3_SECRET_KEY (server-only).

Logging/Tracing (اختياري):
- LOG_LEVEL — info|warn|error|debug.
- SENTRY_DSN — في حال التتبع.

ملاحظات مهمة:
- لا نكشف مفاتيح Dolibarr أو أسرار الجلسات للعميل؛ تبقى server-only.
- نستخدم cookies httpOnly + sameSite=lax، ويفضل توقيع/تشفير محتواها.
- بدايةً نستخدم Stubs ثم نبدّل بدوال Dolibarr الحقيقية تدريجياً.

إذا رغبت، أبدأ الآن بتنفيذ الحد الأدنى:
- جلسات: /api/portal/session + حماية middleware.
- فواتير: /api/portal/invoices و /portal/invoices.
- تذاكر: /api/portal/tickets و /portal/tickets.