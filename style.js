/*=========================================
SHIWUSHA & COMPANY
Premium Website Script
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    PRELOADER
    =========================================*/

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        if(preloader){

            preloader.style.opacity = "0";

            preloader.style.visibility = "hidden";

            setTimeout(() => {

                preloader.remove();

            },800);

        }

    });

    /*=========================================
    STICKY HEADER
    =========================================*/

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if(window.scrollY > 60){

            header.style.background = "rgba(255,255,255,.95)";
            header.style.boxShadow = "0 10px 40px rgba(0,0,0,.08)";
            header.style.padding = "0";

        }else{

            header.style.background = "rgba(255,255,255,.75)";
            header.style.boxShadow = "none";

        }

    });

    /*=========================================
    BACK TO TOP BUTTON
    =========================================*/

    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 500){

            topBtn.style.display = "flex";

        }else{

            topBtn.style.display = "none";

        }

    });

    topBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

    /*=========================================
    SMOOTH NAVIGATION
    =========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            const target=document.querySelector(this.getAttribute("href"));

            if(target){

                e.preventDefault();

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

    /*=========================================
    HERO COUNTER
    =========================================*/

    const counters = document.querySelectorAll(".hero-features h3");

    counters.forEach(counter=>{

        const text = counter.innerText;

        const number = parseInt(text);

        if(isNaN(number)) return;

        let start = 0;

        const increment = Math.ceil(number/80);

        const update = ()=>{

            start += increment;

            if(start >= number){

                counter.innerText = text;

                return;

            }

            if(text.includes("%")){

                counter.innerText = start + "%";

            }

            else if(text.includes("+")){

                counter.innerText = start + "+";

            }

            else{

                counter.innerText = start;

            }

            requestAnimationFrame(update);

        }

        update();

    });

    /*=========================================
    ACTIVE NAV LINK
    =========================================*/

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(section=>{

            const sectionTop=section.offsetTop-150;

            if(window.scrollY>=sectionTop){

                current=section.getAttribute("id");

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#"+current){

                link.classList.add("active");

            }

        });

    });

    /*=========================================
    FLOATING PRODUCT CARD
    =========================================*/

    const floatingCard=document.querySelector(".floating-card");

    if(floatingCard){

        window.addEventListener("mousemove",(e)=>{

            const x=(window.innerWidth/2-e.clientX)/40;

            const y=(window.innerHeight/2-e.clientY)/40;

            floatingCard.style.transform=
            `translate(${x}px,${y}px)`;

        });

    }

    /*=========================================
    PARALLAX HERO IMAGE
    =========================================*/

    const heroImage=document.querySelector(".hero-image img");

    window.addEventListener("scroll",()=>{

        if(heroImage){

            const offset=window.scrollY*0.15;

            heroImage.style.transform=
            `translateY(${offset}px) scale(1.05)`;

        }

    });

    /*=========================================
    NEWSLETTER
    =========================================*/

    const form=document.querySelector(".newsletter form");

    if(form){

        form.addEventListener("submit",(e)=>{

            e.preventDefault();

            const email=form.querySelector("input").value.trim();

            if(email===""){

                alert("Please enter your email.");

                return;

            }

            alert("Thank you for subscribing!");

            form.reset();

        });

    }

    /*=========================================
    IMAGE HOVER EFFECT
    =========================================*/

    document.querySelectorAll(".collection-card,.product-card").forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transition=".4s";

        });

    });

});

/*=========================================
END
=========================================*/

