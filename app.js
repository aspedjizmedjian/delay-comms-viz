// ── Stages ──
const STAGES = [
  { id: "order_placed", label: "Order Placed" },
  { id: "confirmed_preparing", label: "Confirmed / Preparing" },
  { id: "picked_up", label: "Picked up and on the way" },
  { id: "delivered", label: "Delivered" },
];

// ── Data ──
// surfaces[] indicates where the comm appears: "homescreen", "otp", or both
// lifecycle titles & subtitles → both; descriptions → otp only
// substatus → otp only; homescreen extras → homescreen only; seasonal → both or homescreen

const DATA = {
  order_placed: {
    inapp: {
      main: [
        // Lifecycle title + description combined (Home + OTP for title, OTP-only for description)
        { scenario: "Confirming", title: { en: "Your order has been placed", ar: "تم تقديم الطلب" }, desc: { en: "{VENDOR_NAME} is confirming your order", ar: "{VENDOR_NAME} يقوم بتأكيد الطلب" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Confirming — No Rider Yet", title: { en: "Your order has been placed", ar: "تم تقديم الطلب" }, desc: { en: "We've got your order \u{1F31F} We'll take it from here and keep you updated", ar: "استلمنا طلبك \u{1F31F} سنهتم بالباقي ونخبرك بأي جديد" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Confirming — Rider Assigned", title: { en: "{RIDER_NAME} is your rider today", ar: "{RIDER_NAME} سيقوم بتوصيل طلبك اليوم" }, desc: { en: "We've sent your order to {VENDOR_NAME}", ar: "قمنا بررسال طلبك إلى {VENDOR_NAME}" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Confirming Delayed", title: { en: "Your order has been placed", ar: "تم تقديم الطلب" }, desc: { en: "There is a high demand right now, but we're on it. We'll update you once preparation starts", ar: "يوجد عدد كبير من الطلبات حاليًا، لكننا نتابع طلبك وسنخبرك عندما يبدأ بتحضير الطلب." }, delay: true, surfaces: ["homescreen", "otp"] },
        // Substatus (OTP)
        { scenario: "Generic Status", en: "Your order has been sent! We'll take care of the rest and keep you updated \u{1F31F}", ar: "تم إرسال طلبك! سنعتني بالباقي ونخبرك بكل جديد \u{1F31F}", surfaces: ["otp"] },
        { scenario: "Rider Assigned Status", en: "{RIDER_NAME} is your rider today. They're heading to {VENDOR_NAME} now \u{1F6F5}", ar: "{RIDER_NAME} في طريقه إلى {VENDOR_NAME} ليستلم طلبك ويقوم بتوصيله إليك \u{1F6F5}", surfaces: ["otp"] },
        { scenario: "Saturated Fleet", en: "It's a busy time for orders, so it's taking a bit longer to find a rider. Hang tight, we're on it \u{1F64C}", ar: "نظراً لكثرة الطلبات حالياً، يستغرق الأمر وقتًا أطول لإيجاد سائق. انتظر قليلاً، نحن نعمل على ذلك \u{1F64C}", delay: true, surfaces: ["otp"] },
        { scenario: "Change in Staffing", en: "It's taking a bit longer to find a rider, but {VENDOR_NAME} is preparing your order now. We'll keep you updated", ar: "نظراً لكثرة الطلبات حالياً، يستغرق الأمر وقتًا أطول لإيجاد سائق، لكن {VENDOR_NAME} يُجهز طلبك الآن", delay: true, surfaces: ["otp"] },
      ],
      timeline: [
        { scenario: "Header", en: "Here's how your order is going", ar: "إليك آخر تحديثات طلبك", surfaces: ["otp"] },
        { scenario: "Order Placed (Complete)", en: "Order placed", ar: "استلمنا الطلب", surfaces: ["otp"] },
        { scenario: "Vendor Confirming (Active)", en: "{VENDOR_NAME} confirming your order", ar: "{VENDOR_NAME} يقوم بتأكيد طلبك", surfaces: ["otp"] },
        { scenario: "Vendor Confirming — Delay (Active)", en: "It's a little busy at {VENDOR_NAME}, but things should start moving shortly \u{1F64C}", ar: "الوضع مزدحم قليلًا في {VENDOR_NAME}، لكننا نتابع طلبك \u{1F64C}", delay: true, surfaces: ["otp"] },
        { scenario: "Vendor Confirmed (Complete)", en: "{VENDOR_NAME} confirmed your order", ar: "{VENDOR_NAME} قام بتأكيد طلبك", surfaces: ["otp"] },
        { scenario: "Vendor Confirming — Delay (Complete)", en: "It was a bit busy at {VENDOR_NAME}, so your order took a little longer to confirm", ar: "كان الوضع مزدحمًا قليلًا في {VENDOR_NAME}، لذا استغرق تأكيد طلبك وقتًا أطول", delay: true, surfaces: ["otp"] },
        { scenario: "Footer", en: "Continue to Help Center", ar: "المتابعة إلى مركز المساعدة", surfaces: ["otp"] },
      ],
      indicators: [
        { scenario: "Badge — Order Placed", en: "Order placed", ar: "استلمنا الطلب", surfaces: ["homescreen", "otp"] },
        { scenario: "On Time Tag", en: "On time", ar: "في الموعد", surfaces: ["homescreen", "otp"] },
        { scenario: "Updated Time Tag", en: "Updated time", ar: "تغيّر الوقت", delay: true, surfaces: ["homescreen", "otp"] },
        { scenario: "Delay Tag Tooltip", en: "Tap here to see more details on your order", ar: "اضغط هنا للمزيد من التفاصيل عن طلبك", surfaces: ["otp"] },
      ],
    },
    push: [
      { scenario: "Accepted by Vendor", en: "Your order has been accepted by {REST_NAME} and will reach you soon!", ar: "لقد تم قبول طلبك من {REST_NAME} توقع وصوله قريباً." },
      { scenario: "Accepted by Vendor (with ETA)", en: "Your order has been accepted by {REST_NAME} and should reach you by {EDT}.", ar: "لقد تم قبول طلبك من {REST_NAME} والوقت المتوقع للوصول هو {EDT}" },
    ],
    sms: [
      { scenario: "Order Sent to Restaurant", en: "Thanks for ordering from Talabat.com. Your Order is sent to Restaurant. You will receive a call shortly to verify your information.", ar: "شكرا لاختيارك طلبات. لقد قمنا باستلام طلبك. سنقوم بالاتصال بك لتأكيد بياناتك." },
      { scenario: "Accepted by Vendor", en: "Your order has been accepted by {REST_NAME} and will reach you soon!", ar: "لقد تم قبول طلبك من {REST_NAME} توقع وصوله قريباً." },
      { scenario: "Accepted by Vendor (with ETA)", en: "Your order has been accepted by {REST_NAME} and should reach you by {EDT}.", ar: "لقد تم قبول طلبك من {REST_NAME} والوقت المتوقع للوصول هو {EDT}" },
    ],
    email: [],
  },

  confirmed_preparing: {
    inapp: {
      main: [
        // Lifecycle title + description combined
        { scenario: "Preparing", title: { en: "Preparing your order", ar: "يتم تحضير طلبك" }, desc: { en: "{VENDOR_NAME} is on it! Getting things ready", ar: "{VENDOR_NAME} يعمل على تجهيز طلبك!" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Preparing — Getting Ready v2", title: { en: "Preparing your order", ar: "يتم تحضير طلبك" }, desc: { en: "{VENDOR_NAME} is on it! They're getting things ready", ar: "{VENDOR_NAME} يعمل على تجهيز طلبك!" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Preparing — Rider on Way", title: { en: "Preparing your order", ar: "يتم تحضير طلبك" }, desc: { en: "{RIDER_NAME} is on their way to pick it up", ar: "{RIDER_NAME} في طريقه لاستلام طلبك" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Preparing — Rider at Vendor", title: { en: "{RIDER_NAME} is at {VENDOR_NAME}", ar: "{RIDER_NAME} وصل إلى {VENDOR_NAME}" }, desc: { en: "{RIDER_NAME} is at {VENDOR_NAME} to pick it up", ar: "{RIDER_NAME} وصل إلى {VENDOR_NAME} لإستلام الطلب" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Preparing — Rider Near Pickup", title: { en: "Your order is almost ready", ar: "طلبك على وشك أن يجهز!" }, desc: { en: "They will pick up your order once it's ready", ar: "سيستلم الطلب بمجرد أن يصبح جاهزًا" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Preparing — Good Things", title: { en: "Good things in progress...", ar: "أشياء رائعة قيد التحضير..." }, desc: { en: "{VENDOR_NAME} is on it! Getting things ready", ar: "{VENDOR_NAME} يعمل على تجهيز طلبك!" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Preparing — Speeding Up", title: { en: "Speeding things up...", ar: "نعمل على تسريع الأمور..." }, desc: { en: "{VENDOR_NAME} is on it! They're getting things ready", ar: "{VENDOR_NAME} يعمل على تجهيز طلبك!" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Preparing — Vendor Busy", title: { en: "Preparing your order", ar: "يتم تحضير طلبك" }, desc: { en: "Everything's on track - it's just a little busy at {VENDOR_NAME}, but they are on it", ar: "طلبك في الموعد، يوجد ازدحام بسيط لدى {VENDOR_NAME} لكنهم يعملون على تحضير طلبك" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Preparing Delayed — No Rider", title: { en: "Preparing your order", ar: "يتم تحضير طلبك" }, desc: { en: "We'll let you know as soon as your order is ready and picked up \u{1F6F5}", ar: "سنخبرك بمجرد أن يجهز طلبك ويستلمه السائق \u{1F6F5}" }, delay: true, surfaces: ["homescreen", "otp"] },
        { scenario: "Preparing Delayed — Rider Assigned", title: { en: "Preparing your order", ar: "يتم تحضير طلبك" }, desc: { en: "It's a little busy, but no worries, your order will be ready and picked up shortly", ar: "يوجد ازدحام بسيط لكن لا تقلق، سيتم تجهيز طلبك واستلامه قريبًا" }, delay: true, surfaces: ["homescreen", "otp"] },
        { scenario: "Preparing Delayed — With ETA", title: { en: "Preparing your order", ar: "يتم تحضير طلبك" }, desc: { en: "You should get your delivery by {PROMISED_TIME}. It's a bit busier than usual, but we're on it\u{1F64F}", ar: "من المتوقع وصول طلبك في الساعة {PROMISED_TIME}. الازدحام أكثر من المعتاد، لكننا نتابع الموضوع \u{1F64F}" }, delay: true, surfaces: ["homescreen", "otp"] },
        { scenario: "Preparing Delayed — Vendor Nudge", title: { en: "Preparing your order", ar: "يتم تحضير طلبك" }, desc: { en: "We've checked in with {VENDOR_NAME} to finish up your order shortly - hang tight", ar: "تواصلنا مع {VENDOR_NAME} لتسريع طلبك، انتظر قليلًا" }, delay: true, surfaces: ["homescreen", "otp"] },
        // Substatus (OTP)
        { scenario: "Preparing — Generic Status", en: "{VENDOR_NAME} is on it! Great stuff is coming your way", ar: "{VENDOR_NAME} يعمل على طلبك! اشياء رائعة في طريقها إليك", surfaces: ["otp"] },
        { scenario: "Rider Assigned Status", en: "{RIDER_NAME} is on their way to pick up your order from {VENDOR_NAME} \u{1F6F5}", ar: "{RIDER_NAME} في طريقه لاستلام طلبك من {VENDOR_NAME}\u{1F6F5}", surfaces: ["otp"] },
        { scenario: "Rider Arrived at Vendor Status", en: "{RIDER_NAME} is at {VENDOR_NAME} and ready to grab your order \u{1F6F5}", ar: "{RIDER_NAME} وصل إلى {VENDOR_NAME} وهو جاهز لاستلام طلبك \u{1F6F5}", surfaces: ["otp"] },
        { scenario: "Vendor Late Status", en: "Things are busy at {VENDOR_NAME}, so it's taking a bit longer to prepare your order. We'll keep you updated \u{1F64C}", ar: "{VENDOR_NAME} مشغول حالياً، لذلك سيستغرق إعداد طلبك وقتًا أكثر. سنبقيك على اطلاع بكل جديد \u{1F64C}", delay: true, surfaces: ["otp"] },
        // Homescreen extras
        { scenario: "On Time", en: "Your order's on track to arrive on time", ar: "طلبك في الطريق وسيصل في الوقت المحدد", surfaces: ["homescreen"] },
        { scenario: "Delay", en: "It's taking a bit longer than usual. Hang tight!", ar: "الطلبات كثيرة حاليًا، لكننا نتابع طلبك!", delay: true, surfaces: ["homescreen"] },
        // Stacked Order (OTP)
        { scenario: "Stacked Order", en: "Your rider is handling multiple orders and will arrive at your door at the estimated time.", ar: "سائق التوصيل المُعيّن يتولى توصيل عدة طلبات حولك وسيصل إليك في الوقت المحدد.", surfaces: ["otp"] },
      ],
      timeline: [
        { scenario: "Rider Assigned (Active)", en: "Finding a rider", ar: "جاري العثور على سائق", surfaces: ["otp"] },
        { scenario: "Rider Assigned — Delay (Active)", en: "It's busier than usual, but we're finding you the nearest rider shortly \u{1F6F5}", ar: "الوضع أكثر ازدحامًا من المعتاد، لكننا سنجد لك سائق قريبًا \u{1F6F5}", delay: true, surfaces: ["otp"] },
        { scenario: "Rider Assigned (Complete)", en: "Rider assigned", ar: "تم تعيين سائق", surfaces: ["otp"] },
        { scenario: "Rider Assigned — Delay (Complete)", en: "It took a bit longer to find a rider due to high demand", ar: "استغرق العثور على سائق وقتًا أطول بسبب ارتفاع عدد الطلبات", delay: true, surfaces: ["otp"] },
        { scenario: "Rider at Vendor (Active)", en: "Rider on the way to {VENDOR_NAME}", ar: "السائق في طريقه إلى {VENDOR_NAME}", surfaces: ["otp"] },
        { scenario: "Rider at Vendor — Delay (Active)", en: "Just a few mins late, but your rider will arrive at {VENDOR_NAME} shortly \u{1F6F5}", ar: "تأخر السائق بضع دقائق فقط، وسيصل إلى {VENDOR_NAME} قريبًا \u{1F6F5}", delay: true, surfaces: ["otp"] },
        { scenario: "Rider at Vendor (Complete)", en: "Rider arrived at {VENDOR_NAME}", ar: "وصل السائق إلى {VENDOR_NAME}", surfaces: ["otp"] },
        { scenario: "Rider at Vendor — Delay (Complete)", en: "It took a little longer on the way to {VENDOR_NAME}", ar: "استغرق الوصول إلى {VENDOR_NAME} وقتًا أطول قليلًا", delay: true, surfaces: ["otp"] },
        { scenario: "Preparing for Pickup (Active)", en: "Preparing your order", ar: "جاري تجهيز طلبك", surfaces: ["otp"] },
        { scenario: "Preparing for Pickup — Delay (Active)", en: "Things seem a bit busy, but we've notified {VENDOR_NAME} to speed up your order \u{1F64C}", ar: "يبدو أن الأمور مزدحمة قليلًا، لكننا أبلغنا {VENDOR_NAME} لتسريع تجهيز طلبك \u{1F64C}", delay: true, surfaces: ["otp"] },
        { scenario: "Order Ready — Rider Delayed (Active)", en: "Order ready for pickup", ar: "الطلب جاهز للاستلام", surfaces: ["otp"] },
        { scenario: "Order Ready — Rider Delayed Subtitle", en: "Your rider is picking up your order and should be on the way to you shortly", ar: "السائق يستلم طلبك الآن وسيكون في طريقه إليك قريبًا", delay: true, surfaces: ["otp"] },
        { scenario: "Preparing for Pickup (Complete)", en: "Order ready and picked up", ar: "تم تجهيز الطلب واستلامه", surfaces: ["otp"] },
        { scenario: "Preparing for Pickup — Delay (Complete)", en: "It was a bit busy at {VENDOR_NAME}, so your order took a little longer to prepare", ar: "كان الوضع مزدحمًا قليلًا في {VENDOR_NAME}، لذا استغرق تجهيز طلبك وقتًا أطول", delay: true, surfaces: ["otp"] },
        { scenario: "Pickup — Rider Delay (Complete)", en: "It took a little more time to pick up your order", ar: "استغرق استلام طلبك وقتًا أطول قليلًا من المعتاد", delay: true, surfaces: ["otp"] },
      ],
      indicators: [
        { scenario: "Badge — Preparing", en: "Preparing order", ar: "قيد التحضير", surfaces: ["homescreen", "otp"] },
      ],
    },
    push: [],
    sms: [
      { scenario: "Delivery Delay (Agent-sent)", en: "Hi from [Brand]. We've contacted the restaurant and it seems there's going to be a slight delay in your delivery time. Please bear with us.", ar: "مرحبًا، قمنا بالتواصل مع المطعم بخصوص طلبك وقد يكون هناك بعض التأخير في توصيل الطلب. نرجو الانتظار قليلاً وشكرًا لتفهمك.", delay: true },
      { scenario: "Prayer Time Delay", en: "Thanks for ordering from Talabat.com. Your order is sent to Restaurant & might be delayed due to prayer time.", ar: "شكرا لاختيارك طلبات. من الممكن أن يكون هناك تأخير طفيف في التوصيل بسبب وقت الصلاة.", delay: true },
      { scenario: "Cancelled — Prep Delays", en: "Hi from Talabat. Unfortunately your order [Order ID] was cancelled because of preparation delays.", ar: "نعتذر. تم إلغاء الطلب [Order ID] بسبب تاخر التوصيل." },
      { scenario: "Cancelled — Restaurant Busy", en: "Hi from Talabat. Unfortunately [Resto Name] has cancelled your order due to a rush in orders.", ar: "مرحبا. للأسف تم إلغاء طلبك من قبل [Resto Name] بسبب ازدياد مفاجئ لعدد الطلبات." },
      { scenario: "Cancelled — No Riders", en: "Hi from Talabat. Unfortunately your order [Order ID] was cancelled because the restaurant had no available riders.", ar: "نعتذر. تم إلغاء الطلب [Order ID] بسبب عدم توفر سائقين التوصيل لدى المطعم. بإمكانك وضع طلب آخر." },
      { scenario: "Cancelled — Not Responding", en: "Hi from Talabat. Unfortunately we had to cancel your order [Order ID] because the restaurant is not responding.", ar: "نعتذر. تم إلغاء الطلب [Order ID] بسبب عدم توفر المطعم. بإمكانك وضع طلب آخر." },
      { scenario: "Cancelled — Item Unavailable", en: "Hi from Talabat. Your order [Order ID] is cancelled due to item unavailability.", ar: "مرحبا. تم إلغاء طلبك [Order ID] بسبب عدم توفر عنصر من الطلب." },
    ],
    email: [],
  },

  picked_up: {
    inapp: {
      main: [
        // Lifecycle title + description combined
        { scenario: "Delivering", title: { en: "Your order is on the way", ar: "طلبك في الطريق إليك" }, desc: { en: "{RIDER_NAME} is on their way to you now", ar: "{RIDER_NAME} في طريقه إليك الآن" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Delivering — Heading Your Way", title: { en: "Heading your way...", ar: "في الطرق إليك..." }, desc: { en: "{RIDER_NAME} is on their way to you now", ar: "{RIDER_NAME} في طريقه إليك الآن" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Delivering — Order Nearby", title: { en: "Your order is nearby", ar: "طلبك على وشك الوصول" }, desc: { en: "Get ready! {RIDER_NAME} is about to drop off your order", ar: "استعد! {RIDER_NAME} على وشك الوصول إليك" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Delivering — Rider Nearby", title: { en: "{RIDER_NAME} is nearby", ar: "{RIDER_NAME} قريب منك" }, desc: { en: "Get ready! {RIDER_NAME} is about to drop off your order", ar: "استعد! {RIDER_NAME} على وشك الوصول إليك" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Near Drop-off — Delayed", title: { en: "Your order is nearby", ar: "طلبك على وشك الوصول" }, desc: { en: "A quick call might help them to find you faster", ar: "مكالمة سريعة قد تساعده في الوصول إليك أسرع" }, delay: true, surfaces: ["homescreen", "otp"] },
        { scenario: "Moderate Delay — On Way", title: { en: "Your order is on the way", ar: "طلبك في الطريق إليك" }, desc: { en: "Just a few mins late, but {RIDER_NAME} is on the way to you now \u{1F6F5}", ar: "تأخر {RIDER_NAME} قليلاً، لكنه في طريقه إليك الآن \u{1F6F5}" }, delay: true, surfaces: ["homescreen", "otp"] },
        { scenario: "Severe Delay — On Way", title: { en: "Your order is on the way", ar: "طلبك في الطريق إليك" }, desc: { en: "Things were taking a bit longer, but {RIDER_NAME} should reach shortly", ar: "حصل تأخير بسيط، لكن {RIDER_NAME} في الطريق إليك وسيصل خلال لحظات" }, delay: true, surfaces: ["homescreen", "otp"] },
        { scenario: "Other Nearby Delivery", title: { en: "Your order is on the way", ar: "طلبك في الطريق إليك" }, desc: { en: "{RIDER_NAME} is completing another delivery nearby and will be heading to you on time \u{1F6F5}", ar: "{RIDER_NAME} يقوم بتوصيل طلب آخر بالقرب منك وسيكون عندك في الوقت المحدد \u{1F6F5}" }, surfaces: ["homescreen", "otp"] },
        { scenario: "PIN Code", title: { en: "Your order is on the way", ar: "طلبك في الطريق إليك" }, desc: { en: "Your order code is {PIN_CODE}. Please share it with your rider at delivery", ar: "رمز طلبك هو {PIN_CODE}. شاركه مع السائق وقت تسليم الطلب" }, surfaces: ["homescreen", "otp"] },
        // Substatus (OTP)
        { scenario: "Picked Up — Rider Arrived", en: "Your order's in good hands \u{263A}\u{FE0F} {RIDER_NAME} has picked it up and is on their way to you now", ar: "طلبك في أيد أمينة \u{263A}\u{FE0F} استلمه {RIDER_NAME} وهو في طريقه إليك الآن", surfaces: ["otp"] },
        { scenario: "Rider Near Pickup", en: "{VENDOR_NAME} has your order ready. {RIDER_NAME} is arriving right on time to pick it up \u{1F6F5}", ar: "{VENDOR_NAME} قام بتجهيز طلبك. {RIDER_NAME} على وشك الوصول لاستلامه في الوقت المحدد \u{1F6F5}", surfaces: ["otp"] },
        { scenario: "Rider Late to Pick Up", en: "Your rider is dealing with some traffic, so it's taking a bit longer to collect your order. Hang in there!", ar: "الشارع مزدحم قليلاً، لذلك سيستغرق السائق وقتًا أطول قليلًا لاستلام طلبك. اصبر قليلًا!", delay: true, surfaces: ["otp"] },
        { scenario: "Delivering — Generic Status", en: "Your order is on the move! We'll let you know when {RIDER_NAME} is nearby", ar: "طلبك في الطريق! سنعلمك عندما يكون {RIDER_NAME} قريبًا", surfaces: ["otp"] },
        { scenario: "Near Drop-off Status", en: "Almost there! Give {RIDER_NAME} a moment to drop off your order", ar: "{RIDER_NAME} على وشك الوصول! لحظات وسيكون طلبك بين يديك", surfaces: ["otp"] },
        { scenario: "Overall Order Late", en: "Your order is delayed, but {RIDER_NAME} has picked it up and is on their way to you now", ar: "تأخر طلبك قليلاً، لكن {RIDER_NAME} استلمه الآن وهو في طريقه إليك", delay: true, surfaces: ["otp"] },
        // Homescreen extras
        { scenario: "Near Drop-off — Delay (HS)", en: "Your order is almost there!", ar: "طلبك على وشك الوصول!", delay: true, surfaces: ["homescreen"] },
        { scenario: "Exceeds PDT — Generic", en: "Your order is taking a bit longer than usual. Hang tight, we're on it!", ar: "تأخر طلبك قليلاً بسبب الازدحام الحالي. نحن نعمل على تحضيره بأسرع وقت ممكن!", delay: true, surfaces: ["homescreen"] },
        { scenario: "Exceeds PDT — Near Drop-off", en: "Almost there! Give {RIDER_NAME} a moment to drop off your order", ar: "{RIDER_NAME} على وشك الوصول! لحظات وسيكون طلبك بين يديك", surfaces: ["homescreen"] },
      ],
      timeline: [
        { scenario: "Rider on the Way (Active)", en: "Order on the way", ar: "الطلب في الطريق", surfaces: ["otp"] },
        { scenario: "Rider on the Way — Delay (Active)", en: "Your rider is arriving shortly to pick up your order", ar: "سيصل السائق قريبًا لاستلام طلبك", delay: true, surfaces: ["otp"] },
        { scenario: "Rider on the Way (Complete)", en: "Rider arrived nearby", ar: "السائق وصل قريب من موقعك", surfaces: ["otp"] },
        { scenario: "Rider on the Way — Delay (Complete)", en: "Traffic slowed things down a bit along the way", ar: "تسبب ازدحام المرور في بعض التأخير على الطريق", delay: true, surfaces: ["otp"] },
        { scenario: "Delivering Order (Active)", en: "Rider dropping off your order", ar: "السائق يسلّم طلبك", surfaces: ["otp"] },
        { scenario: "Delivering — Delay (Active)", en: "A quick call might help them find you faster \u{1F64F}", ar: "مكالمة سريعة قد تساعدهم في الوصول إليك بشكل أسرع \u{1F64F}", delay: true, surfaces: ["otp"] },
        { scenario: "Order Delivered (Complete)", en: "Order delivered", ar: "تم توصيل الطلب", surfaces: ["otp"] },
      ],
      tgo: [
        { scenario: "Predicted Delay — Title", en: "There might be a slight delay", ar: "قد يكون هناك تأخير بسيط", delay: true, surfaces: ["otp"] },
        { scenario: "Predicted Delay — Message", en: "Your order could take a bit more time to deliver, but we'll keep you updated every step of the way.", ar: "قد يستغرق تسليم طلبك وقتا أطول قليلا، لكننا سنبقيك على اطلاع دائم بكل خطوة.", delay: true, surfaces: ["otp"] },
        { scenario: "Actual Delay — Title", en: "Thanks for your patience", ar: "شكرا لصبرك", delay: true, surfaces: ["otp"] },
        { scenario: "Actual Delay — Message", en: "Your order is taking a little longer than usual. It'll be with you by {ETA} at the latest.", ar: "نعتذر منك! سيصل طلبك متأخرًا قليلًا عن الوقت المتوقع. سيكون عندك في تمام الساعة {ETA} على أقصى تقدير", delay: true, surfaces: ["otp"] },
      ],
      indicators: [
        { scenario: "Badge — On the Way", en: "On the way", ar: "قيد التوصيل", surfaces: ["homescreen", "otp"] },
      ],
    },
    push: [
      { scenario: "Order Picked Up", en: "Your order's on the way! We'll let you know when your rider is nearby \u{1F6F5}", ar: "طلبك في طريقه إليك! سننبهك عندما يقترب السائق من الموقع \u{1F6F5}", ku: "داواکارییەکەت لە ڕێگەیە! ئاگادارت دەکەینەوە هەرکات نزیک بۆوە \u{1F6F5}" },
      { scenario: "Order Delayed", en: "Unfortunately your order from {REST_NAME} is delayed. The new expected delivery time is {EDT}. Sorry for the inconvenience.", ar: "نأسف، طلبك من {REST_NAME} سوف يتأخر لعدة دقائق، الوقت المتوقع للوصول هو {EDT}", ku: "ببورە! داواکارییەکەت لە {REST_NAME} دوادەکەوێت. کاتی پێشبینیکراوی نوێ بریتییە لە {EDT}.", delay: true },
      { scenario: "Rider Near Customer", en: "Your rider's just around the corner! Give them a moment to drop off your order", ar: "السائق على وشك الوصول! دقائق وسيكون الطلب بين يديك", ku: "کارمەندی گەیاندنەکەت نزیکە زۆر نزیکە! کەمێکی تر داواکارییەکە دەگاتە دەستت" },
      { scenario: "PIN Code Notice", en: "The order is protected by this code {PIN_CODE}, please share it with your rider once your order is delivered", ar: "طلبك محمي برمز التعريف {PIN_CODE}، شارك الرمز مع السائق عند الإستلام" },
    ],
    sms: [
      { scenario: "Order Dispatched", en: "Get ready! Your order from {REST_NAME} is out for delivery.", ar: "استعد! طلبك من {REST_NAME} في الطريق إليك.", ku: "ئامادەبە! داواکارییەکەت لە {REST_NAME} بەڕێوەیە." },
      { scenario: "Order Delayed", en: "Unfortunately your order from {REST_NAME} is delayed. The new expected delivery time is {EDT}. Sorry for the inconvenience.", ar: "نأسف، طلبك من {REST_NAME} سوف يتأخر لعدة دقائق، الوقت المتوقع للوصول هو {EDT}", ku: "ببورە! داواکارییەکەت لە {REST_NAME} دوادەکەوێت. کاتی پێشبینیکراوی نوێ بریتییە لە {EDT}.", delay: true },
      { scenario: "Near Customer", en: "Your rider is almost there. Give them a moment to drop off your order.", ar: "مندوب التوصيل على وشك الوصول! لحظات وسيكون طلبك بين يديك.", ku: "کارمەندی گەیاندن نزیکە لێتەوە. کەمێکی تر دەگاتە لات." },
      { scenario: "Late Order Check (Agent-sent)", en: "Your order seems to be running late. Please hold on let me check with [RestaurantName].", ar: "يبدو أن طلبك قد تأخر. يرجى الانتظار قليلاً للتأكد من حالة الطلب مع مطعم [RestaurantName].", delay: true },
      { scenario: "Bad Weather Delay", en: "Dear [Customer Name], Your order might be slightly delayed due to bad weather conditions", ar: null, delay: true },
      { scenario: "Rider Has Card Reader", en: "Want to pay with your card instead of cash? This rider is equipped to take payment with your bank card. Just tap and pay!", ar: "هل تفكّر في الدفع بالبطاقة بدلًا من الدفع نقدًا؟ بسيطة، اطلب من سائق التوصيل، فلديه ماكينة الدفع الإلكتروني. ولا أسهل!" },
      { scenario: "Summer Heat Notice", en: "Summer is here! Due to the heat, riders are delivering orders by car so there might be some delays. Thanks for helping our riders keep cool", ar: null, delay: true },
    ],
    email: [],
  },

  delivered: {
    inapp: {
      main: [
        // Lifecycle title + description combined
        { scenario: "Delivered", title: { en: "Order delivered", ar: "تم توصيل الطلب" }, desc: { en: "Enjoy your order!", ar: "استمتع بطلبك!" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Items Out of Stock", title: { en: "Some items are out of stock", ar: "بعض المنتجات غير متوفرة" }, desc: { en: "Choose replacement", ar: "اختر منتجًا بديلاً" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Pick Up Ready", title: { en: "Ready for pickup", ar: "طلبك جاهز للاستلام" }, desc: { en: "It's time to go to {VENDOR_NAME} to collect your order", ar: "توجّه إلى {VENDOR_NAME} لاستلام طلبك" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Drone Pickup Ready", title: { en: "Ready for pickup", ar: "طلبك جاهز للاستلام" }, desc: { en: "It's time to go to {VENDOR_NAME} to collect your order. Use code {PICKUP_CODE} at the delivery point", ar: "توجّه إلى {VENDOR_NAME} لاستلام طلبك. استخدم الرمز {PICKUP_CODE} في نقطة التسليم" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Order Picked Up", title: { en: "Order picked up", ar: "تم استلام الطلب" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Order Cancelled", title: { en: "Order cancelled", ar: "تم إلغاء الطلب" }, surfaces: ["homescreen", "otp"] },
        { scenario: "Delivered (Temp Order)", title: { en: "Order delivered", ar: "تم توصيل الطلب" }, desc: { en: "Enjoy your order!", ar: "استمتع بطلبك!" }, surfaces: ["homescreen", "otp"] },
        // Substatus (OTP)
        { scenario: "Delivered — On Time Status", en: "Your order is right on time \u{1F389} Unwind and enjoy it!", ar: "طلبك وصل في الوقت المحدد \u{1F389} استرخي واستمتع بطلبك!", surfaces: ["otp"] },
      ],
      voucher: [
        { scenario: "OTG — Normal Title", en: "You've got on-time guarantee", ar: "لديك ضمان التسليم في الوقت المحدد", surfaces: ["otp"] },
        { scenario: "OTG — Normal Description", en: "Get {VOUCHER_VALUE} if later than {DELIVERY_TIME}", ar: "احصل على {VOUCHER_VALUE} إذا تأخرنا عن {DELIVERY_TIME}", surfaces: ["otp"] },
        { scenario: "OTG — Delayed Title", en: "Past {DELIVERY_TIME}? We've got you.", ar: "تجاوزت الساعة {DELIVERY_TIME}؟ لا داعي للقلق.", delay: true, surfaces: ["otp"] },
        { scenario: "OTG — Delayed Description", en: "Claim your voucher now", ar: "نحن هنا للمساعدة. احصل على قسيمتك الآن", delay: true, surfaces: ["otp"] },
        { scenario: "OTG — Claimed Title", en: "Thanks for your patience!", ar: "نعتذر عن التأخير، وشكرًا لصبرك", delay: true, surfaces: ["otp"] },
        { scenario: "OTG — Claimed Text", en: "Claimed", ar: "مضاف", delay: true, surfaces: ["otp"] },
      ],
      compensation: [
        { scenario: "Single Voucher — Banner Title", en: "Sorry for the delay", ar: "نعتذر عن هذا التأخير.", delay: true, surfaces: ["otp"] },
        { scenario: "Single Voucher — Banner Text", en: "Let us make it up to you with a {AMOUNT} voucher.", ar: "إليك قسيمة بقيمة {AMOUNT} كهدية بسيطة تعويضًا لك.", delay: true, surfaces: ["otp"] },
        { scenario: "Single Voucher — Banner Action", en: "Claim voucher", ar: "استلم القسيمة", delay: true, surfaces: ["otp"] },
        { scenario: "Single Voucher — Sheet Title", en: "We've added a {AMOUNT} voucher to your account", ar: "أضفنا قسيمة بقيمة {AMOUNT} إلى حسابك.", delay: true, surfaces: ["otp"] },
        { scenario: "Single Voucher — Sheet Text", en: "Use it on any future order within the next 14 days. To see all your vouchers, go to your account.", ar: "يمكنك استخدامها مع أي طلب قادم.", delay: true, surfaces: ["otp"] },
        { scenario: "Multiple Vouchers — Banner Title", en: "Here's {AMOUNT} just for you", ar: "{AMOUNT} خصيصًا لك", delay: true, surfaces: ["otp"] },
        { scenario: "Multiple Vouchers — Banner Text", en: "It's our way of saying sorry for the delay with your order", ar: "إنها طريقتنا للإعتذار عن التأخير في طلبك", delay: true, surfaces: ["otp"] },
        { scenario: "Multiple Vouchers — Banner Action", en: "Claim vouchers", ar: "احصل على القسائم", delay: true, surfaces: ["otp"] },
        { scenario: "Multiple Vouchers — Sheet Title", en: "We've added three {AMOUNT} vouchers to your account", ar: "قمنا بإضافة ثلاث قسائم بقيمة {AMOUNT} لحسابك", delay: true, surfaces: ["otp"] },
        { scenario: "Multiple Vouchers — Sheet Text", en: "Use them on any order within the next 14 days. Find your vouchers at any time by tapping 'Account'", ar: "قم باستخدامها مع أي طلب خلال 14 يوم. يمكنك إيجاد قسائمك في أي وقت في صفحة \"حسابك\"", delay: true, surfaces: ["otp"] },
      ],
    },
    push: [],
    sms: [
      { scenario: "Cancelled — Generic", en: "Unfortunately your order from {REST_NAME} got cancelled. You'll be refunded if you've paid online.", ar: "نأسف، لم نتمكن من تلبية طلبك من {REST_NAME}. سيتم استرداد المدفوعات بنفس طريقة الدفع.", ku: "ببورە داواکارییەکەت لە {REST_NAME} کانسڵ کرا. پارەی دراوت بۆ دەگەڕێتەوە گەر بە ئۆنڵاین پارەت دابێت." },
      { scenario: "Cancelled — Customer Unreachable", en: "Hi from Talabat. Your order [Order ID] is cancelled because you were not able to answer our calls.", ar: "مرحبا, تم إلغاء طلبك [Order ID] لأننا لم نستطيع التواصل معك." },
      { scenario: "Cancelled — Duplicate Order", en: "Hi from Talabat. Your order [Order ID] was cancelled as it was a duplicate order.", ar: "تم إلغاء الطلب [Order ID] بسبب وجود طلب مطابق. بإمكانك وضع طلب آخر." },
      { scenario: "Cancelled — Technical Issue", en: "Hi from Talabat. Unfortunately your order [Order ID] was cancelled due to a technical issue.", ar: "نعتذر. تم إلغاء الطلب [Order ID] بسبب مشكلة تقنية. بإمكانك وضع طلب آخر." },
      { scenario: "Cancelled — Bad Weather", en: "Hi from Talabat. Unfortunately your order [Order ID] was cancelled due to environmental circumstances.", ar: "مرحبا. للأسف تم إلغاء طلبك [Order ID] بسبب أحوال بيئية." },
    ],
    email: [],
  },
};

// ── Seasonal / Contextual Data (cross-stage) ──
const SEASONAL_DATA = {
  friday_prayer: {
    label: "Friday Prayers",
    messages: [
      { scenario: "Friday Prayers — OTP", en: "It's Friday prayer time so deliveries might take a bit longer, but no worries, we're on it!", ar: "قد يتأخر طلبك قليلاً بسبب صلاة الجمعة، لكن لا تقلق نحن نعمل عليه!", delay: true, surfaces: ["otp"] },
      { scenario: "Friday Prayers — Homescreen", en: "It's a little busy during Friday prayer", ar: "قد يكون هناك بعض التأخير خلال وقت صلاة الجمعة", delay: true, surfaces: ["homescreen"] },
      { scenario: "Friday Prayers — SMS", en: "Thanks for ordering from Talabat.com. Your order is sent to Restaurant & might be delayed due to prayer time.", ar: "شكرا لاختيارك طلبات. من الممكن أن يكون هناك تأخير طفيف في التوصيل بسبب وقت الصلاة.", delay: true },
    ],
  },
  iftar_rush: {
    label: "Ramadan / Peak Iftar",
    messages: [
      { scenario: "Iftar Rush — OTP", en: "It's peak time for Iftar orders! Deliveries might take a bit longer, but we've got this \u{1F4AA}", ar: "إنه وقت الذروة لطلبات الإفطار! قد يكون هناك بعض التأخير في توصيل الطلبات. لكننا نعمل على طلبك \u{1F4AA}", delay: true, surfaces: ["otp"] },
      { scenario: "Iftar Rush — Homescreen", en: "Iftar time's a bit busy, but we've got this!", ar: "إنه وقت الذروة لطلبات الإفطار، لكننا نتابع طلبك!", delay: true, surfaces: ["homescreen"] },
    ],
  },
  new_years: {
    label: "New Year's Eve",
    messages: [
      { scenario: "New Year's Rush — OTP", en: "New Year's countdown is on! Orders might take a little longer due to the rush, but we're on it \u{1F4AA}", ar: "العام الجديد على الأبواب! قد يكون هناك بعض التأخير لزيادة الطلبات، ولكن لا تقلق نحن نعمل على طلبك \u{1F4AA}", delay: true, surfaces: ["otp"] },
    ],
  },
  weather_gps: {
    label: "Weather & GPS Issues",
    messages: [
      { scenario: "Bad Weather Delay — SMS", en: "Dear [Customer Name], Your order might be slightly delayed due to bad weather conditions", ar: null, delay: true },
      { scenario: "Summer Heat Notice — SMS", en: "Summer is here! Due to the heat, riders are delivering orders by car so there might be some delays. Thanks for helping our riders keep cool", ar: null, delay: true },
      { scenario: "Bad Weather Cancellation — SMS", en: "Hi from Talabat. Unfortunately your order [Order ID] was cancelled due to environmental circumstances.", ar: "مرحبا. للأسف تم إلغاء طلبك [Order ID] بسبب أحوال بيئية." },
    ],
  },
};

// ── Surface labels for sections that keep headers ──
const SURFACE_LABELS = {
  timeline: "Order Timeline Bottom Sheet",
  indicators: "Status Indicators & Badges",
  tgo: "TGO In-App Notifications",
  voucher: "On-Time Guarantee (OTG)",
  compensation: "Delay Compensation",
};

// Surfaces that render as headed sections (not merged into main)
const HEADED_SURFACES = ["timeline", "indicators", "tgo", "voucher", "compensation"];

// ── Constants ──
const LANG_ORDER = ["en", "ar", "ku"];
const LANG_LABELS = { en: "EN", ar: "AR", ku: "KU" };
const RTL_LANGS = new Set(["ar", "ku"]);

let activeStage = null;
let activeChannel = "inapp";

// ── Init ──
function init() {
  renderTimeline();
  bindChannelTabs();
  selectStage("order_placed", 0);
}

// ── Timeline ──
function renderTimeline() {
  const container = document.getElementById("timelineStages");
  STAGES.forEach((stage, i) => {
    const node = document.createElement("div");
    node.className = "stage-node";
    node.dataset.index = i;
    node.dataset.id = stage.id;
    node.innerHTML = `
      <div class="stage-dot"></div>
      <div class="stage-label">${stage.label}</div>
    `;
    node.addEventListener("click", () => selectStage(stage.id, i));
    container.appendChild(node);
  });
}

function selectStage(stageId, index) {
  document.querySelectorAll(".stage-node").forEach((n, i) => {
    n.classList.remove("active");
    n.classList.toggle("completed", i < index);
  });
  document.querySelectorAll(".stage-node")[index].classList.add("active");
  const pct = (index / (STAGES.length - 1)) * 100;
  document.getElementById("timelineProgress").style.width = pct + "%";
  activeStage = stageId;
  renderContent();
}

// ── Channel Tabs ──
function bindChannelTabs() {
  document.querySelectorAll(".channel-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".channel-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      activeChannel = tab.dataset.channel;
      renderContent();
    });
  });
}

// ── Render ──
function renderContent() {
  const area = document.getElementById("contentArea");
  if (activeChannel === "seasonal") {
    area.innerHTML = renderSeasonal();
    return;
  }
  if (!activeStage) {
    area.innerHTML = `<div class="empty-state"><p>Select a stage above to see communications</p></div>`;
    return;
  }
  const stageData = DATA[activeStage];
  if (!stageData) {
    area.innerHTML = `<div class="no-messages">No data for this stage</div>`;
    return;
  }
  if (activeChannel === "inapp") {
    area.innerHTML = renderInApp(stageData.inapp);
  } else {
    const channelData = stageData[activeChannel];
    const label = activeChannel === "push" ? "Push Notifications" : activeChannel === "sms" ? "SMS" : "Email";
    area.innerHTML = renderCardList(channelData, label);
  }
}

function renderSeasonal() {
  let html = "";
  Object.values(SEASONAL_DATA).forEach((category) => {
    html += `<div class="surface-section">`;
    html += `<div class="surface-header"><span class="surface-label">${category.label}</span></div>`;
    category.messages.forEach((msg) => { html += renderMsgCard(msg, !!msg.surfaces); });
    html += `</div>`;
  });
  return html || `<div class="no-messages">No seasonal communications</div>`;
}

function renderInApp(inappData) {
  if (!inappData) return `<div class="no-messages">No in-app communications at this stage</div>`;
  let html = "";

  // Main messages (no header — just cards with surface chips)
  if (inappData.main && inappData.main.length > 0) {
    html += `<div class="surface-section">`;
    inappData.main.forEach((msg) => { html += renderMsgCard(msg, true); });
    html += `</div>`;
  }

  // Headed sections
  HEADED_SURFACES.forEach((surface) => {
    const messages = inappData[surface];
    if (!messages || messages.length === 0) return;
    const label = SURFACE_LABELS[surface] || surface;
    html += `<div class="surface-section">`;
    html += `<div class="surface-header"><span class="surface-label">${label}</span></div>`;
    messages.forEach((msg) => { html += renderMsgCard(msg, !!msg.surfaces); });
    html += `</div>`;
  });

  return html || `<div class="no-messages">No in-app communications at this stage</div>`;
}

function renderCardList(messages, label) {
  if (!messages || messages.length === 0) {
    return `<div class="no-messages">No ${label.toLowerCase()} communications at this stage</div>`;
  }
  let html = `<div class="surface-section">`;
  html += `<div class="surface-header"><span class="surface-label">${label}</span></div>`;
  messages.forEach((msg) => { html += renderMsgCard(msg, false); });
  html += `</div>`;
  return html;
}

function renderMsgCard(msg, showSurfaces) {
  const id = "card-" + Math.random().toString(36).slice(2, 8);
  const hasTitleDesc = msg.title;
  const langs = hasTitleDesc
    ? LANG_ORDER.filter((l) => msg.title[l])
    : LANG_ORDER.filter((l) => msg[l]);

  // Build chips
  let chips = "";
  if (msg.delay) chips += '<span class="delay-tag">DELAY</span>';
  if (showSurfaces && msg.surfaces) {
    msg.surfaces.forEach((s) => {
      const label = s === "homescreen" ? "Homescreen" : "OTP";
      chips += `<span class="surface-chip ${s}">${label}</span>`;
    });
  }

  // Build body
  let inner = "";
  if (hasTitleDesc) {
    // Title + Description combined format
    langs.forEach((lang) => {
      const dir = RTL_LANGS.has(lang) ? 'dir="rtl"' : "";
      const titleText = msg.title[lang] || "";
      const descText = msg.desc && msg.desc[lang] ? msg.desc[lang] : "";
      inner += `<div class="lang-row lang-row-combined" ${dir}>`;
      inner += `<span class="lang-label ${lang}">${LANG_LABELS[lang]}</span>`;
      inner += `<div class="combined-text">`;
      inner += `<div class="combined-title">${titleText}</div>`;
      if (descText) inner += `<div class="combined-desc">${descText}</div>`;
      inner += `</div></div>`;
    });
  } else {
    // Simple flat format (substatus, push, sms, etc.)
    langs.forEach((lang) => {
      const dir = RTL_LANGS.has(lang) ? 'dir="rtl"' : "";
      inner += `<div class="lang-row" ${dir}><span class="lang-label ${lang}">${LANG_LABELS[lang]}</span> ${msg[lang]}</div>`;
    });
  }

  return `
    <div class="msg-card" id="${id}">
      <div class="msg-card-header" onclick="document.getElementById('${id}').classList.toggle('open')">
        <div class="msg-card-header-left">
          <span class="msg-card-scenario">${msg.scenario}</span>
          <div class="msg-card-chips">${chips}</div>
        </div>
        <span class="msg-card-chevron">\u25BC</span>
      </div>
      <div class="msg-card-body">
        <div class="msg-card-inner">${inner}</div>
      </div>
    </div>
  `;
}

init();
