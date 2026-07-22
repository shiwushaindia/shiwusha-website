/*=========================================================
 SHIWUSHA & COMPANY
 Premium Website
 Inspired by Shopify Wonder
 script.js - Part 1
=========================================================*/

"use strict";

/*=========================================================
DOM READY
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeWebsite();

});

/*=========================================================
INITIALIZE
=========================================================*/

function initializeWebsite(){

    loader();

    stickyHeader();

    mobileNavigation();

    smoothScrolling();

    activeNavigation();

    backToTop();

    scrollProgress();

}

/*=========================================================
ELEMENTS
=========================================================*/

const header = document.querySelector("header");

const backButton = document.getElementById("backToTop");

const mobileToggle = document.querySelector(".menu-toggle");

const navigation = document.querySelector(".navbar");

const navLinks = document.querySelectorAll(".navbar a");

const sections = document.querySelectorAll("section[id]");


/*=========================================================
LOADER
=========================================================*/

function loader(){

    const loader = document.querySelector(".loader");

    if(!loader) return;

    window.addEventListener("load",()=>{

        loader.style.opacity="0";

        loader.style.visibility="hidden";

        setTimeout(()=>{

            loader.remove();

        },600);

    });

}


/*=========================================================
HEADER
=========================================================*/

function stickyHeader(){

    if(!header) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>40){

            header.classList.add("sticky");

        }

        else{

            header.classList.remove("sticky");

        }

    });

}


/*=========================================================
MOBILE MENU
=========================================================*/

function mobileNavigation(){

    if(!mobileToggle || !navigation) return;

    mobileToggle.addEventListener("click",()=>{

        navigation.classList.toggle("active");

        mobileToggle.classList.toggle("active");

    });

    navLinks.forEach(link=>{

        link.addEventListener("click",()=>{

            navigation.classList.remove("active");

            mobileToggle.classList.remove("active");

        });

    });

}


/*=========================================================
SMOOTH SCROLL
=========================================================*/

function smoothScrolling(){

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            const target=document.querySelector(this.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        });

    });

}


/*=========================================================
ACTIVE NAVIGATION
=========================================================*/

function activeNavigation(){

    if(sections.length===0) return;

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(section=>{

            const top=section.offsetTop-150;

            const height=section.offsetHeight;

            if(pageYOffset>=top){

                current=section.getAttribute("id");

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#" + current){

                link.classList.add("active");

            }

        });

    });

}


/*=========================================================
BACK TO TOP
=========================================================*/

function backToTop(){

    if(!backButton) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            backButton.classList.add("show");

        }

        else{

            backButton.classList.remove("show");

        }

    });

    backButton.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}


/*=========================================================
SCROLL PROGRESS
=========================================================*/

function scrollProgress(){

    const progress=document.createElement("div");

    progress.id="scroll-progress";

    progress.style.position="fixed";

    progress.style.top="0";

    progress.style.left="0";

    progress.style.height="3px";

    progress.style.background="#C9A96E";

    progress.style.width="0%";

    progress.style.zIndex="99999";

    document.body.appendChild(progress);

    window.addEventListener("scroll",()=>{

        const scrollTop=document.documentElement.scrollTop;

        const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

        const percent=(scrollTop/height)*100;

        progress.style.width=percent+"%";

    });

}


/*=========================================================
HELPERS
=========================================================*/

const qs=(selector)=>document.querySelector(selector);

const qsa=(selector)=>document.querySelectorAll(selector);

const on=(element,event,callback)=>{

    if(element){

        element.addEventListener(event,callback);

    }

};
/*=========================================================
 SHIWUSHA & COMPANY
 Premium Website
 script.js - Part 2
 Animations & Interactive Components
=========================================================*/


/*=========================================================
REVEAL ON SCROLL
=========================================================*/

function revealAnimations(){

    const reveals=document.querySelectorAll(".reveal");

    if(reveals.length===0) return;

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    },{

        threshold:.15

    });

    reveals.forEach(item=>observer.observe(item));

}

revealAnimations();


/*=========================================================
COUNTER ANIMATION
=========================================================*/

function animateCounters(){

    const counters=document.querySelectorAll("[data-counter]");

    if(counters.length===0) return;

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const counter=entry.target;

            const target=parseInt(counter.dataset.counter);

            const duration=1800;

            let start=0;

            const increment=target/(duration/16);

            const update=()=>{

                start+=increment;

                if(start>=target){

                    counter.innerText=target.toLocaleString();

                    return;

                }

                counter.innerText=Math.floor(start).toLocaleString();

                requestAnimationFrame(update);

            };

            update();

            observer.unobserve(counter);

        });

    });

    counters.forEach(counter=>observer.observe(counter));

}

