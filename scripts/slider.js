const sliderData = {
    'پایگاه خبری': [
        { title: 'گزارش خبری مهم در شیراز منتشر شد.', description: 'این یک توضیح کامل و جامع درباره خبر اول است که شامل جزئیات بیشتری از اتفاقات اخیر در شیراز می‌شود. شیراز، نگین پارس، همواره در مرکز توجهات بوده و اخبار آن بازتاب‌دهنده رویدادهای مهمی در سطح کشور است. در این گزارش به ابعاد مختلف این خبر، از جمله تأثیرات آن بر زندگی شهروندان و واکنش‌های عمومی پرداخته شده است.', image: 'https://via.placeholder.com/400x550/FFD700/333333?text=خبر+۱' },
        { title: 'اطلاعیه جدید شهرداری شیراز در خصوص ترافیک.', description: 'شهرداری شیراز با هدف بهبود وضعیت ترافیک شهری، طرح‌های نوینی را به اجرا گذاشته است. این طرح‌ها شامل توسعه حمل و نقل عمومی، هوشمندسازی چراغ‌های راهنمایی و رانندگی، و فرهنگ‌سازی در زمینه استفاده کمتر از خودروی شخصی است. امید است با این اقدامات، شاهد روان‌تر شدن ترافیک در ساعات اوج باشیم.', image: 'https://via.placeholder.com/400x550/E6BE00/333333?text=خبر+۲' },
        { title: 'رویدادهای خبری مهم هفته در شیراز.', description: 'مروری بر مهم‌ترین اتفاقات و رویدادهای خبری که در طول این هفته در شیراز رخ داده است. از افتتاح پروژه‌های عمرانی گرفته تا برگزاری همایش‌های علمی و فرهنگی، شیراز همواره پویا و پر از خبر است. این بخش به شما کمک می‌کند تا در جریان آخرین تحولات شهر قرار بگیرید.', image: 'https://via.placeholder.com/400x550/D1AE00/333333?text=خبر+۳' },
        { title: 'تحلیل اقتصادی وضعیت بازار شیراز.', description: 'تحلیلی جامع از روند بازار و شاخص‌های اقتصادی در شهر شیراز، شامل وضعیت قیمت‌ها و قدرت خرید مردم. این گزارش به بررسی عوامل تأثیرگذار بر اقتصاد محلی, از جمله نوسانات ارزی و سیاست‌های اقتصادی دولت, می‌پردازد و چشم‌اندازی از آینده بازار ارائه می‌دهد.', image: 'https://via.placeholder.com/400x550/B89B00/333333?text=خبر+۴' },
        { title: 'موضوعات داغ خبری در جامعه شیراز.', description: 'بررسی پربحث‌ترین موضوعات و چالش‌های اجتماعی که این روزها در محافل خبری شیراز مطرح است. از مسائل زیست‌محیطی گرفته تا چالش‌های فرهنگی و هنری، این بخش به شما امکان می‌دهد تا با دغدغه‌های اصلی شهروندان شیرازی آشنا شوید.', image: 'https://via.placeholder.com/400x550/A08500/333333?text=خبر+۵' }
    ],
    'گزارش تصویری': [
        { title: 'تصاویر دیدنی از باغ ارم شیراز.', description: 'مجموعه‌ای بی‌نظیر از تصاویر زیبا و چشم‌نواز باغ ارم، نمادی از هنر باغ ایرانی و معماری قاجاری. این تصاویر شما را به سفری بصری در میان درختان سر به فلک کشیده، گل‌های رنگارنگ و عمارت باشکوه باغ ارم می‌برد.', image: 'https://via.placeholder.com/400x550/FFD700/333333?text=گزارش+تصویری+۱' },
        { title: 'نمایشگاه صنایع دستی فارس در شیراز برگزار شد.', description: 'گزارش تصویری کامل از برگزاری نمایشگاه بزرگ صنایع دستی استان فارس با حضور هنرمندان برجسته از سراسر استان. در این نمایشگاه، انواع هنرهای دستی نظیر گلیم‌بافی, معرق‌کاری, منبت‌کاری و نقاشی روی سفال به نمایش گذاشته شد.', image: 'https://via.placeholder.com/400x550/E6BE00/333333?text=گزارش+تصویری+۲' },
        { title: 'جاذبه‌های گردشگری پنهان شیراز.', description: 'عکس‌هایی از نقاط کمتر شناخته شده ولی بسیار دیدنی شیراز که هر گردشگری باید از آنها دیدن کند. این جاذبه‌ها شامل خانه‌های تاریخی، کوچه‌باغ‌های قدیمی و اماکن مذهبی با معماری بی‌نظیر است که کمتر مورد توجه قرار گرفته‌اند.', image: 'https://via.placeholder.com/400x550/D1AE00/333333?text=گزارش+تصویری+۳' },
        { title: 'معماری سنتی خانه‌های قدیمی شیراز.', description: 'تصاویری خیره‌کننده از جزئیات معماری اصیل و دلنشین خانه‌های تاریخی شیراز با تزئینات بی‌نظیر. از ارسی‌های رنگی تا حیاط‌های سرسبز و ایوان‌های پرنقش و نگار، این خانه‌ها داستانی از تاریخ و فرهنگ شیراز را روایت می‌کنند.', image: 'https://via.placeholder.com/400x550/B89B00/333333?text=گزارش+تصویری+۴' },
        { title: 'تصاویری از مراسم مذهبی و فرهنگی در شیراز.', description: 'گالری عکس از آیین‌ها و مراسم‌های سنتی و مذهبی که در شیراز با شکوه خاصی برگزار می‌شوند. این تصاویر نشان‌دهنده عمق فرهنگ و اعتقادات مردم شیراز و همبستگی آن‌ها در مناسبت‌های مختلف است.', image: 'https://via.placeholder.com/400x550/A08500/333333?text=گزارش+تصویری+۵' }
    ],
    'رویدادهای شهر': [
        { title: 'جشنواره گل و گیاه در شیراز آغاز شد.', description: 'برگزاری بزرگترین جشنواره گل و گیاه در شیراز با حضور گونه‌های متنوع گیاهی و طراحی‌های زیبا. این جشنواره فرصتی است برای دوستداران طبیعت تا از نزدیک با تازه‌ترین دستاوردهای صنعت گل و گیاه آشنا شوند و از زیبایی‌های بصری آن لذت ببرند.', image: 'https://via.placeholder.com/400x550/FFD700/333333?text=رویداد+۱' },
        { title: 'کارگاه آموزشی رایگان برای شهروندان شیرازی.', description: 'اطلاعات کامل در مورد کارگاه‌های آموزشی رایگان در حوزه‌های مختلف برای ارتقاء مهارت‌های شهروندان. این کارگاه‌ها شامل آموزش‌های فنی, هنری, کامپیوتر و زبان است که با هدف توانمندسازی جامعه برگزار می‌شوند.', image: 'https://via.placeholder.com/400x550/E6BE00/333333?text=رویداد+۲' },
        { title: 'کنسرت بزرگ موسیقی در شیراز.', description: 'جزئیات برگزاری کنسرت باشکوه با حضور خوانندگان مطرح کشور و استقبال بی‌نظیر مردم. این رویداد فرهنگی شبی به یادماندنی را برای علاقه‌مندان به موسیقی در شیراز رقم زد.', image: 'https://via.placeholder.com/400x550/D1AE00/333333?text=رویداد+۳' },
        { title: 'همایش علمی و پژوهشی در دانشگاه شیراز.', description: 'گزارشی از جدیدترین دستاوردهای علمی و پژوهشی ارائه شده در همایش سالانه دانشگاه شیراز. این همایش محلی برای تبادل دانش و تجربه میان اساتید، دانشجویان و پژوهشگران از سراسر کشور است.', image: 'https://via.placeholder.com/400x550/B89B00/333333?text=رویداد+۴' },
        { title: 'برگزاری مسابقات ورزشی در سطح شهر.', description: 'عکس و خبر از انواع مسابقات ورزشی محلی و منطقه‌ای که با شور و هیجان در شیراز برگزار شده‌اند. این مسابقات به افزایش نشاط اجتماعی و توسعه ورزش همگانی در شهر کمک می‌کند.', image: 'https://via.placeholder.com/400x550/A08500/333333?text=رویداد+۵' }
    ],
    'هم قدم با شیراز': [
        { title: 'راهنمای گشت و گذار در حافظیه و سعدیه.', description: 'یک راهنمای کامل و جامع برای بازدید از آرامگاه حافظ و سعدی، شامل بهترین زمان بازدید, نکات مهم تاریخی و فرهنگی, و مسیرهای دسترسی. با این راهنما سفری عمیق به دنیای شعر و عرفان خواهید داشت.', image: 'https://via.placeholder.com/400x550/FFD700/333333?text=شیرازگردی+۱' },
        { title: 'تاریخچه تخت جمشید و نقش آن در تمدن ایران.', description: 'نگاهی عمیق به تاریخچه پرشکوه تخت جمشید و جایگاه آن به عنوان نمادی از تمدن کهن ایران. این مقاله به بررسی معماری بی‌نظیر, کتیبه‌ها و نقش تخت جمشید در تاریخ جهان می‌پردازد.', image: 'https://via.placeholder.com/400x550/E6BE00/333333?text=شیرازگردی+۲' },
        { title: 'بهترین رستوران‌های سنتی شیراز.', description: 'لیستی از برترین رستوران‌های سنتی شیراز با معرفی غذاهای محلی اصیل مانند کلم‌پلو شیرازی و شکرپلو، و فضای دلنشین و سنتی آن‌ها. تجربه‌ای بی‌نظیر از طعم‌های شیراز را خواهید داشت.', image: 'https://via.placeholder.com/400x550/D1AE00/333333?text=شیرازگردی+۳' },
        { title: 'بازارهای سنتی و خرید سوغاتی در شیراز.', description: 'کشف بهترین بازارهای شیراز برای خرید سوغاتی‌های اصیل و صنایع دستی منحصر به فرد. از بازار وکیل گرفته تا سرای مشیر، هر آنچه از شیراز می‌خواهید به یادگار ببرید را می‌توانید اینجا پیدا کنید.', image: 'https://via.placeholder.com/400x550/B89B00/333333?text=شیرازگردی+۴' },
        { title: 'پارک‌ها و فضاهای سبز شیراز برای پیک‌نیک.', description: 'معرفی زیباترین پارک‌ها و باغ‌های شیراز که مکانی عالی برای استراحت و پیک‌نیک‌های خانوادگی هستند. از پارک آزادی تا باغ ملی، فضاهایی سرسبز و دلنشین برای گذراندن اوقات فراغت.', image: 'https://via.placeholder.com/400x550/A08500/333333?text=شیرازگردی+۵' }
    ]
};

