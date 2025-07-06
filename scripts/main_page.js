document.addEventListener("DOMContentLoaded", function() {

    // ===================================================================
    // ==================== STICKY NAVBAR ON SCROLL ======================
    // ===================================================================
    // This script makes the navbar stick to the top after scrolling down.
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('header');

    // We only run this if a header and navbar element actually exist on the page.
    if (header && navbar) {
        // The point at which the navbar should become sticky is the bottom of the header.
        const stickyPoint = header.offsetHeight;

        window.addEventListener("scroll", function() {
            // When scroll position is greater than the bottom of the header
            if (window.scrollY > stickyPoint) {
                // Add the 'navbar-fixed' class. The corresponding styles must exist in the CSS file.
                navbar.classList.add('navbar-fixed');
            } else {
                // Remove the class when the user scrolls back to the top.
                navbar.classList.remove('navbar-fixed');
            }
        });
    }

    // ===================================================================
    // ==================== UNIFIED MODAL FUNCTION =====================
    // ===================================================================
    // A reusable function to open a Bootstrap modal with dynamic content.
    // Used by both sliders to show details.
    function openSlideDetailModal(item, modalId, imageId, descriptionId) {
        const modalElement = document.getElementById(modalId);
        if (!modalElement) {
            console.error(`Modal with ID '${modalId}' not found.`);
            return;
        }

        const modalTitle = modalElement.querySelector('.modal-title');
        const modalImage = modalElement.querySelector(`#${imageId}`);
        const modalDescription = modalElement.querySelector(`#${descriptionId}`);

        if (modalTitle) modalTitle.textContent = item.title;
        if (modalImage) {
            modalImage.src = item.image || 'https://via.placeholder.com/1280x700/CCCCCC/666666?text=بدون+عکس'; // Fallback image
            modalImage.alt = item.title;
        }
        if (modalDescription) modalDescription.textContent = item.description;

        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
    }

    // ===================================================================
    // ==================== SLIDER 1 (PMS SLIDER) LOGIC ==================
    // ===================================================================
    // This section controls the main events slider (pms-swiper).
    const pmsSwiperElement = document.querySelector('.pms-swiper');
    if (pmsSwiperElement) {
        const pmsAutoplayDelay = 4000;

        function setPmsBulletAnimation(swiperInstance) {
            const bullets = document.querySelectorAll('.pms-swiper-pagination-bullet');
            const realIndex = swiperInstance.realIndex;

            bullets.forEach((bullet, index) => {
                const progressCircle = bullet.querySelector('.pms-progress-circle');
                if (progressCircle) {
                    progressCircle.style.animation = 'none';
                    if (index === realIndex) {
                        void progressCircle.offsetWidth; // Force reflow
                        progressCircle.style.animation = `fill-circle ${pmsAutoplayDelay / 1000}s linear forwards`;
                    } else {
                        progressCircle.style.strokeDashoffset = '100.5';
                    }
                }
            });
        }

        const pmsSwiper = new Swiper('.pms-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: pmsAutoplayDelay,
                disableOnInteraction: false,
            },
            speed: 700,
            spaceBetween: 40,
            coverflowEffect: {
                rotate: 15,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            },
            pagination: {
                el: '.pms-swiper-pagination',
                clickable: true,
                renderBullet: function(index, className) {
                    return `<span class="${className} pms-swiper-pagination-bullet"><svg class="pms-progress-circle-svg" viewBox="0 0 36 36"><circle class="pms-background-circle" cx="18" cy="18" r="16" fill="none" stroke="#ddd" stroke-width="3"></circle><circle class="pms-progress-circle" cx="18" cy="18" r="16" fill="none" stroke-dasharray="100.5" stroke-dashoffset="100.5"></circle></svg><span class="pms-bullet-number">${index + 1}</span></span>`;
                }
            },
            navigation: {
                nextEl: '.pms-swiper-button-next',
                prevEl: '.pms-swiper-button-prev',
            },
            breakpoints: {
                992: {
                    slidesPerView: 1,
                    effect: 'coverflow',
                    coverflowEffect: { rotate: 0, stretch: 0, depth: 0, modifier: 1, slideShadows: false }
                },
                0: {
                    slidesPerView: 1,
                    effect: 'slide'
                }
            },
            on: {
                init: setPmsBulletAnimation,
                slideChangeTransitionStart: setPmsBulletAnimation,
                click: function(swiper, event) {
                    const clickedSlide = event.target.closest('.swiper-slide.swiper-slide-active');
                    if (clickedSlide) {
                        const { title, description } = clickedSlide.dataset;
                        const image = clickedSlide.querySelector('img')?.src || '';
                        openSlideDetailModal({ title, description, image }, 'pmsSlideDetailModal', 'pmsModalImage', 'pmsModalDescription');
                    }
                }
            }
        });
        setPmsBulletAnimation(pmsSwiper);
    }

    // ===================================================================
    // ==================== STATS COUNTER ANIMATION ======================
    // ===================================================================
    // Animates the statistics circles when they scroll into view.
    function toPersianDigits(str) {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return String(str || '').replace(/[0-9.]/g, (w) => (w === '.' ? '٫' : persianDigits[+w]));
    }

    const statItems = document.querySelectorAll(".stat-item");
    if (statItems.length > 0) {
        const animateStat = (item) => {
            const numberSpan = item.querySelector('.stat-number');
            const progressCircle = item.querySelector('.circle-progress');
            if (!numberSpan || !progressCircle) return;

            const target = +numberSpan.getAttribute('data-target');
            const isFloat = target % 1 !== 0;
            const radius = progressCircle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
            progressCircle.style.strokeDashoffset = circumference;

            let startTime = null;
            const duration = 2000;

            function animationStep(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const currentCount = progress * target;

                numberSpan.innerText = toPersianDigits(isFloat ? currentCount.toFixed(1) : Math.floor(currentCount));
                const offset = circumference - (progress * circumference * (target / 100));
                progressCircle.style.strokeDashoffset = offset;

                if (progress < 1) {
                    requestAnimationFrame(animationStep);
                } else {
                    numberSpan.innerText = toPersianDigits(isFloat ? target.toFixed(1) : target);
                    progressCircle.style.strokeDashoffset = circumference - (circumference * (target / 100));
                }
            }
            requestAnimationFrame(animationStep);
        };

        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStat(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statItems.forEach(item => statsObserver.observe(item));
    }

    // ===================================================================
    // ================== SLIDER 2 (NEWS SLIDER) LOGIC ===================
    // ===================================================================
    // This section controls the news slider and its category filters.
    const shirazNewsContainer = document.querySelector('.shiraz-news-main-container');
    if (shirazNewsContainer) {
        const shirazNewsSliderData = {
            'پایگاه خبری': [
                { title: 'همایش پیاده‌روی خانوادگی در پارک کوهپایه', description: 'با هدف تقویت هویت شهری و مستندسازی تاریخ و فرهنگ شیراز، مرکز شیرازشناسی در بوستان بعثت افتتاح شد. این مرکز که در بنایی تاریخی و مرمت‌شده به نام کوشک بعثت قرار دارد، شامل بخش‌های پژوهشی، نمایشگاهی و آموزشی است. در مراسم افتتاحیه، از دانشنامه ۱۷ جلدی شیراز نیز رونمایی شد که حاصل سال‌ها تلاش پژوهشگران بومی است. مرکز شیرازشناسی به‌عنوان مرجع فرهنگی برای شهروندان، دانشجویان و گردشگران طراحی شده و قرار است میزبان نشست‌های تخصصی، کارگاه‌های آموزشی و نمایشگاه‌های موضوعی باشد. این اقدام شهرداری شیراز در راستای ارتقای آگاهی عمومی نسبت به پیشینه تاریخی شهر، گامی مؤثر در توسعه پایدار فرهنگی محسوب می‌شود.', image: '../images/photo/پیاده‌روی خانوادگی در پارک.jpg' },
                { title: 'افتتاح مرکز شیرازشناسی در بوستان بعثت', description: 'شهرداری شیراز با هدف بهبود وضعیت ترافیک شهری، طرح‌های نوینی را به اجرا گذاشته است. این طرح‌ها شامل توسعه حمل و نقل عمومی، هوشمندسازی چراغ‌های راهنمایی و رانندگی، و فرهنگ‌سازی در زمینه استفاده کمتر از خودروی شخصی است. امید است با این اقدامات، شاهد روان‌تر شدن ترافیک در ساعات اوج باشیم.', image: '../images/roydad/افتتاح مرکز شیرازشناسی در بوستان بعثت.jpg' },
                { title: 'افتتاح فاز جدید پل کابلی ولیعصر (عج) شیراز', description: 'فاز جدید پل کابلی ولیعصر (عج) در شیراز به بهره‌برداری رسید. این پروژه که از جمله طرح‌های بزرگ عمرانی شهرداری شیراز محسوب می‌شود، نقش بسزایی در روان‌سازی ترافیک و تسهیل عبور و مرور در یکی از پرترددترین نقاط شهر ایفا خواهد کرد.', image: '../images/pol.jpg' },
                { title: 'افزایش ظرفیت گردشگری با اقامتگاه‌های بوم‌گردی', description: 'با هدف توسعه صنعت گردشگری و جذب بیشتر توریست، چندین اقامتگاه بوم‌گردی جدید در مناطق مختلف شیراز و اطراف آن به بهره‌برداری رسید. این اقامتگاه‌ها با حفظ معماری سنتی، تجربه‌ای متفاوت و اصیل از فرهنگ و طبیعت فارس را برای بازدیدکنندگان فراهم می‌کنند.', image: '../images/boomgardi.jpg' },
                { title: 'تقاطع غیرهمسطح شهیدان آماده بهره‌برداری', description: 'فاز جدید پل کابلی ولیعصر (عج) در شیراز به بهره‌برداری رسید. این پروژه که از جمله طرح‌های بزرگ عمرانی شهرداری شیراز محسوب می‌شود، نقش بسزایی در روان‌سازی ترافیک و تسهیل عبور و مرور در یکی از پرترددترین نقاط شهر ایفا خواهد کرد.', image: '../images/shahidan.jpg' }
            ],
            'گزارش تصویری': [
                { title: 'نمایشگاه صنایع‌دستی در باغ عفیف‌آباد', description: 'اغ تاریخی عفیف‌آباد میزبان نمایشگاهی از صنایع‌دستی هنرمندان شیرازی بود. از خاتم‌کاری و قلم‌زنی گرفته تا سفال و گلیم، آثار هنری اصیل ایرانی در فضایی سنتی به نمایش درآمدند. این نمایشگاه فرصتی برای آشنایی با هنرهای بومی و حمایت از تولیدکنندگان محلی فراهم کرد.', image: '../images/photo/نمایشگاه صنایع‌دستی در عفیف‌آباد.jpg' },
                { title: ' جشنواره خیابانی «رنگ زندگی» در بلوار چمران', description: 'در یک رویداد پرشور هنری، خیابان‌های بلوار چمران شیراز میزبان جشنواره «رنگ زندگی» شدند. هنرمندان خیابانی با نقاشی، موسیقی زنده و نمایش‌های تعاملی، فضای شهری را به گالری زنده‌ای تبدیل کردند. این جشنواره با هدف ترویج هنر شهری و مشارکت مردمی برگزار شد و با استقبال گسترده شهروندان همراه بود.', image: '../images/photo/جشنواره.jpg' },
                { title: 'تئاتر خیابانی صدای شهر در شیراز', description: 'گروهی از هنرمندان جوان با اجرای تئاتر خیابانی «صدای شهر» در میدان شهرداری، روایت‌هایی از زندگی روزمره شهروندان را به تصویر کشیدند. این اجرا با محوریت همدلی، عدالت اجتماعی و امید، توجه رهگذران را جلب کرد و تحسین بسیاری را برانگیخت.', image: '../images/photo/اجرای تئاتر خیابانی «صدای شهر» در میدان شهرداری.jpg' },
                { title: 'جشن شب یلدای محله سنگ سیاه شیراز', description: 'در شب یلدا، اهالی محله سنگ سیاه با برگزاری جشن محلی، آیین‌های سنتی ایرانی را زنده کردند. از شاهنامه‌خوانی و موسیقی سنتی گرفته تا سفره‌های رنگارنگ و بازی‌های محلی، این جشن نمادی از همبستگی و هویت فرهنگی بود', image: '../images/photo/جشن شب یلدا در محله سنگ سیاه.jpg' },
                { title: 'کارگاه نقاشی کودکان در شیراز', description: 'فرهنگسرای طوبی میزبان کارگاه نقاشی ویژه کودکان بود. در این برنامه، کودکان با راهنمایی مربیان هنری، احساسات خود را روی بوم آوردند. هدف از این کارگاه، پرورش خلاقیت، افزایش اعتماد به نفس و آشنایی با رنگ‌ها و فرم‌ها بود.', image: '../images/photo/کارگاه نقاشی کودکان در فرهنگسرا.jpg' }
            ],
            'رویدادهای شهر': [
                { title: 'رونمایی از سمفونی شیراز با آهنگسازی کارن همایون‌فر', description: 'در مراسمی باشکوه و کم‌نظیر، سمفونی شیراز با آهنگسازی استاد کارن همایون‌فر و اجرای ارکستر ملی ایران در تالار حافظ رونمایی شد. این اثر موسیقایی با الهام از تاریخ، طبیعت و فرهنگ غنی شیراز خلق شده و تلاش دارد تا روح شهر را در قالب نت‌ها و ملودی‌ها به تصویر بکشد. حضور چهره‌های برجسته هنری، مسئولان فرهنگی و استقبال پرشور مردم، این رویداد را به یکی از نقاط اوج هفته شیراز تبدیل کرد. سمفونی شیراز نه‌تنها یک اثر هنری، بلکه گامی در جهت معرفی ظرفیت‌های فرهنگی این کلان‌شهر در سطح ملی و بین‌المللی است. این برنامه با کلیدواژه‌هایی چون «موسیقی شیراز»، «هویت فرهنگی» و «رویداد هنری شیراز» در فضای مجازی بازتاب گسترده‌ای داشت', image: '../images/roydad/رونمایی از سمفونی شیراز با آهنگسازی کارن همایون‌فر.jpg' },
                { title: 'جشن دختران در باغ عفیف‌آباد', description: 'در تقارن هفته شیراز با دهه کرامت، جشن باشکوهی با حضور بیش از سه هزار دختر نوجوان در باغ تاریخی عفیف‌آباد برگزار شد. این برنامه با هدف تقویت روحیه، ایجاد نشاط اجتماعی و پاسداشت مقام دختران، شامل اجرای موسیقی زنده، مسابقات فرهنگی، نمایشگاه‌های هنری و اهدای جوایز بود. حضور خانواده‌ها، فضای صمیمی و مشارکت نهادهای مردمی، این جشن را به الگویی موفق از رویدادهای فرهنگی-اجتماعی تبدیل کرد.', image: '../images/roydad/جشن دختران در باغ عفیف‌آباد.jpg' },
                { title: 'آیین تعویض قرآن دروازه قرآن شیراز', description: 'در یکی از آیینی‌ترین رویدادهای هفته شیراز، مراسم تعویض قرآن دروازه قرآن با حضور مسئولان شهری، هنرمندان و جمعی از شهروندان برگزار شد. این آیین که هر ساله در آستانه روز شیراز برگزار می‌شود، نمادی از احترام به میراث معنوی و تاریخی شهر است. دروازه قرآن، به‌عنوان یکی از نمادهای فرهنگی شیراز، با قرار گرفتن قرآن نفیس در بالای آن، همواره یادآور پیوند عمیق این شهر با ارزش‌های دینی و فرهنگی بوده است. امسال نیز با تعویض قرآن و قرائت آیاتی از کلام‌الله مجید، فضای روحانی و معنوی خاصی در محل حاکم شد. این رویداد در رسانه‌های محلی بازتاب گسترده‌ای داشت و به‌عنوان یکی از شاخص‌ترین برنامه‌های فرهنگی هفته شیراز معرفی شد', image: '../images/roydad/آیین تعویض قرآن دروازه قرآن شیراز.jpg' },
                { title: 'رونمایی از ۱۷ سردیس مشاهیر شیراز در باغ ارم', description: 'در مراسمی رسمی و فرهنگی، از ۱۷ سردیس مشاهیر و نخبگان شیرازی در باغ ارم رونمایی شد. این سردیس‌ها شامل چهره‌هایی چون دکتر خدادوست، دکتر ملک‌حسینی و دیگر برگزیدگان جایزه علامه قطب‌الدین شیرازی بودند. این اقدام در راستای تقویت هویت شهری، الگوسازی برای نسل جوان و پاسداشت مفاخر علمی و فرهنگی شیراز انجام شد. باغ ارم، با معماری تاریخی و فضای سبز دل‌انگیز، بستر مناسبی برای این رویداد فاخر بود', image: '../images/roydad/رونمایی از ۱۷ سردیس مشاهیر شیراز در باغ ارم.jpg' },
                { title: 'جشنواره موسیقی اقوام (سومین دوره)', description:'جشنواره موسیقی اقوام ایران، با تمرکز بر فرهنگ موسیقیایی و آواهای محلی، در شیراز برگزار می‌شود. در سومین دوره این جشنواره، هشت گروه موسیقی سنتی و محلی از استان‌های مختلف فارس حضور یافتند و هر شب در فضایی تاریخی اجرا داشتند.', image:'../images/roydad/جشنواره موسیقی اقوام.jpg'},
   ],
            'هم قدم با شیراز': [
                { title: 'درخت‌کاری در شیراز  مشارکت مردمی برای شهری سبزتر', description: 'در یک صبح بهاری، گروهی از دانش‌آموزان، فعالان محیط‌زیست و شهروندان داوطلب در تپه الله‌اکبر گرد هم اومدن تا با کاشت نهال، سهمی در آینده سبز شیراز داشته باشن. این برنامه که با همکاری شهرداری و سازمان‌های مردم‌نهاد برگزار شد، بخشی از طرح «شیراز نفس می‌کشد» بود.در کنار کاشت درخت، کارگاه‌های آموزشی درباره حفظ منابع طبیعی و بازیافت هم برگزار شد. بچه‌ها با دست‌های خاکی و دل‌های شاد، نهال‌هایی کاشتن که شاید روزی سایه‌سار نسل بعدی بشن.«هم‌قدم با شیراز» یعنی همین—قدم زدن در مسیر مسئولیت‌پذیری و عشق به زمین', image: '../images/hamgam/درخت‌کاری داوطلبانه در تپه الله‌اکبر.jpg' },
                { title: 'روایت یک روز با پاکبانان شیراز؛ قهرمانان خاموش شهر', description: 'ساعت ۴ صبح، وقتی بیشتر شهر هنوز در خواب فرو رفته، پاکبانان شیراز کارشون رو شروع می‌کنن. با جاروهای بلند و لباس‌های فسفری، خیابون‌ها رو تمیز می‌کنن تا ما روزمون رو با آرامش شروع کنیم. در یکی از برنامه‌های «هم‌قدم با شیراز»، خبرنگار محلی یک روز کامل رو با یکی از این پاکبان‌ها گذروند؛ از جمع‌آوری زباله تا گفت‌وگو با مردم. نتیجه؟ احترام بیشتر، آگاهی بیشتر، و قدردانی از کسانی که بی‌صدا، شهر رو زنده نگه می‌دارن', image: '../images/hamgam/پاکبان .jpg' },
                { title: 'قصه‌های محله سنگ‌سیاه؛ جایی که تاریخ هنوز نفس می‌کشه', description: 'در دل بافت تاریخی شیراز، محله‌ای هست که هنوز صدای پای تاریخ در کوچه‌هاش شنیده می‌شه: سنگ‌سیاه. این محله با معماری سنتی، بازارچه‌های قدیمی، و حضور آرامگاه سید تاج‌الدین غریب، یکی از قطب‌های فرهنگی و مذهبی شهره. اما چیزی که سنگ‌سیاه رو خاص‌تر می‌کنه، مردمشه؛ پیرمردی که هنوز با چرخ دستی‌اش فالوده می‌فروشه، یا مادری که هر روز جلوی در خونه‌اش گلدون‌ها رو آب می‌ده و با رهگذرا خوش‌وبش می‌کنه.«هم‌قدم با شیراز» یعنی ایستادن کنار همین آدم‌ها، شنیدن قصه‌هاشون، و دیدن شهری که با مردمش زنده‌ست', image: '../images/hamgam/قصه‌های محله سنگ‌سیاه.jpg' },
                { title: 'بازارهای سنتی و خرید سوغاتی در شیراز.', description: 'در قلب شیراز، جایی هست که هنوز صدای چکش مس‌گران، عطر ادویه‌های شرقی و گفت‌وگوی گرم فروشنده‌ها، تو رو به قرن‌ها پیش می‌بره: بازار وکیل. این بازار تاریخی که به دستور کریم‌خان زند ساخته شده، نه‌فقط یک مرکز خرید، بلکه موزه‌ای زنده از فرهنگ و اقتصاد مردمیهدر برنامه «هم‌قدم با شیراز»، همراه شدیم با یک استاد خاتم‌کار که بیش از ۴۰ ساله در حجره کوچکش هنر می‌آفرینه. از خاطراتش گفت، از روزهایی که بازار پر از صدای ساز و آواز بود، و از گردشگرهایی که با چشم‌های پر از شگفتی به هنر ایرانی نگاه می‌کردن.بازار وکیل، جاییه که هنوز می‌شه با مردم حرف زد، چای خورد، و فهمید شیراز فقط یک شهر نیست—یه حسه', image: '../images/hamgam/یک روز در بازار وکیل.jpg' },
                { title: 'کودکان و قصه‌خوانی در پارک آزادی؛ جادوی کلمات در دل طبیعت', description: 'عصر یک جمعه‌ بهاری، نیمکت‌های پارک آزادی پر از کودکان مشتاقی بود که گوش به قصه سپرده بودن. برنامه‌ای با عنوان «قصه‌های شیراز» که با هدف ترویج فرهنگ مطالعه و تقویت ارتباط والدین و فرزندان برگزار شد. مادربزرگ‌های داوطلب از دل محله‌ها اومده بودن تا قصه‌هایی از سعدی، شاهنامه و افسانه‌های بومی رو برای بچه‌ها روایت کنن. صدای آرام قصه‌گوها، بازی پرندگان و لبخندهای کودکانه، پارک رو به باغی از خیال تبدیل کرده بود. «هم‌قدم با شیراز» یعنی کنار هم نشستن، شنیدن، یاد گرفتن—و بزرگ شدن در سایه‌ی مهربانی.', image: '../images/hamgam/قصه‌خوانی در پارک آزادی شیراز.jpg' },

            ]
        };

        let shirazNewsSwiperInstance = null;
        const shirazNewsDefaultCategory = 'پایگاه خبری';
        const shirazNewsAutoplayDelay = 4000;

        function setShirazNewsBulletAnimation(swiperInstance) {
            const bullets = document.querySelectorAll('.shiraz-news-swiper-pagination-bullet');
            const realIndex = swiperInstance.realIndex;

            bullets.forEach((bullet, index) => {
                const progressCircle = bullet.querySelector('.shiraz-news-progress-circle');
                if (progressCircle) {
                    progressCircle.style.animation = 'none';
                    if (index === realIndex) {
                        void progressCircle.offsetWidth;
                        progressCircle.style.animation = `fill-circle ${shirazNewsAutoplayDelay / 1000}s linear forwards`;
                    } else {
                        progressCircle.style.strokeDashoffset = '100.5';
                    }
                }
            });
        }

        function populateShirazNewsSwiper(dataArray) {
            const swiperWrapper = document.querySelector('.shiraz-news-swiper .swiper-wrapper');
            if (!swiperWrapper) return;
            swiperWrapper.innerHTML = '';

            const nextBtn = document.querySelector('.shiraz-news-swiper-button-next');
            const prevBtn = document.querySelector('.shiraz-news-swiper-button-prev');
            const paginationEl = document.querySelector('.shiraz-news-swiper-pagination');

            if (dataArray.length === 0) {
                swiperWrapper.innerHTML = `<div class="swiper-slide shiraz-news-empty-message"><h3>هیچ محتوایی برای نمایش در این دسته وجود ندارد.</h3></div>`;
                if (nextBtn) nextBtn.style.display = 'none';
                if (prevBtn) prevBtn.style.display = 'none';
                if (paginationEl) paginationEl.style.display = 'none';
                if (shirazNewsSwiperInstance) {
                    shirazNewsSwiperInstance.destroy(true, true);
                    shirazNewsSwiperInstance = null;
                }
                return;
            } else {
                if (nextBtn) nextBtn.style.display = 'flex';
                if (prevBtn) prevBtn.style.display = 'flex';
                if (paginationEl) paginationEl.style.display = 'block';
            }

            const slidesHtml = dataArray.map(item => `
                <div class="swiper-slide">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="shiraz-news-slide-content"><h5>${item.title}</h5></div>
                </div>
            `).join('');
            swiperWrapper.innerHTML = slidesHtml;

            if (shirazNewsSwiperInstance) {
                shirazNewsSwiperInstance.destroy(true, true);
            }

            shirazNewsSwiperInstance = new Swiper('.shiraz-news-swiper', {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                loop: true,
                autoplay: { delay: shirazNewsAutoplayDelay, disableOnInteraction: false },
                speed: 700,
                spaceBetween: 40,
                coverflowEffect: { rotate: 15, stretch: 0, depth: 100, modifier: 1, slideShadows: false },
                pagination: {
                    el: '.shiraz-news-swiper-pagination',
                    clickable: true,
                    renderBullet: function(index, className) {
                        return `<span class="${className} shiraz-news-swiper-pagination-bullet"><svg class="shiraz-news-progress-circle-svg" viewBox="0 0 36 36"><circle class="shiraz-news-background-circle" cx="18" cy="18" r="16"></circle><circle class="shiraz-news-progress-circle" cx="18" cy="18" r="16"></circle></svg><span class="shiraz-news-bullet-number">${index + 1}</span></span>`;
                    }
                },
                navigation: { nextEl: '.shiraz-news-swiper-button-next', prevEl: '.shiraz-news-swiper-button-prev' },
                breakpoints: { 992: { slidesPerView: 3 }, 0: { slidesPerView: 1 } },
                on: {
                    init: setShirazNewsBulletAnimation,
                    slideChangeTransitionStart: setShirazNewsBulletAnimation,
                    click: function(swiper, event) {
                        const clickedSlide = event.target.closest('.swiper-slide.swiper-slide-active');
                        if (clickedSlide) {
                            const currentCategory = document.querySelector('.shiraz-news-category-btn.active')?.dataset.category || shirazNewsDefaultCategory;
                            const clickedData = shirazNewsSliderData[currentCategory]?.[swiper.realIndex];
                            if (clickedData) {
                                openSlideDetailModal(clickedData, 'shirazNewsSlideDetailModal', 'shirazNewsModalImage', 'shirazNewsModalDescription');
                            }
                        }
                    }
                }
            });
        }

        const categoryButtons = document.querySelectorAll('.shiraz-news-category-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                event.target.classList.add('active');
                const selectedCategory = event.target.dataset.category;
                populateShirazNewsSwiper(shirazNewsSliderData[selectedCategory] || []);
            });
        });

        const defaultButton = document.querySelector(`.shiraz-news-category-btn[data-category="${shirazNewsDefaultCategory}"]`);
        if (defaultButton) defaultButton.click();
    }

    // ===================================================================
    // =================== DYNAMIC CARDS SECTION LOGIC ===================
    // ===================================================================
    const cardsContainer = document.getElementById('cards-container');
    if (cardsContainer) {
        const cardsData = [
            { imageSrc: "../images/sajjad-ahmadi-ud6GInkmcWE-unsplash.jpg", title: "اطلاعات شهری", description: "شیراز با جمعیتی نزدیک به ۱٫۷ میلیون نفر در سال ۲۰۲۵، قلب اداری و تاریخی استان فارس است؛ شهری که به باغ‌های باستانی و لقب شهر شعر و شهره دارد.", likeCount: "۱۵۰۰", cardBackground: "radial-gradient(208.41% 100% at 100% 0%, #E9EDF1 0%, #FFFFFF 100%)", panelColor: "linear-gradient(113.52deg, #65CDE3 23.44%, #438DA6 100%)", stats: [{ value: "۱۱", label: "مناطق شهرداری" }, { value: "۱۵۰۰", label: "ارباب صنایع" }, { value: "۲۱-۲۷KM²", label: "مساحت شهر" }] },
            { imageSrc: "../images/abolfazl-ranjbar-_PnXmRIhIIA-unsplash.jpg", title: "گردشگری و توریسم", description: "از باغ ارم، یونسکو تا مسجد نصیرالملک, دروازه قرآن و بازار وکیل. دیدنی‌های شیراز هر سال هزاران مسافر ایرانی و خارجی را مجذوب خود می‌کند.", likeCount: "۲۵", cardBackground: "radial-gradient(208.41% 100% at 100% 0%, #FFE6C1 0%, #FFFFFF 84.13%)", panelColor: "linear-gradient(113.52deg, #FCF68D 23.44%, #FFC531 100%)", stats: [{ value: "۱۷", label: "اقامتگاه بومگردی" }, { value: "۳", label: "تعداد پارک" }, { value: "۵", label: "تعداد هتل" }] },
            { imageSrc: "../images/steven-su-AxhfHp6fJ2M-unsplash.jpg", title: "فرهنگ و هنر", description: "شیراز زادگاه حافظ و سعدی است؛ هر شب دوست‌داران ادب برای فال و غزل به آرامگاه شاعر محبوب‌شان در حافظیه سر می‌زنند و حال‌وهوای کاملاً فرهنگی را تجربه می‌کنند.", likeCount: "۲۵", cardBackground: "radial-gradient(208.41% 100% at 100% 0%, #F3D6F5 0%, #FFFFFF 84.13%)", panelColor: "linear-gradient(113.52deg, #C191FE 23.44%, #907CE4 100%)", stats: [{ value: "۱۰", label: "فرهنگستان ادبی" }, { value: "۲۰+", label: "موزه ها" }, { value: "۱", label: "فستیوال هنری" }] },
            { imageSrc: "../images/soheil-jei-HsNbiaR52As-unsplash.jpg", title: "جاذبه‌های مذهبی", description: "حرم باشکوه شاهچراغ با گنبد فیروزه‌ای و آینه‌کاری چشم‌نوازش، مهم‌ترین قطب زیارتی شیراز است و برای اولین بار به سده دوازدهم میلاد برمی‌گردد.", likeCount: "۲۵", cardBackground: "radial-gradient(208.41% 100% at 100% 0%, #FFF1C8 0%, #FFFFFF 84.13%)", panelColor: "linear-gradient(113.52deg, #FFB76D 23.44%, #EF7F4B 100%)", stats: [{ value: "۱۴۰۰", label: "اماکن مذهبی" }, { value: "۳", label: "ساختمان قدیمی" }, { value: "۱۳۰۰", label: "تعداد امامزاده" }] },
            { imageSrc: "../images/ramin-alizadeh-eXnplP434Rs-unsplash.jpg", title: "نقشه گردشگری شیراز", description: "نقشه تعاملی گردشگری شهر، جاذبه‌ها، رستوران‌ها و مسیرهای حمل‌ونقل را یکجا نمایش می‌دهد تا برنامه‌ریزی سفر در تلفن همراهتان ساده و سریع باشد.", likeCount: "۲۵", cardBackground: "radial-gradient(208.41% 100% at 100% 0%, #D0F0FF 0%, #FFFFFF 84.13%)", panelColor: "linear-gradient(113.52deg, #84B7EA 23.44%, #5D87FF 100%)", stats: [{ value: "۳۶", label: "نقشه آفلاین" }, { value: "۲۶", label: "دانلود شده" }, { value: "۲۸.۱KM²", label: "مساحت برنامه" }] },
            { imageSrc: "../images/ali-haghighi-2yKWRwdxMMw-unsplash.jpg", title: "محیط زیست و فضای سبز", description: "طرح‌های توسعه فضای سبز شیراز در کنار باغ‌های تاریخی مثل ارم و عفیف‌آباد، هوای پاک و مناظری دلپذیر برای شهروندان فراهم کرده و دلیل لقب شهر باغ‌ها شده است.", likeCount: "۲۵", cardBackground: "radial-gradient(208.41% 100% at 100% 0%, #D5F5DA 0%, #FFFFFF 84.13%)", panelColor: "linear-gradient(113.52deg, #7DF7C2 23.44%, #30C584 100%)", stats: [{ value: "۸۹", label: "پارک های شهری" }, { value: "۱۱KM²", label: "مساحت باغ ها" }, { value: "۱۰۰%+ ", label: "فضای سبز عمومی" }] }
        ];

        function generateCardHtml(cardData) {
            return `<div class="col-12 col-sm-6 col-md-4 d-flex mb-5"><div class="card w-100 h-100 shadow-sm border-0 rounded-4" style="background: ${cardData.cardBackground};"><img src="${cardData.imageSrc}" class="card-img-top" alt="${cardData.imageAlt}"><div class="card-body d-flex flex-column"><h5 class="card-title text-center mt-3">${cardData.title}</h5><p class="card-text text-justify">${cardData.description}</p><div class="bottom-panel d-flex justify-content-around align-items-center"><div class="like"><i class="fa-solid fa-heart"></i><small class="text-muted">${cardData.likeCount}</small></div><div class="information d-flex justify-content-between align-items-center" style="background: ${cardData.panelColor};">${cardData.stats.map(stat => `<div class="d-flex flex-column align-items-center"><small class="text-muted">${stat.value}</small><p class="mb-0 small">${stat.label}</p></div>`).join('')}</div></div></div></div></div>`;
        }

        cardsContainer.innerHTML = cardsData.map(generateCardHtml).join('');
    }

    // ===================================================================
    // =================== INTERACTIVE MAP LOGIC =========================
    // ===================================================================
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        const districtData = {
            "1": { name: "منطقه ۱", address: "شیراز، چهارراه خلدبرین، جنب پارک خلدبرین، شهرداری منطقه ۱", phone: "۰۷۱-۳۶۴۷۶۰۴۴" },
            "2": { name: "منطقه ۲", address: "شیراز، بلوار دلاوران بسیج، ابتدای بلوار رازی، شهرداری منطقه ۲", phone: "۰۷۱-۳۷۲۵۹۸۰۸" },
            "3": { name: "منطقه ۳", address: "شیراز، خیابان ساحلی شرقی، حد فاصل پل هجرت و پل علی ابن حمزه، شهرداری منطقه ۳", phone: "۰۷۱-۳۲۲۸۸۹۸۱۱" },
            "4": { name: "منطقه ۴", address: "شیراز،ابتدای بلوار امیرکبیر، پایانه امیرکبیر، شهرداری منطقه ۴", phone: "۰۷۱-۳۸۳۱۰۵۰۱" },
            "5": { name: "منطقه ۵", address: "شیراز، بلوار رحمت، رو به رو بوستان سعدی، شهرداری منطقه ۵", phone: "۰۷۱-۳۷۳۹۷۱۷۰" },
            "6": { name: "منطقه ۶", address: "شیراز، گلدشت معالی آباد، شهرداری منطقه ۶", phone: "۰۷۱-۳۶۳۵۱۴۵۰" },
            "7": { name: "منطقه ۷", address: "شیراز، بلوار فرصت شیرازی، ابتدای خیابان ساحلی، ایستگاه شماره ۷ آتش نشانی، شهرداری منطقه ۷", phone: "۰۷۱-۳۷۲۲۰۰۷۷" },
            "8": { name: "منطقه ۸", address: "شیراز، سه راه آستانه، شهرداری منطقه ۸", phone: "۰۷۱-۳۷۳۶۲۰۲۴" },
            "9": { name: "منطقه ۹", address: "شیراز،انتهای بلوار فرزانگان، بلوار طلاییه، شهرداری منطقه ۹", phone: "۰۷۱-۳۸۴۱۰۲۰۰" },
            "10": { name: "منطقه ۱۰", address: "شیراز،بلوار دکتر حسابی، خیابان هاتف، شهرداری منطقه ۱۰", phone: "۰۷۱-۳۶۵۰۱۷۱۷" },
            "11": { name: "منطقه ۱۱", address: "شیراز،بلوار سرداران، نرسیده به ضلع غربی پل غدیر، شهرداری منطقه ۱۱", phone: "۰۷۱-۳۷۲۵۹۹۰۹" },

            "1": { name: "منطقه ۱", address: "شیراز، چهارراه خلدبرین، جنب پارک خلدبرین، شهرداری منطقه ۱", phone: "۳۶۴۷۶۰۴۴-۰۷۱" },
            "2": { name: "منطقه ۲", address: "شیراز، بلوار دلاوران بسیج، ابتدای بلوار رازی، شهرداری منطقه ۲", phone: "۳۷۲۵۹۸۰۸-۰۷۱" },
            "3": { name: "منطقه ۳", address: "شیراز، خیابان ساحلی شرقی، حد فاصل پل هجرت و پل علی ابن حمزه، شهرداری منطقه ۳", phone: "۳۲۲۸۸۹۸۱۱-۰۷۱" },
            "4": { name: "منطقه ۴", address: "شیراز،ابتدای بلوار امیرکبیر، پایانه امیرکبیر، شهرداری منطقه ۴", phone: "۳۸۳۱۰۵۰۱-۰۷۱" },
            "5": { name: "منطقه ۵", address: "شیراز، بلوار رحمت، رو به رو بوستان سعدی، شهرداری منطقه ۵", phone: "۳۷۳۹۷۱۷۰-۰۷۱" },
            "6": { name: "منطقه ۶", address: "شیراز، گلدشت معالی آباد، شهرداری منطقه ۶", phone: "۳۶۳۵۱۴۵۰-۰۷۱" },
            "7": { name: "منطقه ۷", address: "شیراز، بلوار فرصت شیرازی، ابتدای خیابان ساحلی، ایستگاه شماره ۷ آتش نشانی، شهرداری منطقه ۷", phone: "۳۷۲۲۰۰۷۷-۰۷۱" },
            "8": { name: "منطقه ۸", address: "شیراز، سه راه آستانه، شهرداری منطقه ۸", phone: "۳۷۳۶۲۰۲۴-۰۷۱" },
            "9": { name: "منطقه ۹", address: "شیراز،انتهای بلوار فرزانگان، بلوار طلاییه، شهرداری منطقه ۹", phone: "۳۸۴۱۰۲۰۰-۰۷۱" },
            "10": { name: "منطقه ۱۰", address: "شیراز،بلوار دکتر حسابی، خیابان هاتف، شهرداری منطقه ۱۰", phone: "۳۶۵۰۱۷۱۷-۰۷۱" },
            "11": { name: "منطقه ۱۱", address: "شیراز،بلوار سرداران، نرسیده به ضلع غربی پل غدیر، شهرداری منطقه ۱۱", phone: "۳۷۲۵۹۹۰۹-۰۷۱    " }
        };

        const hoverLabel = document.getElementById("district-hover-label");
        const districtInfoList = document.getElementById("district-info-list");

        function loadDistrictInfo() {
            if (!districtInfoList) return;
            districtInfoList.innerHTML = Object.keys(districtData).map(id => {
                const info = districtData[id];
                return `<div class="district-info" id="info-district-${id}"><h3>${info.name}</h3><p><strong>آدرس:</strong> ${info.address}</p><p><strong>تلفن:</strong> ${info.phone}</p></div>`;
            }).join('');
        }

        function setHighlight(districtId, isHighlighting) {
            const districtPath = document.getElementById(`district-${districtId}`);
            const districtInfo = document.getElementById(`info-district-${districtId}`);
            if (districtPath) districtPath.classList.toggle("active", isHighlighting);
            if (districtInfo) {
                districtInfo.classList.toggle("active", isHighlighting);
                if (isHighlighting) districtInfo.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }

        document.querySelectorAll(".district").forEach(path => {
            const num = path.id.replace("district-", "");
            path.addEventListener("mouseenter", e => {
                if (hoverLabel) {
                    hoverLabel.textContent = "منطقه " + num;
                    hoverLabel.style.display = "block";
                }
                setHighlight(num, true);
            });
            path.addEventListener("mousemove", e => {
                if (hoverLabel) {
                    hoverLabel.style.left = e.clientX + 15 + "px";
                    hoverLabel.style.top = e.clientY - 10 + "px";
                }
            });
            path.addEventListener("mouseleave", () => {
                if (hoverLabel) hoverLabel.style.display = "none";
                setHighlight(num, false);
            });
        });

        if (districtInfoList) {
            districtInfoList.addEventListener("mouseover", e => {
                const targetInfoDiv = e.target.closest('.district-info');
                if (targetInfoDiv) {
                    const num = targetInfoDiv.id.replace("info-district-", "");
                    setHighlight(num, true);
                }
            });
            districtInfoList.addEventListener("mouseout", e => {
                const targetInfoDiv = e.target.closest('.district-info');
                if (targetInfoDiv) {
                    const num = targetInfoDiv.id.replace("info-district-", "");
                    setHighlight(num, false);
                }
            });
        }
        loadDistrictInfo();
    }

    // ===================================================================
    // =================== HORIZONTAL ZONE SCROLLER ======================
    // ===================================================================
    const zoneContainer = document.querySelector(".container-zone");
    if (zoneContainer) {
        let scrollInterval;
        let isPaused = false;

        // Clone items for a seamless, infinite scrolling effect
        const originalItems = Array.from(zoneContainer.children);
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            zoneContainer.appendChild(clone);
        });

        const startScrolling = () => {
            if (isPaused) return;
            zoneContainer.classList.add('no-smooth-scroll');
            clearInterval(scrollInterval);
            scrollInterval = setInterval(() => {
                if (zoneContainer.scrollLeft >= zoneContainer.scrollWidth / 2) {
                    zoneContainer.scrollLeft = 0;
                } else {
                    zoneContainer.scrollLeft += 1;
                }
            }, 25);
        };

        const stopScrolling = () => {
            clearInterval(scrollInterval);
            zoneContainer.classList.remove('no-smooth-scroll');
        };

        zoneContainer.addEventListener("mouseenter", () => {
            isPaused = true;
            stopScrolling();
        });

        zoneContainer.addEventListener("mouseleave", () => {
            isPaused = false;
            startScrolling();
        });

        // Use a small timeout to ensure the browser has calculated the new scrollWidth
        setTimeout(() => {
            startScrolling();
        }, 0);
    }
});