animateCounters();


/*=========================================================
PARALLAX HERO
=========================================================*/

function heroParallax(){

    const hero=document.querySelector(".hero img");

    if(!hero) return;

    window.addEventListener("scroll",()=>{

        const offset=window.pageYOffset;

        hero.style.transform=`translateY(${offset*.18}px) scale(1.05)`;

    });

}

heroParallax();


/*=========================================================
BUTTON RIPPLE EFFECT
=========================================================*/

function rippleButtons(){

    const buttons=document.querySelectorAll(".btn,.primary-btn,.secondary-btn");

    buttons.forEach(button=>{

        button.addEventListener("click",function(e){

            const ripple=document.createElement("span");

            ripple.className="ripple";

            const rect=this.getBoundingClientRect();

            ripple.style.left=e.clientX-rect.left+"px";

            ripple.style.top=e.clientY-rect.top+"px";

            this.appendChild(ripple);

            setTimeout(()=>{

                ripple.remove();

            },700);

        });

    });

}

rippleButtons();


/*=========================================================
IMAGE HOVER TILT
=========================================================*/

function tiltCards(){

    const cards=document.querySelectorAll(".collection-card,.featured-card");

    cards.forEach(card=>{

        card.addEventListener("mousemove",(e)=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            const rotateX=((y/rect.height)-.5)*8;

            const rotateY=((x/rect.width)-.5)*-8;

            card.style.transform=
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="";

        });

    });

}

tiltCards();


/*=========================================================
GALLERY LIGHTBOX
=========================================================*/

function galleryLightbox(){

    const images=document.querySelectorAll(".gallery-item img");

    if(images.length===0) return;

    const overlay=document.createElement("div");

    overlay.id="lightbox";

    overlay.innerHTML='<img>';

    document.body.appendChild(overlay);

    const preview=overlay.querySelector("img");

    images.forEach(image=>{

        image.addEventListener("click",()=>{

            preview.src=image.src;

            overlay.classList.add("show");

        });

    });

    overlay.addEventListener("click",()=>{

        overlay.classList.remove("show");

    });

}

galleryLightbox();


/*=========================================================
LAZY LOADING
=========================================================*/

function lazyImages(){

    const images=document.querySelectorAll("img[data-src]");

    if(images.length===0) return;

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const img=entry.target;

            img.src=img.dataset.src;

            img.removeAttribute("data-src");

            observer.unobserve(img);

        });

    });

    images.forEach(image=>observer.observe(image));

}

lazyImages();


/*=========================================================
TESTIMONIAL AUTO SLIDER
=========================================================*/

function testimonialSlider(){

    const cards=document.querySelectorAll(".testimonial-card");

    if(cards.length<=1) return;

    let current=0;

    setInterval(()=>{

        cards.forEach(card=>{

            card.classList.remove("active");

        });

        current++;

        if(current>=cards.length){

            current=0;

        }

        cards[current].classList.add("active");

    },5000);

}

testimonialSlider();


/*=========================================================
SECTION FADE DELAY
=========================================================*/

document.querySelectorAll(".reveal").forEach((item,index)=>{

    item.style.transitionDelay=`${index*0.08}s`;

});


/*=========================================================
WINDOW RESIZE OPTIMIZATION
=========================================================*/

let resizeTimer;

window.addEventListener("resize",()=>{

    clearTimeout(resizeTimer);

    resizeTimer=setTimeout(()=>{

        window.dispatchEvent(new Event("optimizedResize"));

    },200);

});


/*=========================================================
CONSOLE MESSAGE
=========================================================*/

console.log(
"%cShiwusha & Company",
"color:#C9A96E;font-size:18px;font-weight:bold;"
);

console.log(
"Premium website developed with HTML, CSS & JavaScript."
);
/*=========================================================
 SHIWUSHA & COMPANY
 Premium Website
 script.js - Part 3A
 Lead Form + WhatsApp + Odoo Ready
=========================================================*/

"use strict";

/*=========================================================
CONFIGURATION
=========================================================*/

// Replace with your WhatsApp Business number
const WHATSAPP_NUMBER = "919876543210";

// Replace after Odoo is configured
const ODOO_ENDPOINT = "";

// Future API Key if required
const ODOO_API_KEY = "";