let mySwiper = null;
const defaultCategory = 'پایگاه خبری';
const autoplayDelay = 4000;

function setBulletAnimation(swiper) {
    const bullets = document.querySelectorAll('.shiraz-news-swiper-pagination-bullet');
    const realIndex = swiper.realIndex;

    bullets.forEach((bullet, index) => {
        const progressCircle = bullet.querySelector('.shiraz-news-progress-circle');
        if (progressCircle) {
            // Always reset animation first
            progressCircle.style.animation = 'none';
            
            if (index === realIndex) {
                // Trigger reflow to ensure animation restarts
                void progressCircle.offsetWidth; 
                
                // Apply the 'fill-circle' animation
                progressCircle.style.animation = `fill-circle ${autoplayDelay / 1000}s linear forwards`;
            } else {
                // For non-active bullets, reset the progress to empty
                progressCircle.style.strokeDashoffset = '100.5';
            }
        }
    });
}

function openSlideModal(item) {
    const modalTitle = document.getElementById('slideDetailModalLabel');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');

    modalTitle.textContent = item.title;
    modalImage.src = item.image;
    modalImage.alt = item.title;
    modalDescription.textContent = item.description;

    const modal = new bootstrap.Modal(document.getElementById('slideDetailModal'));
    modal.show();
}

