document.addEventListener("DOMContentLoaded", function () {
    // --- Header Logic ---
    const navbar = document.querySelector(".navbar");
    const header = document.querySelector("header");

    // Ensure header element exists before trying to get its offsetHeight
    const headerHeight = header ? header.offsetHeight : 0;

    window.addEventListener("scroll", function () {
        if (window.scrollY >= headerHeight) {
            navbar.classList.add("fix-navbar-nav");
        } else {
            navbar.classList.remove("fix-navbar-nav");
        }
    });

    // --- Unified Modal Opening Function ---
    // This function can now be used for both sliders.
    // It requires the unique IDs for the modal, image, and description elements.
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

    // --- Slider 1 Logic (pms-swiper) ---
    // Define autoplayDelay specifically for this slider
    const pmsAutoplayDelay = 4000;

    function setPmsBulletAnimation(swiperInstance) {
        const bullets = document.querySelectorAll('.pms-swiper-pagination-bullet');
        const realIndex = swiperInstance.realIndex;

        bullets.forEach((bullet, index) => {
            const progressCircle = bullet.querySelector('.pms-progress-circle');
            if (progressCircle) {
                if (index === realIndex) {
                    progressCircle.style.animation = 'none';
                    void progressCircle.offsetWidth; // Force reflow to restart animation
                    progressCircle.style.animation = `fill-circle ${pmsAutoplayDelay / 1000}s linear forwards`;
                } else {
                    progressCircle.style.animation = 'none';
                    progressCircle.style.strokeDashoffset = '100.5'; // Reset for inactive bullets
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
        mousewheel: {
            forceToAxis: true,
        },
        keyboard: {
            enabled: true,
        },
        pagination: {
            el: '.pms-swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return `
                    <span class="${className} pms-swiper-pagination-bullet">
                        <svg class="pms-progress-circle-svg" viewBox="0 0 36 36">
                            <circle class="pms-background-circle" cx="18" cy="18" r="16" fill="none" stroke="#ddd" stroke-width="3"></circle>
                            <circle class="pms-progress-circle" cx="18" cy="18" r="16" fill="none" stroke-dasharray="100.5" stroke-dashoffset="100.5"></circle>
                        </svg>
                        <span class="pms-bullet-number">${index + 1}</span>
                    </span>
                `;
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
                spaceBetween: 0,
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 1,
                    slideShadows: false,
                },
            },
            0: {
                slidesPerView: 1,
                effect: 'slide',
                spaceBetween: 0,
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 1,
                    slideShadows: false,
                },
            }
        },
        on: {
            slideChangeTransitionStart: function () {
                setPmsBulletAnimation(this);
            },
            slideChangeTransitionEnd: function () {
                setPmsBulletAnimation(this);
            },
            init: function () {
                setPmsBulletAnimation(this);
            },
            click: function (swiper, event) {
                const clickedSlide = event.target.closest('.swiper-slide');
                if (clickedSlide && clickedSlide.classList.contains('swiper-slide-active')) {
                    const title = clickedSlide.dataset.title;
                    const description = clickedSlide.dataset.description;
                    const imageElement = clickedSlide.querySelector('img');
                    const image = imageElement ? imageElement.src : '';

                    // Call the unified modal function with the correct modal IDs
                    openSlideDetailModal({ title, description, image }, 'pmsSlideDetailModal', 'pmsModalImage', 'pmsModalDescription');
                }
            }
        }
    });
    setPmsBulletAnimation(pmsSwiper); // Initial call for the first slider

    // --- Information Section Logic (Stats Animation) ---
    function toPersianDigits(str) {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        // Ensure to handle cases where str might be null or undefined for String() conversion
        return String(str || '').replace(/[0-9]/g, (w) => persianDigits[+w]).replace('.', '٫');
    }

    const statItems = document.querySelectorAll(".stat-item");

    const animateStat = (item) => {
        const numberSpan = item.querySelector('.stat-number');
        const progressCircle = item.querySelector('.circle-progress');

        // Ensure numberSpan and progressCircle exist
        if (!numberSpan || !progressCircle) {
            console.warn("Missing elements for stat animation in item:", item);
            return;
        }

        const target = +numberSpan.getAttribute('data-target');
        const isFloat = target % 1 !== 0;

        const radius = progressCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressCircle.style.strokeDashoffset = circumference;

        let currentCount = 0;
        const duration = 2000;
        let startTime = null;

        function animationStep(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            currentCount = progress * target;

            if (isFloat) {
                numberSpan.innerText = toPersianDigits(currentCount.toFixed(1));
            } else {
                numberSpan.innerText = toPersianDigits(Math.floor(currentCount));
            }

            const offset = circumference - (progress * circumference);
            progressCircle.style.strokeDashoffset = offset;

            if (progress < 1) {
                requestAnimationFrame(animationStep);
            } else {
                if (isFloat) {
                    numberSpan.innerText = toPersianDigits(target.toFixed(1));
                } else {
                    numberSpan.innerText = toPersianDigits(target);
                }
                progressCircle.style.strokeDashoffset = circumference - (target / 100 * circumference);
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

    statItems.forEach(item => {
        statsObserver.observe(item);
    });

    // --- Slider 2 Logic (shiraz-news-swiper) ---
    const shirazNewsSliderData = {
        'پایگاه خبری': [
            { title: 'همایش پیاده‌روی خانوادگی در پارک کوهپایه',
                 description: 'با هدف تقویت هویت شهری و مستندسازی تاریخ و فرهنگ شیراز، مرکز شیرازشناسی در بوستان بعثت افتتاح شد. این مرکز که در بنایی تاریخی و مرمت‌شده به نام کوشک بعثت قرار دارد، شامل بخش‌های پژوهشی، نمایشگاهی و آموزشی است. در مراسم افتتاحیه، از دانشنامه ۱۷ جلدی شیراز نیز رونمایی شد که حاصل سال‌ها تلاش پژوهشگران بومی است. مرکز شیرازشناسی به‌عنوان مرجع فرهنگی برای شهروندان، دانشجویان و گردشگران طراحی شده و قرار است میزبان نشست‌های تخصصی، کارگاه‌های آموزشی و نمایشگاه‌های موضوعی باشد. این اقدام شهرداری شیراز در راستای ارتقای آگاهی عمومی نسبت به پیشینه تاریخی شهر، گامی مؤثر در توسعه پایدار فرهنگی محسوب می‌شود.',
                 image: '../images/photo/پیاده‌روی خانوادگی در پارک.jpg' },
            { title: 'افتتاح مرکز شیرازشناسی در بوستان بعثت',
                 description: 'شهرداری شیراز با هدف بهبود وضعیت ترافیک شهری، طرح‌های نوینی را به اجرا گذاشته است. این طرح‌ها شامل توسعه حمل و نقل عمومی، هوشمندسازی چراغ‌های راهنمایی و رانندگی، و فرهنگ‌سازی در زمینه استفاده کمتر از خودروی شخصی است. امید است با این اقدامات، شاهد روان‌تر شدن ترافیک در ساعات اوج باشیم.',
                 image: '../images/roydad/افتتاح مرکز شیرازشناسی در بوستان بعثت.jpg' },
            { title: 'افتتاح فاز جدید پل کابلی ولیعصر (عج) شیراز',
                 description: 'فاز جدید پل کابلی ولیعصر (عج) در شیراز به بهره‌برداری رسید. این پروژه که از جمله طرح‌های بزرگ عمرانی شهرداری شیراز محسوب می‌شود، نقش بسزایی در روان‌سازی ترافیک و تسهیل عبور و مرور در یکی از پرترددترین نقاط شهر ایفا خواهد کرد.',
                 image: '../images/pol.jpg' },
            { title: 'افزایش ظرفیت گردشگری با اقامتگاه‌های بوم‌گردی',
                 description: 'با هدف توسعه صنعت گردشگری و جذب بیشتر توریست، چندین اقامتگاه بوم‌گردی جدید در مناطق مختلف شیراز و اطراف آن به بهره‌برداری رسید. این اقامتگاه‌ها با حفظ معماری سنتی، تجربه‌ای متفاوت و اصیل از فرهنگ و طبیعت فارس را برای بازدیدکنندگان فراهم می‌کنند.',
                 image: '../images/boomgardi.jpg' },
            { title: 'تقاطع غیرهمسطح شهیدان آماده بهره‌برداری',
                 description: 'فاز جدید پل کابلی ولیعصر (عج) در شیراز به بهره‌برداری رسید. این پروژه که از جمله طرح‌های بزرگ عمرانی شهرداری شیراز محسوب می‌شود، نقش بسزایی در روان‌سازی ترافیک و تسهیل عبور و مرور در یکی از پرترددترین نقاط شهر ایفا خواهد کرد.',
                 image: '../images/shahidan.jpg' }
        ],
        'گزارش تصویری': [
            { title: 'نمایشگاه صنایع‌دستی در باغ عفیف‌آباد',
                 description: 'اغ تاریخی عفیف‌آباد میزبان نمایشگاهی از صنایع‌دستی هنرمندان شیرازی بود. از خاتم‌کاری و قلم‌زنی گرفته تا سفال و گلیم، آثار هنری اصیل ایرانی در فضایی سنتی به نمایش درآمدند. این نمایشگاه فرصتی برای آشنایی با هنرهای بومی و حمایت از تولیدکنندگان محلی فراهم کرد.',
                 image: '../images/photo/نمایشگاه صنایع‌دستی در عفیف‌آباد.jpg' },
            { title: ' جشنواره خیابانی «رنگ زندگی» در بلوار چمران',
                 description: 'در یک رویداد پرشور هنری، خیابان‌های بلوار چمران شیراز میزبان جشنواره «رنگ زندگی» شدند. هنرمندان خیابانی با نقاشی، موسیقی زنده و نمایش‌های تعاملی، فضای شهری را به گالری زنده‌ای تبدیل کردند. این جشنواره با هدف ترویج هنر شهری و مشارکت مردمی برگزار شد و با استقبال گسترده شهروندان همراه بود.',
                 image: '../images/photo/جشنواره.jpg' },
            { title: 'تئاتر خیابانی صدای شهر در شیراز',
                 description: 'گروهی از هنرمندان جوان با اجرای تئاتر خیابانی «صدای شهر» در میدان شهرداری، روایت‌هایی از زندگی روزمره شهروندان را به تصویر کشیدند. این اجرا با محوریت همدلی، عدالت اجتماعی و امید، توجه رهگذران را جلب کرد و تحسین بسیاری را برانگیخت.',
                 image: '../images/photo/اجرای تئاتر خیابانی «صدای شهر» در میدان شهرداری.jpg' },
            { title: 'جشن شب یلدای محله سنگ سیاه شیراز',
                 description: 'در شب یلدا، اهالی محله سنگ سیاه با برگزاری جشن محلی، آیین‌های سنتی ایرانی را زنده کردند. از شاهنامه‌خوانی و موسیقی سنتی گرفته تا سفره‌های رنگارنگ و بازی‌های محلی، این جشن نمادی از همبستگی و هویت فرهنگی بود',
                 image: '../images/photo/جشن شب یلدا در محله سنگ سیاه.jpg' },
            { title: 'کارگاه نقاشی کودکان در شیراز',
                 description: 'فرهنگسرای طوبی میزبان کارگاه نقاشی ویژه کودکان بود. در این برنامه، کودکان با راهنمایی مربیان هنری، احساسات خود را روی بوم آوردند. هدف از این کارگاه، پرورش خلاقیت، افزایش اعتماد به نفس و آشنایی با رنگ‌ها و فرم‌ها بود.',
                 image: '../images/photo/کارگاه نقاشی کودکان در فرهنگسرا.jpg' }
        ],
        'رویدادهای شهر': [
            { title: 'رونمایی از سمفونی شیراز با آهنگسازی کارن همایون‌فر',
                 description: 'در مراسمی باشکوه و کم‌نظیر، سمفونی شیراز با آهنگسازی استاد کارن همایون‌فر و اجرای ارکستر ملی ایران در تالار حافظ رونمایی شد. این اثر موسیقایی با الهام از تاریخ، طبیعت و فرهنگ غنی شیراز خلق شده و تلاش دارد تا روح شهر را در قالب نت‌ها و ملودی‌ها به تصویر بکشد. حضور چهره‌های برجسته هنری، مسئولان فرهنگی و استقبال پرشور مردم، این رویداد را به یکی از نقاط اوج هفته شیراز تبدیل کرد. سمفونی شیراز نه‌تنها یک اثر هنری، بلکه گامی در جهت معرفی ظرفیت‌های فرهنگی این کلان‌شهر در سطح ملی و بین‌المللی است. این برنامه با کلیدواژه‌هایی چون «موسیقی شیراز»، «هویت فرهنگی» و «رویداد هنری شیراز» در فضای مجازی بازتاب گسترده‌ای داشت',
                 image: '../images/roydad/رونمایی از سمفونی شیراز با آهنگسازی کارن همایون‌فر.jpg' },
            { title: 'جشن دختران در باغ عفیف‌آباد',
                 description: 'در تقارن هفته شیراز با دهه کرامت، جشن باشکوهی با حضور بیش از سه هزار دختر نوجوان در باغ تاریخی عفیف‌آباد برگزار شد. این برنامه با هدف تقویت روحیه، ایجاد نشاط اجتماعی و پاسداشت مقام دختران، شامل اجرای موسیقی زنده، مسابقات فرهنگی، نمایشگاه‌های هنری و اهدای جوایز بود. حضور خانواده‌ها، فضای صمیمی و مشارکت نهادهای مردمی، این جشن را به الگویی موفق از رویدادهای فرهنگی-اجتماعی تبدیل کرد.',
                 image: '../images/roydad/جشن دختران در باغ عفیف‌آباد.jpg' },
            { title: 'آیین تعویض قرآن دروازه قرآن شیراز',
                 description: 'در یکی از آیینی‌ترین رویدادهای هفته شیراز، مراسم تعویض قرآن دروازه قرآن با حضور مسئولان شهری، هنرمندان و جمعی از شهروندان برگزار شد. این آیین که هر ساله در آستانه روز شیراز برگزار می‌شود، نمادی از احترام به میراث معنوی و تاریخی شهر است. دروازه قرآن، به‌عنوان یکی از نمادهای فرهنگی شیراز، با قرار گرفتن قرآن نفیس در بالای آن، همواره یادآور پیوند عمیق این شهر با ارزش‌های دینی و فرهنگی بوده است. امسال نیز با تعویض قرآن و قرائت آیاتی از کلام‌الله مجید، فضای روحانی و معنوی خاصی در محل حاکم شد. این رویداد در رسانه‌های محلی بازتاب گسترده‌ای داشت و به‌عنوان یکی از شاخص‌ترین برنامه‌های فرهنگی هفته شیراز معرفی شد',
                 image: '../images/roydad/آیین تعویض قرآن دروازه قرآن شیراز.jpg' },
            { title: 'رونمایی از ۱۷ سردیس مشاهیر شیراز در باغ ارم',
                 description: 'در مراسمی رسمی و فرهنگی، از ۱۷ سردیس مشاهیر و نخبگان شیرازی در باغ ارم رونمایی شد. این سردیس‌ها شامل چهره‌هایی چون دکتر خدادوست، دکتر ملک‌حسینی و دیگر برگزیدگان جایزه علامه قطب‌الدین شیرازی بودند. این اقدام در راستای تقویت هویت شهری، الگوسازی برای نسل جوان و پاسداشت مفاخر علمی و فرهنگی شیراز انجام شد. باغ ارم، با معماری تاریخی و فضای سبز دل‌انگیز، بستر مناسبی برای این رویداد فاخر بود',
                 image: '../images/roydad/رونمایی از ۱۷ سردیس مشاهیر شیراز در باغ ارم.jpg' }
        ],
        'هم قدم با شیراز': [
            { title: 'درخت‌کاری در شیراز  مشارکت مردمی برای شهری سبزتر',
                 description: 'در یک صبح بهاری، گروهی از دانش‌آموزان، فعالان محیط‌زیست و شهروندان داوطلب در تپه الله‌اکبر گرد هم اومدن تا با کاشت نهال، سهمی در آینده سبز شیراز داشته باشن. این برنامه که با همکاری شهرداری و سازمان‌های مردم‌نهاد برگزار شد، بخشی از طرح «شیراز نفس می‌کشد» بود.در کنار کاشت درخت، کارگاه‌های آموزشی درباره حفظ منابع طبیعی و بازیافت هم برگزار شد. بچه‌ها با دست‌های خاکی و دل‌های شاد، نهال‌هایی کاشتن که شاید روزی سایه‌سار نسل بعدی بشن.«هم‌قدم با شیراز» یعنی همین—قدم زدن در مسیر مسئولیت‌پذیری و عشق به زمین',
                 image: '../images/hamgam/درخت‌کاری داوطلبانه در تپه الله‌اکبر.jpg' },
            { title: 'روایت یک روز با پاکبانان شیراز؛ قهرمانان خاموش شهر',
            
                description: 'ساعت ۴ صبح، وقتی بیشتر شهر هنوز در خواب فرو رفته، پاکبانان شیراز کارشون رو شروع می‌کنن. با جاروهای بلند و لباس‌های فسفری، خیابون‌ها رو تمیز می‌کنن تا ما روزمون رو با آرامش شروع کنیم. در یکی از برنامه‌های «هم‌قدم با شیراز»، خبرنگار محلی یک روز کامل رو با یکی از این پاکبان‌ها گذروند؛ از جمع‌آوری زباله تا گفت‌وگو با مردم. نتیجه؟ احترام بیشتر، آگاهی بیشتر، و قدردانی از کسانی که بی‌صدا، شهر رو زنده نگه می‌دارن',
             image: '../images/hamgam/پاکبان .jpg' },
            { title: 'قصه‌های محله سنگ‌سیاه؛ جایی که تاریخ هنوز نفس می‌کشه',
            
                description: 'در دل بافت تاریخی شیراز، محله‌ای هست که هنوز صدای پای تاریخ در کوچه‌هاش شنیده می‌شه: سنگ‌سیاه. این محله با معماری سنتی، بازارچه‌های قدیمی، و حضور آرامگاه سید تاج‌الدین غریب، یکی از قطب‌های فرهنگی و مذهبی شهره. اما چیزی که سنگ‌سیاه رو خاص‌تر می‌کنه، مردمشه؛ پیرمردی که هنوز با چرخ دستی‌اش فالوده می‌فروشه، یا مادری که هر روز جلوی در خونه‌اش گلدون‌ها رو آب می‌ده و با رهگذرا خوش‌وبش می‌کنه.«هم‌قدم با شیراز» یعنی ایستادن کنار همین آدم‌ها، شنیدن قصه‌هاشون، و دیدن شهری که با مردمش زنده‌ست',
             image: '../images/hamgam/قصه‌های محله سنگ‌سیاه.jpg' },
            { title: 'بازارهای سنتی و خرید سوغاتی در شیراز.',
            
                description: 'در قلب شیراز، جایی هست که هنوز صدای چکش مس‌گران، عطر ادویه‌های شرقی و گفت‌وگوی گرم فروشنده‌ها، تو رو به قرن‌ها پیش می‌بره: بازار وکیل. این بازار تاریخی که به دستور کریم‌خان زند ساخته شده، نه‌فقط یک مرکز خرید، بلکه موزه‌ای زنده از فرهنگ و اقتصاد مردمیهدر برنامه «هم‌قدم با شیراز»، همراه شدیم با یک استاد خاتم‌کار که بیش از ۴۰ ساله در حجره کوچکش هنر می‌آفرینه. از خاطراتش گفت، از روزهایی که بازار پر از صدای ساز و آواز بود، و از گردشگرهایی که با چشم‌های پر از شگفتی به هنر ایرانی نگاه می‌کردن.بازار وکیل، جاییه که هنوز می‌شه با مردم حرف زد، چای خورد، و فهمید شیراز فقط یک شهر نیست—یه حسه',
             image: '../images/hamgam/یک روز در بازار وکیل.jpg' }
        ]
    };

    let shirazNewsSwiperInstance = null; // Renamed to avoid conflict with global mySwiper (if any)
    const shirazNewsDefaultCategory = 'پایگاه خبری';
    const shirazNewsAutoplayDelay = 4000;

    function setShirazNewsBulletAnimation(swiperInstance) {
        const bullets = document.querySelectorAll('.shiraz-news-swiper-pagination-bullet');
        const realIndex = swiperInstance.realIndex;

        bullets.forEach((bullet, index) => {
            const progressCircle = bullet.querySelector('.shiraz-news-progress-circle');
            if (progressCircle) {
                if (index === realIndex) {
                    progressCircle.style.animation = 'none';
                    void progressCircle.offsetWidth;
                    progressCircle.style.animation = `fill-circle ${shirazNewsAutoplayDelay / 1000}s linear forwards`;
                } else {
                    progressCircle.style.animation = 'none';
                    progressCircle.style.strokeDashoffset = '100.5';
                }
            }
        });
    }

    function populateShirazNewsSwiper(dataArray) {
        const swiperWrapper = document.querySelector('.shiraz-news-swiper .swiper-wrapper');
        swiperWrapper.innerHTML = ''; // Clear previous slides

        const nextBtn = document.querySelector('.shiraz-news-swiper-button-next');
        const prevBtn = document.querySelector('.shiraz-news-swiper-button-prev');
        const paginationEl = document.querySelector('.shiraz-news-swiper-pagination');

        if (dataArray.length === 0) {
            swiperWrapper.innerHTML = `
                <div class="swiper-slide shiraz-news-empty-message">
                    <h3 class="text-muted">هیچ محتوایی برای نمایش در این دسته وجود ندارد.</h3>
                </div>
            `;
            // Hide navigation and pagination if no content
            if (nextBtn) nextBtn.style.display = 'none';
            if (prevBtn) prevBtn.style.display = 'none';
            if (paginationEl) paginationEl.style.display = 'none';
            // Destroy swiper if it exists to clean up
            if (shirazNewsSwiperInstance !== null) {
                shirazNewsSwiperInstance.destroy(true, true);
                shirazNewsSwiperInstance = null; // Set to null after destruction
            }
            return;
        } else {
            // Show navigation and pagination if content exists
            if (nextBtn) nextBtn.style.display = 'block';
            if (prevBtn) prevBtn.style.display = 'block';
            if (paginationEl) paginationEl.style.display = 'block';
        }

        let slidesHtml = '';
        dataArray.forEach((item) => {
            slidesHtml += `
                <div class="swiper-slide">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="shiraz-news-slide-content">
                        <h5>${item.title}</h5>
                    </div>
                </div>
            `;
        });
        swiperWrapper.innerHTML = slidesHtml;

        // Destroy existing Swiper instance before creating a new one
        if (shirazNewsSwiperInstance !== null) {
            shirazNewsSwiperInstance.destroy(true, true);
        }

        shirazNewsSwiperInstance = new Swiper('.shiraz-news-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: shirazNewsAutoplayDelay,
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
            mousewheel: {
                forceToAxis: true,
            },
            keyboard: {
                enabled: true,
            },
            pagination: {
                el: '.shiraz-news-swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return `
                        <span class="${className} shiraz-news-swiper-pagination-bullet">
                            <svg class="shiraz-news-progress-circle-svg" viewBox="0 0 36 36">
                                <circle class="shiraz-news-background-circle" cx="18" cy="18" r="16" fill="none" stroke="#ddd" stroke-width="3"></circle>
                                <circle class="shiraz-news-progress-circle" cx="18" cy="18" r="16" fill="none" stroke-dasharray="100.5" stroke-dashoffset="100.5"></circle>
                            </svg>
                            <span class="shiraz-news-bullet-number">${index + 1}</span>
                        </span>
                    `;
                }
            },
            navigation: {
                nextEl: '.shiraz-news-swiper-button-next',
                prevEl: '.shiraz-news-swiper-button-prev',
            },
            breakpoints: {
                992: {
                    slidesPerView: 3,
                    effect: 'coverflow',
                    spaceBetween: 40,
                    coverflowEffect: {
                        rotate: 15,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    },
                },
                0: {
                    slidesPerView: 1,
                    effect: 'slide',
                    spaceBetween: 0,
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 0,
                        modifier: 1,
                        slideShadows: false,
                    },
                }
            },
            on: {
                slideChangeTransitionStart: function () {
                    setShirazNewsBulletAnimation(this);
                },
                slideChangeTransitionEnd: function () {
                    setShirazNewsBulletAnimation(this);
                },
                init: function () {
                    setShirazNewsBulletAnimation(this);
                },
                click: function (swiper, event) {
                    const clickedSlide = event.target.closest('.swiper-slide');
                    if (clickedSlide && clickedSlide.classList.contains('swiper-slide-active')) {
                        const clickedRealIndex = swiper.realIndex;
                        const currentCategoryButton = document.querySelector('.shiraz-news-category-btn.active');
                        if (currentCategoryButton) {
                            const currentCategory = currentCategoryButton.dataset.category;
                            const currentCategoryData = shirazNewsSliderData[currentCategory];
                            const clickedSlideData = currentCategoryData[clickedRealIndex];

                            if (clickedSlideData) {
                                // Call the unified modal function with the correct modal IDs
                                openSlideDetailModal(clickedSlideData, 'shirazNewsSlideDetailModal', 'shirazNewsModalImage', 'shirazNewsModalDescription');
                            }
                        }
                    }
                }
            }
        });

        // Ensure autoplay and bullet animation reset when populating
        if (shirazNewsSwiperInstance) {
            shirazNewsSwiperInstance.autoplay.stop(); // Stop and restart autoplay to reset
            shirazNewsSwiperInstance.autoplay.start();
            setShirazNewsBulletAnimation(shirazNewsSwiperInstance);
        }
    }

    // Initial population for the second slider
    populateShirazNewsSwiper(shirazNewsSliderData[shirazNewsDefaultCategory] || []);

    const shirazNewsDefaultButton = document.querySelector(`.shiraz-news-category-btn[data-category="${shirazNewsDefaultCategory}"]`);
    if (shirazNewsDefaultButton) {
        shirazNewsDefaultButton.classList.add('active');
    }

    const categoryButtons = document.querySelectorAll('.shiraz-news-category-btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            const selectedCategory = event.target.dataset.category;
            let dataToDisplay = shirazNewsSliderData[selectedCategory] || [];

            populateShirazNewsSwiper(dataToDisplay);
        });
    });

    // --- Card Section Logic ---
    // Make sure your cardsData and generateCardHtml are defined outside this specific block
     const cardsData = [
        {
            imageSrc: "../images/sajjad-ahmadi-ud6GInkmcWE-unsplash.jpg",
            imageAlt: "Shiraz Cityscape",
            title: "اطلاعات شهری",
            description: "شیراز با جمعیتی نزدیک به ۱٫۷ میلیون نفر در سال ۲۰۲۵، قلب اداری و تاریخی استان فارس است؛ شهری که به باغ‌های باستانی و لقب شهر شعر و شهره دارد.",
            likeCount: "۱۵۰۰",
            cardBackground: "radial-gradient(208.41% 100% at 100% 0%, #E9EDF1 0%, #FFFFFF 100%)",
            panelColor: "linear-gradient(113.52deg, #65CDE3 23.44%, #438DA6 100%)",
            stats: [
                { value: "۱۱", label: "مناطق شهرداری" },
                { value: "۱۵۰۰", label: "ارباب صنایع" },
                { value: "۲۱-۲۷KM²", label: "مساحت شهر" }
            ]
        },
         {
            imageSrc: "../images/abolfazl-ranjbar-_PnXmRIhIIA-unsplash.jpg",
            imageAlt: "Eram Garden",
            title: "گردشگری و توریسم",
            description: "از باغ ارم، یونسکو تا مسجد نصیرالملک, دروازه قرآن و بازار وکیل. دیدنی‌های شیراز هر سال هزاران مسافر ایرانی و خارجی را مجذوب خود می‌کند.",
            likeCount: "۲۵",
            cardBackground: "radial-gradient(208.41% 100% at 100% 0%, #FFE6C1 0%, #FFFFFF 84.13%)",
            panelColor: "linear-gradient(113.52deg, #FCF68D 23.44%, #FFC531 100%)",
            stats: [
                { value: "۱۷", label: "اقامتگاه بومگردی" },
                { value: "۳", label: "تعداد پارک" },
                { value: "۵", label: "تعداد هتل" }
            ]
        },
        {
            imageSrc: "../images/steven-su-AxhfHp6fJ2M-unsplash.jpg",
            imageAlt: "Hafez Tomb",
            title: "فرهنگ و هنر",
            description: "شیراز زادگاه حافظ و سعدی است؛ هر شب دوست‌داران ادب برای فال و غزل به آرامگاه شاعر محبوب‌شان در حافظیه سر می‌زنند و حال‌وهوای کاملاً فرهنگی را تجربه می‌کنند.",
            likeCount: "۲۵",
            cardBackground: "radial-gradient(208.41% 100% at 100% 0%, #F3D6F5 0%, #FFFFFF 84.13%)",
            panelColor: "linear-gradient(113.52deg, #C191FE 23.44%, #907CE4 100%)",
            stats: [
                { value: "۱۰", label: "فرهنگستان ادبی" },
                { value: "۲۰+", label: "موزه ها" },
                { value: "۱", label: "فستیوال هنری" }
            ]
        },
        {
            imageSrc: "../images/soheil-jei-HsNbiaR52As-unsplash.jpg",
            imageAlt: "Shah Cheragh",
            title: "جاذبه‌های مذهبی",
            description: "حرم باشکوه شاهچراغ با گنبد فیروزه‌ای و آینه‌کاری چشم‌نوازش، مهم‌ترین قطب زیارتی شیراز است و برای اولین بار به سده دوازدهم میلاد برمی‌گردد.",
            likeCount: "۲۵",
            cardBackground: "radial-gradient(208.41% 100% at 100% 0%, #FFF1C8 0%, #FFFFFF 84.13%)",
            panelColor: "linear-gradient(113.52deg, #FFB76D 23.44%, #EF7F4B 100%)",
            stats: [
                { value: "۱۴۰۰", label: "اماکن مذهبی" },
                { value: "۳", label: "ساختمان قدیمی" },
                { value: "۱۳۰۰", label: "تعداد امامزاده" }
            ]
        },
        {
            imageSrc: "../images/ramin-alizadeh-eXnplP434Rs-unsplash.jpg",
            imageAlt: "Shiraz Map",
            title: "نقشه گردشگری شیراز",
            description: "نقشه تعاملی گردشگری شهر، جاذبه‌ها، رستوران‌ها و مسیرهای حمل‌ونقل را یکجا نمایش می‌دهد تا برنامه‌ریزی سفر در تلفن همراهتان ساده و سریع باشد.",
            likeCount: "۲۵",
            cardBackground: "radial-gradient(208.41% 100% at 100% 0%, #D0F0FF 0%, #FFFFFF 84.13%)",
            panelColor: "linear-gradient(113.52deg, #84B7EA 23.44%, #5D87FF 100%)",
            stats: [
                { value: "۳۶", label: "نقشه آفلاین" },
                { value: "۲۶", label: "دانلود شده" },
                { value: "۲۸.۱KM²", label: "مساحت برنامه" }
            ]
        },
 {
            imageSrc: "../images/ali-haghighi-2yKWRwdxMMw-unsplash.jpg",
            imageAlt: "Green Space",
            title: "محیط زیست و فضای سبز",
            description: "طرح‌های توسعه فضای سبز شیراز در کنار باغ‌های تاریخی مثل ارم و عفیف‌آباد، هوای پاک و مناظری دلپذیر برای شهروندان فراهم کرده و دلیل لقب شهر باغ‌ها شده است.",
            likeCount: "۲۵",
            cardBackground: "radial-gradient(208.41% 100% at 100% 0%, #D5F5DA 0%, #FFFFFF 84.13%)",
            panelColor: "linear-gradient(113.52deg, #7DF7C2 23.44%, #30C584 100%)",
            stats: [
                { value: "۸۹", label: "پارک های شهری" },
                { value: "۱۱KM²", label: "مساحت باغ ها" },
                { value: "۱۰۰%+ ", label: "فضای سبز عمومی" }
            ]
        }
    ];

    const cardsContainer = document.getElementById('cards-container');

    function generateCardHtml(cardData) {
        return `
            <div class="col-12 col-sm-6 col-md-4 d-flex mb-5">
                <div class="card w-100 h-100 shadow-sm border-0 rounded-4" style="background: ${cardData.cardBackground};">
                    <img src="${cardData.imageSrc}" class="card-img-top" alt="${cardData.imageAlt}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-center mt-3">${cardData.title}</h5>
                        <p class="card-text text-justify">${cardData.description}</p>
                        <div class="bottom-panel d-flex justify-content-around align-items-center">
                            <div class="like">
                                <i class="fa-solid fa-heart"></i>
                                <small class="text-muted">${cardData.likeCount}</small>
                            </div>
                            <div class="information d-flex justify-content-between align-items-center" style="background: ${cardData.panelColor};">
                                ${cardData.stats.map(stat => `
                                    <div class="d-flex flex-column align-items-center">
                                        <small class="text-muted">${stat.value}</small>
                                        <p class="mb-0 small">${stat.label}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Loop through data and append cards to the container
    cardsData.forEach(cardData => {
        if (cardsContainer) { // Check if container exists
            cardsContainer.innerHTML += generateCardHtml(cardData);
        }
    });

    // --- Map Section Logic ---
    const districtData = {
        "1": {
            name: "منطقه ۱",
            address: "شیراز، بلوار ارم، جنب پارک ارم، شهرداری منطقه ۱",
            phone: "۰۷۱-۳۲۲۸xxxx"
        },
        "2": {
            name: "منطقه ۲",
            address: "شیراز، خیابان زند، روبروی بیمارستان شهید فقیهی، شهرداری منطقه ۲",
            phone: "۰۷۱-۳۲۳۲xxxx"
        },
        "3": {
            name: "منطقه ۳",
            address: "شیراز، چهارراه حافظیه، بلوار گلستان، شهرداری منطقه ۳",
            phone: "۰۷۱-۳۷۳۶xxxx"
        },
        "4": {
            name: "منطقه ۴",
            address: "شیراز، بلوار مدرس، جنب پایانه شهید مطهری، شهرداری منطقه ۴",
            phone: "۰۷۱-۳۷۲۷xxxx"
        },
        "5": {
            name: "منطقه ۵",
            address: "شیراز، بلوار ارتش، میدان بسیج، شهرداری منطقه ۵",
            phone: "۰۷۱-۳۸۲۳xxxx"
        },
        "6": {
            name: "منطقه ۶",
            address: "شیراز، بلوار چمران، تقاطع نیایش، شهرداری منطقه ۶",
            phone: "۰۷۱-۳۶۲۸xxxx"
        },
        "7": {
            name: "منطقه ۷",
            address: "شیراز، بلوار امیرکبیر، روبروی شهرک صنعتی، شهرداری منطقه ۷",
            phone: "۰۷۱-۳۸۳۳xxxx"
        },
        "8": {
            name: "منطقه ۸",
            address: "شیراز، خیابان قصرالدشت، جنب پارک خلدبرین، شهرداری منطقه ۸",
            phone: "۰۷۱-۳۶۲۶xxxx"
        },
        "9": {
            name: "منطقه ۹",
            address: "شیراز، بلوار عدالت، جنب بیمارستان شوشتری، شهرداری منطقه ۹",
            phone: "۰۷۱-۳۸۳۰۰xxx"
        },
        "10": {
            name: "منطقه ۱۰",
            address: "شیراز، شهرک گلستان، بلوار غدیر، شهرداری منطقه ۱۰",
            phone: "۰۷۱-۳۶۲۳xxxx"
        },
        "11": {
            name: "منطقه ۱۱",
            address: "شیراز، بلوار محراب، جنب شهرک والفجر، شهرداری منطقه ۱۱",
            phone: "۰۷۱-۳۷۲۲xxxx"
        }
    };

    const hoverLabel = document.getElementById("district-hover-label");
    const districtInfoList = document.getElementById("district-info-list");

    function loadDistrictInfo() {
        if (!districtInfoList) {
            console.warn("District info list container not found.");
            return;
        }
        for (const id in districtData) {
            const info = districtData[id];
            const infoDiv = document.createElement("div");
            infoDiv.classList.add("district-info");
            infoDiv.id = `info-district-${id}`;

            infoDiv.innerHTML = `
                <h3>${info.name}</h3>
                <p><strong>آدرس:</strong> ${info.address}</p>
                <p><strong>تلفن:</strong> ${info.phone}</p>
            `;
            districtInfoList.appendChild(infoDiv);
        }
    }

    function setHighlight(districtId, isHighlighting) {
        const districtPath = document.getElementById(`district-${districtId}`);
        const districtInfo = document.getElementById(`info-district-${districtId}`);

        if (districtPath) {
            if (isHighlighting) {
                districtPath.classList.add("active");
            } else {
                districtPath.classList.remove("active");
            }
        }

        if (districtInfo) {
            if (isHighlighting) {
                districtInfo.classList.add("active");
                districtInfo.scrollIntoView({ behavior: "smooth", block: "nearest" });
            } else {
                districtInfo.classList.remove("active");
            }
        }
    }

    document.querySelectorAll(".district").forEach(function (path) {
        path.addEventListener("mouseenter", function (e) {
            const num = this.id.replace("district-", "");
            if (hoverLabel) { // Check if hoverLabel exists
                hoverLabel.textContent = "منطقه " + num;
                hoverLabel.style.display = "block";
            }
            setHighlight(num, true);
        });

        path.addEventListener("mousemove", function (e) {
            if (hoverLabel) { // Check if hoverLabel exists
                hoverLabel.style.left = e.clientX + 15 + "px";
                hoverLabel.style.top = e.clientY - 10 + "px";
            }
        });

        path.addEventListener("mouseleave", function () {
            const num = this.id.replace("district-", "");
            if (hoverLabel) { // Check if hoverLabel exists
                hoverLabel.style.display = "none";
            }
            setHighlight(num, false);
        });
    });

    if (districtInfoList) { // Ensure districtInfoList exists before adding listener
        districtInfoList.addEventListener("mouseenter", function (e) {
            let targetInfoDiv = e.target.closest('.district-info');

            if (targetInfoDiv) {
                const num = targetInfoDiv.id.replace("info-district-", "");
                setHighlight(num, true);
            }
        }, true);
    }

    loadDistrictInfo();

    document.querySelectorAll(".district-info").forEach(infoDiv => {
        infoDiv.addEventListener("mouseleave", function () {
            const num = this.id.replace("info-district-", "");
            setHighlight(num, false);
        });
    });

    // --- Zone Section Logic ---
    const zoneContainer = document.querySelector(".container-zone");
    const originalZoneBoxes = document.querySelectorAll(".container-zone a");

    if (!zoneContainer || originalZoneBoxes.length === 0) {
        console.warn("عناصر 'container-zone' یا 'a' برای بخش Zone پیدا نشدند. اسکرول خودکار فعال نمی‌شود.");
        // Consider removing `return;` if you want other DOMContentLoaded logic to still run.
        // For production, you might just hide the section or display a message.
    } else {
        const SCROLL_SPEED = 1;
        const INTERVAL_TIME = 15;
        let autoplayZoneInterval = null;

        // Clone and append/prepend for infinite scroll effect
        originalZoneBoxes.forEach(box => {
            const clone = box.cloneNode(true);
            zoneContainer.prepend(clone);
        });

        originalZoneBoxes.forEach(box => {
            const clone = box.cloneNode(true);
            zoneContainer.appendChild(clone);
        });

        const allZoneBoxes = document.querySelectorAll(".container-zone a");

        let originalContentWidth = 0;
        // Recalculate originalContentWidth based on initial items only
        originalZoneBoxes.forEach(box => {
            const style = getComputedStyle(box);
            originalContentWidth += box.offsetWidth + parseInt(style.marginRight || 0) + parseInt(style.marginLeft || 0);
        });

        // Set initial scroll position to avoid showing clones at start
        zoneContainer.scrollLeft = originalContentWidth;

        function continuousScroll() {
            zoneContainer.scrollLeft += SCROLL_SPEED;

            // When scrolling past the original content, jump back to the start of the cloned content
            if (zoneContainer.scrollLeft >= originalContentWidth * 2) {
                zoneContainer.classList.add('no-smooth-scroll'); // Temporarily disable smooth scroll for instant jump
                zoneContainer.scrollLeft = originalContentWidth;
                zoneContainer.classList.remove('no-smooth-scroll');
            }
        }

        function startAutoplay() {
            stopAutoplay(); // Clear any existing interval
            autoplayZoneInterval = setInterval(continuousScroll, INTERVAL_TIME);
        }

        function stopAutoplay() {
            clearInterval(autoplayZoneInterval);
        }

        allZoneBoxes.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior

                // Remove 'active' class from all boxes
                allZoneBoxes.forEach(l => l.querySelector('.box').classList.remove('active'));
                // Add 'active' class to the clicked box
                link.querySelector('.box').classList.add('active');

                // Scroll clicked item into view
                link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

                // Reset autoplay after a click to ensure a smooth transition
                // No need to reset autoplay as the scrollIntoView handles it and interval continues
            });
        });

        // Handle resize: Recalculate content width and reset scroll position
        window.addEventListener('resize', () => {
            stopAutoplay();
            originalContentWidth = 0;
            originalZoneBoxes.forEach(box => {
                const style = getComputedStyle(box);
                originalContentWidth += box.offsetWidth + parseInt(style.marginRight || 0) + parseInt(style.marginLeft || 0);
            });
            zoneContainer.scrollLeft = originalContentWidth;
            startAutoplay();
        });

        startAutoplay(); // Start autoplay when the DOM is loaded
    }
});