/*=========================================================
FORM ELEMENTS
=========================================================*/

const enquiryForm = document.querySelector("#leadForm");

if (enquiryForm) {

    enquiryForm.addEventListener("submit", submitLeadForm);

}


/*=========================================================
SUBMIT FORM
=========================================================*/

async function submitLeadForm(event) {

    event.preventDefault();

    clearErrors();

    const formData = getFormData();

    if (!validateLead(formData)) {

        return;

    }

    showLoading();

    try {

        if (ODOO_ENDPOINT !== "") {

            await sendToOdoo(formData);

        }

        openWhatsApp(formData);

        showSuccess();

        enquiryForm.reset();

    }

    catch (error) {

        console.error(error);

        showToast("Something went wrong. Please try again.");

    }

    finally {

        hideLoading();

    }

}


/*=========================================================
GET FORM DATA
=========================================================*/

function getFormData() {

    return {

        name: getValue("name"),

        phone: getValue("phone"),

        email: getValue("email"),

        category: getValue("category"),

        message: getValue("message"),

        source: "Website",

        created: new Date().toISOString()

    };

}


/*=========================================================
GET VALUE
=========================================================*/

function getValue(id) {

    const field = document.getElementById(id);

    if (!field) return "";

    return field.value.trim();

}


/*=========================================================
VALIDATION
=========================================================*/

function validateLead(data) {

    let valid = true;

    if (data.name.length < 2) {

        showError("name", "Please enter your name");

        valid = false;

    }

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(data.phone)) {

        showError("phone", "Enter a valid mobile number");

        valid = false;

    }

    if (data.email !== "") {

        const emailRegex =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(data.email)) {

            showError("email", "Invalid email address");

            valid = false;

        }

    }

    return valid;

}


/*=========================================================
SHOW ERROR
=========================================================*/

function showError(id, message) {

    const input = document.getElementById(id);

    if (!input) return;

    input.classList.add("input-error");

    let error = input.nextElementSibling;

    if (!error || !error.classList.contains("error-text")) {

        error = document.createElement("small");

        error.className = "error-text";

        input.insertAdjacentElement("afterend", error);

    }

    error.innerText = message;

}


/*=========================================================
CLEAR ERRORS
=========================================================*/

function clearErrors() {

    document

        .querySelectorAll(".input-error")

        .forEach(el => {

            el.classList.remove("input-error");

        });

    document

        .querySelectorAll(".error-text")

        .forEach(el => {

            el.remove();

        });

}


/*=========================================================
LOADING
=========================================================*/

function showLoading() {

    const btn = enquiryForm.querySelector("button");

    if (!btn) return;

    btn.disabled = true;

    btn.dataset.original = btn.innerHTML;

    btn.innerHTML =

    '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

}

function hideLoading() {

    const btn = enquiryForm.querySelector("button");

    if (!btn) return;

    btn.disabled = false;

    btn.innerHTML = btn.dataset.original;

}


/*=========================================================
WHATSAPP MESSAGE
=========================================================*/

function buildWhatsAppMessage(data) {

    return `Hello Shiwusha & Company,

My Name: ${data.name}

Mobile: ${data.phone}

Email: ${data.email || "Not Provided"}

Interested In: ${data.category}

Message:
${data.message}

Please contact me.

Thank you.`;

}


/*=========================================================
OPEN WHATSAPP
=========================================================*/

function openWhatsApp(data) {

    const message =

    encodeURIComponent(buildWhatsAppMessage(data));

    const url =

`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    window.open(url, "_blank");

}


/*=========================================================
SEND TO ODOO
=========================================================*/

async function sendToOdoo(data) {

    if (!ODOO_ENDPOINT) return;

    const response = await fetch(ODOO_ENDPOINT, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

            "Authorization": ODOO_API_KEY

        },

        body: JSON.stringify(data)

    });

    if (!response.ok) {

        throw new Error("Odoo Error");

    }

}


/*=========================================================
SUCCESS
=========================================================*/

function showSuccess() {

    showToast(

        "Thank you! We'll contact you shortly."

    );

}
/*=========================================================
 SHIWUSHA & COMPANY
 script.js - Part 3B
 Toasts, Newsletter, Analytics & Draft Saving
=========================================================*/


/*=========================================================
TOAST NOTIFICATION
=========================================================*/

function showToast(message, type = "success") {

    let toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerHTML = `
        <i class="fa-solid ${
            type === "success"
                ? "fa-circle-check"
                : "fa-circle-exclamation"
        }"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => toast.remove(), 400);

    }, 3500);

}


