// header
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const header = document.querySelector("header");

    const headerHeight = header.offsetHeight;

   
});

// header

// slider

document.addEventListener("DOMContentLoaded", () => {


  let currentIndex = 0;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 4000;

  const track = document.getElementById("carouselTrack");
  const indicatorsContainer = document.getElementById("carouselIndicators");
  const carouselSection = document.querySelector(".custom-carousel-section");
  const nextButton = document.querySelector(".nav-btn.next");
  const prevButton = document.querySelector(".nav-btn.prev");
  const tabs = document.querySelectorAll(".carousel-tabs .tab");


  const newsModal = document.getElementById("newsModal");
  const newsModalClose = document.getElementById("newsModalClose");
  const newsModalTitle = document.getElementById("newsModalTitle");
  const newsModalBody = document.getElementById("newsModalBody");
  const newsModalImage = document.getElementById("newsModalImage");

  function hideNewsModal() {
    if (!newsModal) return;
    newsModal.style.display = "none";
    document.body.style.overflow = "";
  }
  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(
      () => goToSlide(currentIndex + 1),
      AUTOPLAY_DELAY
    );
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      initializeCarousel();
      resetAutoplay();
    });
  });

  const swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,

      renderBullet: function (index, className) {
        const slideNumber = index + 1;
        return `
        <span class="${className}">
          <svg class="progress-ring" width="40" height="40">
            <circle class="progress-ring__circle-bg" r="18" cx="20" cy="20" />
            <circle class="progress-ring__circle" r="18" cx="20" cy="20" />
            <text class="progress-ring__number" x="20" y="20">${slideNumber}</text>
          </svg>
        </span>`;
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

// slider



// information


document.addEventListener("DOMContentLoaded", () => {
    
    function toPersianDigits(str) {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return String(str).replace(/[0-9]/g, (w) => persianDigits[+w]).replace('.', '٫');
    }

    const statItems = document.querySelectorAll(".stat-item");

    const animateStat = (item) => {
        const numberSpan = item.querySelector('.stat-number');
        const progressCircle = item.querySelector('.circle-progress');
        
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

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statItems.forEach(item => {
        observer.observe(item);
    });
});


//information




// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Data for each card
    const cardsData = [
        {
            imageSrc: "images/sajjad-ahmadi-ud6GInkmcWE-unsplash.jpg",
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
            imageSrc: "images/abolfazl-ranjbar-_PnXmRIhIIA-unsplash.jpg",
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
            imageSrc: "images/steven-su-AxhfHp6fJ2M-unsplash.jpg",
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
            imageSrc: "images/soheil-jei-HsNbiaR52As-unsplash.jpg",
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
            imageSrc: "images/ramin-alizadeh-eXnplP434Rs-unsplash.jpg",
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
            imageSrc: "images/ali-haghighi-2yKWRwdxMMw-unsplash.jpg",
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
        cardsContainer.innerHTML += generateCardHtml(cardData);
    });
});

// map

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
        hoverLabel.textContent = "منطقه " + num;
        hoverLabel.style.display = "block";
        setHighlight(num, true);
    });

    path.addEventListener("mousemove", function (e) {
        hoverLabel.style.left = e.clientX + 15 + "px";
        hoverLabel.style.top = e.clientY - 10 + "px";
    });

    path.addEventListener("mouseleave", function () {
        const num = this.id.replace("district-", "");
        hoverLabel.style.display = "none";
        setHighlight(num, false);
    });
});

districtInfoList.addEventListener("mouseenter", function(e) {
    let targetInfoDiv = e.target.closest('.district-info');

    if (targetInfoDiv) {
        const num = targetInfoDiv.id.replace("info-district-", "");
        setHighlight(num, true);
    }
}, true);

// No `mouseleave` delegation for districtInfoList parent; individual listeners are added below.

document.addEventListener("DOMContentLoaded", function() {
    loadDistrictInfo();

    document.querySelectorAll(".district-info").forEach(infoDiv => {
        infoDiv.addEventListener("mouseleave", function() {
            const num = this.id.replace("info-district-", "");
            setHighlight(num, false);
        });
    });
});

// map

















// zone

// Shiraz_Zone.js - Updated

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container-zone");
    const originalBoxes = document.querySelectorAll(".container-zone a"); // آیتم‌های اصلی

    if (!container || originalBoxes.length === 0) {
        console.warn("عناصر 'container' یا 'a' پیدا نشدند. اسکرول خودکار فعال نمی‌شود.");
        return;
    }

    const SCROLL_SPEED = 1;
    const INTERVAL_TIME = 15;

    let autoplayInterval = null;

    

    // افزودن کپی‌ها به ابتدا
    originalBoxes.forEach(box => {
        const clone = box.cloneNode(true);
        container.prepend(clone); // اضافه کردن به ابتدای کانتینر
    });

    // افزودن کپی‌ها به انتها
    originalBoxes.forEach(box => {
        const clone = box.cloneNode(true);
        container.appendChild(clone); // اضافه کردن به انتهای کانتینر
    });

    // حالا تمام آیتم‌ها را دوباره انتخاب می‌کنیم شامل کپی‌ها
    const allBoxes = document.querySelectorAll(".container-zone a");


    let originalContentWidth = 0;

    originalBoxes.forEach(box => {
        const style = getComputedStyle(box);
        originalContentWidth += box.offsetWidth + parseInt(style.marginRight) + parseInt(style.marginLeft);
    });


    container.scrollLeft = originalContentWidth;



    function continuousScroll() {

        container.scrollLeft += SCROLL_SPEED;


        if (container.scrollLeft >= (originalContentWidth * 2) - SCROLL_SPEED) { // کمی قبل از رسیدن به نقطه پرش برای اطمینان از یکپارچگی
            container.classList.add('no-smooth-scroll'); 
            container.scrollLeft = originalContentWidth; 
            container.classList.remove('no-smooth-scroll');
        }
    }

    function startAutoplay() {
        stopAutoplay(); 

        autoplayInterval = setInterval(continuousScroll, INTERVAL_TIME);
    }


    function stopAutoplay() {
        clearInterval(autoplayInterval);

    }


    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    allBoxes.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 


            allBoxes.forEach(l => l.querySelector('.box').classList.remove('active'));
            link.querySelector('.box').classList.add('active');


            link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

        });
    });


    window.addEventListener('resize', () => {
        stopAutoplay(); 

        originalContentWidth = 0;
        originalBoxes.forEach(box => {
            const style = getComputedStyle(box);
            originalContentWidth += box.offsetWidth + parseInt(style.marginRight) + parseInt(style.marginLeft);
        });
        container.scrollLeft = originalContentWidth; 
        startAutoplay(); 
    });


startAutoplay();
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-button');
    const cardObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    cards.forEach(card => cardObserver.observe(card));
});

// zone



