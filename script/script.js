window.addEventListener('DOMContentLoaded', function () {  
    'use strict';

    //Timer
    const countTimer = (deadline) => {
        let timerHours = document.querySelector('#timer-hours');
        let timerMinutes = document.querySelector('#timer-minutes');
        let timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {  
            let dateStop = new Date(deadline).getTime(); //Получение даты окончания в милискундах
            let dateNow = new Date().getTime();//Получение сегодняшней даты в милискундах
            let timeRemaining = (dateStop - dateNow) / 1000; //Получение разницы во времени в секундах
            let seconds = Math.floor(timeRemaining % 60); // Получение секунд из общего числа секунд
            let minutes = Math.floor((timeRemaining / 60) % 60); // Получение минут из общего числа секунд
            let hours = Math.floor(timeRemaining / 60 / 60);// Получение часов из общего числа секунд
                //let hours = Math.floor((timeRemaining / 60 / 60) % 24); // Получение часов из общего числа секунд
                //let days = Math.floor(timeRemaining / 60 / 60 / 24); // Получение дней из общего числа секунд
            return {timeRemaining, hours, minutes, seconds }
        }

        function updateClock() {  

            let timer = getTimeRemaining();
            
            const addZero = (n) => {
                return n < 10 ? '0' + n: n;
            }
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);

            if(timer.timeRemaining <= 0){
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }
        //updateClock();
        setInterval(updateClock, 1000);
        
    };
    countTimer('18 december 2020');
    

    //Menu 
    const toggleMenu = () => {
        const menu = document.querySelector('menu');
        
        const activeMenu = () => {
            menu.classList.add('active-menu');
        }

        const deactiveMenu = () => {
            menu.classList.remove('active-menu');
        }

        document.body.addEventListener('click', (e) => {
            let target = e.target;
            target = target.closest('.menu');
            if(target){
                activeMenu();
            }else if(!target){
                target = e.target;
                if(target.closest('.close-btn')){
                    deactiveMenu();
                }else if(target.closest('a')){
                    deactiveMenu();
                }else{
                    target = e.target;
                    target = target.closest('.active-menu');
                    
                    if(!target){
                        deactiveMenu();
                    }else{
                        return;
                    }
                    
                }
            }

        });
    };
    toggleMenu();



    //POP-UP

    const togglePopup = () => {
        const popup = document.querySelector('.popup');
        const btnPopup = document.querySelectorAll('.popup-btn');

        //Функции Анимации

        //Функция плавного исчезновения
        function fadeOut(el) {
            el.style.opacity = 1;
            function fade() {
                if ((el.style.opacity -= .05) < 0) {
                    el.style.opacity = '';
                    el.style.display = "none";
                } else {
                    requestAnimationFrame(fade);
                }
            };
            fade();
        };
        //Фукнция плавного появления
        function fadeIn(el, display) {
            el.style.opacity = 0;
            el.style.display = display || "block";
            function fade() {
                var val = parseFloat(el.style.opacity);
                if (!((val += .05) > 1)) {
                    el.style.opacity = val;
                    requestAnimationFrame(fade);
                }
            };
            fade();
        };

        //Обработчики событий
        btnPopup.forEach(item => {
            item.addEventListener('click', () =>{

                if(document.documentElement.clientWidth>768){
                    fadeIn(popup);
                }else{
                    popup.style.display = 'block';
                }
            });
        });
        
        popup.addEventListener('click', (e) => {
            let target = e.target;

            if(target.classList.contains('popup-close')){
                if(document.documentElement.clientWidth>768){
                    fadeOut(popup)
                }else{
                    popup.style.display = '';
                }
            }else{
                target = target.closest('.popup-content');
                if(!target){
                    if(document.documentElement.clientWidth>768){
                        fadeOut(popup)
                    }else{
                        popup.style.display = '';
                    }
                }
            }
            
        });


    };
    togglePopup();

    //Скролл
    const scrolling = () => {


        const allLinks = document.querySelectorAll('menu>ul>li>a');
        const scrollBtn = document.querySelector('main>a');

        scrollBtn.addEventListener('click', scroll);

                function scroll(e){
                    e.preventDefault();
                    const href = this.getAttribute('href')
                    const scrollTarget = document.querySelector(href);
                    const offsetPosition = scrollTarget.offsetTop;
                    window.scroll({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                };
            allLinks.forEach(link => {
                link.addEventListener('click', scroll);
            });
    };
    scrolling();

    // Табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header');
        const tabs = tabHeader.querySelectorAll('.service-header-tab');
        const tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tabs[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                }else{
                    tabs[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }

        };
        tabHeader.addEventListener('click', (e) => {
            let target = e.target;
                target = target.closest('.service-header-tab');
                if(target){
                    tabs.forEach((item, i) => {
                        if(item === target){
                            toggleTabContent(i);
                        }
                    });
                }
            
            
        });

    };
    tabs();
});