/*=========================================================
NEWSLETTER
=========================================================*/

const newsletterForm = document.querySelector("#newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", newsletterSubmit);

}

function newsletterSubmit(e) {

    e.preventDefault();

    const email = newsletterForm.querySelector("input").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        showToast("Please enter a valid email address.", "error");

        return;

    }

    showToast("Thank you for subscribing!");

    newsletterForm.reset();

}


/*=========================================================
AUTO SAVE FORM
=========================================================*/

function autoSaveLeadForm() {

    if (!enquiryForm) return;

    enquiryForm.querySelectorAll("input, textarea, select").forEach(field => {

        field.addEventListener("input", () => {

            localStorage.setItem(

                "shiwushaLeadDraft",

                JSON.stringify(getFormData())

            );

        });

    });

}

autoSaveLeadForm();


/*=========================================================
RESTORE SAVED FORM
=========================================================*/

function restoreLeadDraft() {

    if (!enquiryForm) return;

    const draft = localStorage.getItem("shiwushaLeadDraft");

    if (!draft) return;

    try {

        const data = JSON.parse(draft);

        Object.keys(data).forEach(key => {

            const field = document.getElementById(key);

            if (field) {

                field.value = data[key];

            }

        });

    } catch (e) {

        console.warn("Draft restore failed.");

    }

}

restoreLeadDraft();


/*=========================================================
CLEAR DRAFT AFTER SUCCESS
=========================================================*/

function clearLeadDraft() {

    localStorage.removeItem("shiwushaLeadDraft");

}


/*=========================================================
UPDATE SUCCESS FUNCTION
=========================================================*/

const originalSuccess = showSuccess;

showSuccess = function () {

    clearLeadDraft();

    originalSuccess();

};


/*=========================================================
GOOGLE ANALYTICS EVENTS
=========================================================*/

function trackEvent(eventName, parameters = {}) {

    if (typeof gtag === "function") {

        gtag("event", eventName, parameters);

    }

}


/*=========================================================
META PIXEL EVENTS
=========================================================*/

function trackMeta(eventName) {

    if (typeof fbq === "function") {

        fbq("track", eventName);

    }

}


/*=========================================================
TRACK FORM SUBMIT
=========================================================*/

if (enquiryForm) {

    enquiryForm.addEventListener("submit", () => {

        trackEvent("lead_form_submit");

        trackMeta("Lead");

    });

}


/*=========================================================
TRACK WHATSAPP CLICK
=========================================================*/

document.querySelectorAll(".floating-whatsapp,.whatsapp-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        trackEvent("whatsapp_click");

        trackMeta("Contact");

    });

});


/*=========================================================
TRACK PHONE CLICK
=========================================================*/

document.querySelectorAll(".floating-call,.call-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        trackEvent("phone_call");

    });

});


/*=========================================================
COPY TEXT
=========================================================*/

function copyText(text) {

    navigator.clipboard.writeText(text).then(() => {

        showToast("Copied to clipboard.");

    });

}


/*=========================================================
PREVENT DOUBLE SUBMISSION
=========================================================*/

let formLocked = false;

const oldSubmit = submitLeadForm;

submitLeadForm = async function (e) {

    if (formLocked) return;

    formLocked = true;

    await oldSubmit(e);

    setTimeout(() => {

        formLocked = false;

    }, 3000);

};


/*=========================================================
ONLINE / OFFLINE
=========================================================*/

window.addEventListener("offline", () => {

    showToast("You appear to be offline.", "error");

});

window.addEventListener("online", () => {

    showToast("Connection restored.");

});


/*=========================================================
END PART 3B
=========================================================*/
/*=========================================================
 SHIWUSHA & COMPANY
 script.js - Part 3C
 Production Final
=========================================================*/

"use strict";

/*=========================================================
ESC KEY SUPPORT
=========================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        document
            .querySelector(".navbar")
            ?.classList.remove("active");

        document
            .querySelector(".menu-toggle")
            ?.classList.remove("active");

        document
            .getElementById("lightbox")
            ?.classList.remove("show");

    }

});


/*=========================================================
CLICK OUTSIDE MOBILE MENU
=========================================================*/

document.addEventListener("click",(e)=>{

    const nav=document.querySelector(".navbar");

    const toggle=document.querySelector(".menu-toggle");

    if(!nav || !toggle) return;

    if(

        nav.classList.contains("active") &&

        !nav.contains(e.target) &&

        !toggle.contains(e.target)

    ){

        nav.classList.remove("active");

        toggle.classList.remove("active");

    }

});