function populateSwiper(dataArray) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = '';

    if (dataArray.length === 0) {
        swiperWrapper.innerHTML = `
            <div class="swiper-slide shiraz-news-empty-message">
                <h3 class="text-muted">هیچ محتوایی برای نمایش در این دسته وجود ندارد.</h3>
            </div>
        `;
        document.querySelector('.shiraz-news-swiper-button-prev').style.display = 'none';
        document.querySelector('.shiraz-news-swiper-button-next').style.display = 'none';
        document.querySelector('.shiraz-news-swiper-pagination').style.display = 'none';
        return;
    } else {
        document.querySelector('.shiraz-news-swiper-button-prev').style.display = 'block';
        document.querySelector('.shiraz-news-swiper-button-next').style.display = 'block';
        document.querySelector('.shiraz-news-swiper-pagination').style.display = 'block';
    }

    dataArray.forEach((item) => {
        const swiperSlide = `
            <div class="swiper-slide">
                <img src="${item.image}" alt="${item.title}">
                <div class="shiraz-news-slide-content">
                    <h5>${item.title}</h5>
                </div>
            </div>
        `;
        swiperWrapper.innerHTML += swiperSlide;
    });

    if (mySwiper !== null) {
        mySwiper.destroy(true, true);
    }

    mySwiper = new Swiper('.shiraz-news-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: autoplayDelay,
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
            slideChangeTransitionStart: function() {
                setBulletAnimation(this);
            },
            slideChangeTransitionEnd: function() {
                setBulletAnimation(this);
            },
            init: function() {
                setBulletAnimation(this);
            },
            click: function(swiper, event) {
                const clickedSlide = event.target.closest('.swiper-slide');
                if (clickedSlide && clickedSlide.classList.contains('swiper-slide-active')) {
                    const clickedRealIndex = swiper.realIndex;
                    const currentCategoryButton = document.querySelector('.shiraz-news-category-btn.active');
                    if (currentCategoryButton) {
                        const currentCategory = currentCategoryButton.dataset.category;
                        const currentCategoryData = sliderData[currentCategory];
                        const clickedSlideData = currentCategoryData[clickedRealIndex];

                        if (clickedSlideData) {
                            openSlideModal(clickedSlideData);
                        }
                    }
                }
            }
        }
    });

    if (mySwiper) {
        mySwiper.autoplay.stop();
        mySwiper.autoplay.start();
        setBulletAnimation(mySwiper);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateSwiper(sliderData[defaultCategory] || []);

    const defaultButton = document.querySelector(`.shiraz-news-category-btn[data-category="${defaultCategory}"]`);
    if (defaultButton) {
        defaultButton.classList.add('active');
    }

    const categoryButtons = document.querySelectorAll('.shiraz-news-category-btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            const selectedCategory = event.target.dataset.category;
            let dataToDisplay = sliderData[selectedCategory] || [];

            populateSwiper(dataToDisplay);
        });
    });
});