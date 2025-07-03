// header
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const header = document.querySelector("header");

    const headerHeight = header.offsetHeight;

   
});

// header


// body


document.addEventListener("DOMContentLoaded", () => {
    const timelineContainer = document.getElementById("timeline-list-container");
    const detailWrapper = document.getElementById("detail-content-wrapper");

    // --- News Data with Themed Placeholder Images for Lilac/Blue Theme ---
    const newsData = [{
        id: "news1",
        title: "افتتاح فاز جدید پل کابلی ولیعصر (عج) شیراز",
        date: "۱۲ مرداد ۱۴۰۲",
        image: "./images/pol.jpg",
        fullText: "فاز جدید پل کابلی ولیعصر (عج) در شیراز به بهره‌برداری رسید. این پروژه که از جمله طرح‌های بزرگ عمرانی شهرداری شیراز محسوب می‌شود، نقش بسزایی در روان‌سازی ترافیک و تسهیل عبور و مرور در یکی از پرترددترین نقاط شهر ایفا خواهد کرد."
    }, {
        id: "news2",
        title: "افزایش ظرفیت گردشگری با اقامتگاه‌های بوم‌گردی",
        date: "۱۰ مرداد ۱۴۰۲",
        image: "./images/boomgardi.jpg",
        fullText: "با هدف توسعه صنعت گردشگری و جذب بیشتر توریست، چندین اقامتگاه بوم‌گردی جدید در مناطق مختلف شیراز و اطراف آن به بهره‌برداری رسید. این اقامتگاه‌ها با حفظ معماری سنتی، تجربه‌ای متفاوت و اصیل از فرهنگ و طبیعت فارس را برای بازدیدکنندگان فراهم می‌کنند."
    }, {
        id: "news3",
        title: "استقبال گسترده از نمایشگاه گل و گیاه شیراز",
        date: "۹ مرداد ۱۴۰۲",
        image: "./images/gol.jpg",
        fullText: "نمایشگاه بین‌المللی گل و گیاه شیراز با حضور فعال تولیدکنندگان داخلی و بین‌المللی، متخصصان باغبانی و علاقه‌مندان به طبیعت، در محل دائمی نمایشگاه‌های بین‌المللی فارس برگزار شد. این نمایشگاه فرصتی بی‌نظیر برای تبادل دانش و تجربه در زمینه صنعت گل و گیاه بود."
    }, {
        id: "news4",
        title: "آغاز عملیات اجرایی خط 3 مترو شیراز",
        date: "۷ مرداد ۱۴۰۲",
        image: "./images/metro.png",
        fullText: "عملیات اجرایی خط 3 مترو شیراز که مناطق جنوبی شهر را به مناطق شمالی متصل خواهد کرد، رسماً آغاز شد. این خط جدید با هدف گسترش شبکه حمل‌ونقل ریلی و کاهش ترافیک در محورهای اصلی شهر طراحی شده است."
    }, {
        id: "news5",
        title: "ساخت بزرگترین مرکز درمانی تخصصی کودکان",
        date: "۵ مرداد ۱۴۰۲",
        image: "./images/hospital.jpg",
        fullText: "عملیات اجرایی بزرگترین مرکز درمانی تخصصی کودکان در جنوب کشور، با حضور مقامات کشوری و استانی، در شیراز آغاز شد. این بیمارستان مجهز به آخرین فناوری‌های پزشکی و بخش‌های فوق تخصصی برای درمان بیماری‌های کودکان خواهد بود."
    }, {
        id: "news6",
        title: "تقاطع غیرهمسطح شهیدان آماده بهره‌برداری",
        date: "۳ مرداد ۱۴۰۲",
        image: "./images/shahidan.jpg",
        fullText: "شهردار شیراز گفت: تقاطع غیرهمسطح تقاطع شهیدان جعفر و حسن سرانجام (قائم-رحمت-احمدی جنوبی) در بلوار رحمت، به عنوان یکی از محورهای اصلی و شریانی این کلان‌شهر، احداث و آماده بهره‌برداری است."
    }];

    /**
     * Creates and injects timeline items into the DOM.
     */
    function createTimelineItems() {
        if (!timelineContainer) return;
        timelineContainer.innerHTML = "";

        newsData.forEach(item => {
            const timelineItem = document.createElement("div");
            timelineItem.className = "timeline-item";
            timelineItem.dataset.newsId = item.id;
            timelineItem.innerHTML = `
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-date">${item.date}</div>
            `;
            timelineContainer.appendChild(timelineItem);
        });

        addEventListeners();
    }

    /**
     * Renders the details of a selected news item with a fade and slide transition.
     * @param {object} newsItem - The news object to display.
     */
    function renderNewsDetail(newsItem) {
        if (!detailWrapper) return;
        
        // Add class to trigger fade-out animation
        detailWrapper.classList.add('is-loading');

        // Wait for the animation to complete before updating content
        setTimeout(() => {
            if (!detailWrapper) return;
            
            // Update content
            detailWrapper.innerHTML = `
                <img src="${newsItem.image}" alt="${newsItem.title}" class="detail-image" onerror="this.onerror=null;this.src='https://placehold.co/800x400/e6e9f8/7b81b3?text=Image+Error';">
                <h2 class="detail-title">${newsItem.title}</h2>
                <div class="detail-meta">
                    <span><i class="fas fa-calendar-alt"></i> تاریخ انتشار: ${newsItem.date}</span>
                </div>
                <div class="detail-text">
                    <p>${newsItem.fullText}</p>
                </div>
            `;

            // Remove class to trigger fade-in animation
            detailWrapper.classList.remove('is-loading');
        }, 400); // This duration must match the CSS transition duration
    }

    /**
     * Adds click event listeners to all timeline items.
     */
    function addEventListeners() {
        const allItems = document.querySelectorAll('.timeline-item');
        allItems.forEach(item => {
            item.addEventListener('click', () => {
                if (item.classList.contains('active')) return;

                const newsId = item.dataset.newsId;
                const selectedNews = newsData.find(news => news.id === newsId);

                if (selectedNews) {
                    allItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    renderNewsDetail(selectedNews);
                }
            });
        });

        // Initially activate the first item
        if (allItems.length > 0) {
            allItems[0].click();
        }
    }

    // Initial function call to start the application
    createTimelineItems();
});



// end body