/*=========================================================
PRELOAD IMPORTANT IMAGES
=========================================================*/

function preloadImages(){

    document
    .querySelectorAll("img[data-preload]")
    .forEach(img=>{

        const image=new Image();

        image.src=img.dataset.preload;

    });

}

preloadImages();


/*=========================================================
DEBOUNCE
=========================================================*/

function debounce(callback,delay=200){

    let timeout;

    return(...args)=>{

        clearTimeout(timeout);

        timeout=setTimeout(()=>{

            callback(...args);

        },delay);

    };

}


/*=========================================================
THROTTLE
=========================================================*/

function throttle(callback,limit=150){

    let waiting=false;

    return(...args)=>{

        if(waiting) return;

        callback(...args);

        waiting=true;

        setTimeout(()=>{

            waiting=false;

        },limit);

    };

}


/*=========================================================
OPTIMIZED SCROLL
=========================================================*/

window.addEventListener(

    "scroll",

    throttle(()=>{

        // reserved for future features

    })

);


/*=========================================================
NETWORK STATUS
=========================================================*/

function updateNetworkStatus(){

    const online=navigator.onLine;

    document.body.classList.toggle(

        "offline",

        !online

    );

}

window.addEventListener("online",updateNetworkStatus);

window.addEventListener("offline",updateNetworkStatus);

updateNetworkStatus();


/*=========================================================
SAFE FETCH
=========================================================*/

async function safeFetch(url,options={}){

    try{

        const response=await fetch(url,options);

        if(!response.ok){

            throw new Error(

                `HTTP ${response.status}`

            );

        }

        return response;

    }

    catch(error){

        console.error(

            "Fetch Error:",

            error

        );

        throw error;

    }

}


/*=========================================================
PHONE LINK HELPER
=========================================================*/

function callBusiness(number){

    window.location.href=`tel:${number}`;

}


/*=========================================================
EMAIL LINK HELPER
=========================================================*/

function sendEmail(address){

    window.location.href=`mailto:${address}`;

}


/*=========================================================
WHATSAPP LINK HELPER
=========================================================*/

function openWhatsAppDirect(message="Hello"){

    window.open(

`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,

"_blank"

    );

}


/*=========================================================
SCROLL TO SECTION
=========================================================*/

function scrollToSection(id){

    const section=document.getElementById(id);

    if(!section) return;

    section.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

}


/*=========================================================
IMAGE ERROR FALLBACK
=========================================================*/

document

.querySelectorAll("img")

.forEach(image=>{

    image.addEventListener("error",()=>{

        image.src="assets/images/placeholder.jpg";

    });

});


/*=========================================================
REMOVE EMPTY LINKS
=========================================================*/

document

.querySelectorAll("a")

.forEach(link=>{

    if(

        link.getAttribute("href")==="#" ||

        link.getAttribute("href")===""

    ){

        link.addEventListener("click",e=>{

            e.preventDefault();

        });

    }

});


/*=========================================================
PERFORMANCE LOG
=========================================================*/

window.addEventListener("load",()=>{

    setTimeout(()=>{

        const timing=

        performance.now().toFixed(0);

        console.log(

            `Loaded in ${timing}ms`

        );

    },0);

});


/*=========================================================
GLOBAL ERROR HANDLER
=========================================================*/

window.addEventListener("error",(event)=>{

    console.error(

        "Application Error:",

        event.message

    );

});


/*=========================================================
UNHANDLED PROMISES
=========================================================*/

window.addEventListener(

"unhandledrejection",

event=>{

    console.error(

        event.reason

    );

});


/*=========================================================
ODDO READY INITIALIZER
=========================================================*/

const CRM={

    endpoint:ODOO_ENDPOINT,

    apiKey:ODOO_API_KEY,

    enabled:ODOO_ENDPOINT!=="" ,

    async send(data){

        if(!this.enabled) return;

        return safeFetch(

            this.endpoint,

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json",

                    "Authorization":this.apiKey

                },

                body:JSON.stringify(data)

            }

        );

    }

};


/*=========================================================
VERSION
=========================================================*/

const APP={

    name:"Shiwusha & Company",

    version:"1.0.0",

    environment:"production"

};

console.table(APP);


/*=========================================================
END
=========================================================*/

console.log(

"%cWebsite Ready ✔",

"color:#25D366;font-size:18px;font-weight:bold;"

);