import { audio } from './audio.js';

import { storage } from './storage.js';
import { theme } from './theme.js';
import { util } from './util.js';

export const guest = (() => {

    const countDownDate = () => {
            const second = 1000,
                  minute = second * 60,
                  hour = minute * 60,
                  day = hour * 24;
          
            //I'm adding this section so I don't have to keep updating this pen every year :-)
            //remove this if you don't need it
            let today = new Date(),
                dd = String(today.getDate()).padStart(2, "0"),
                mm = String(today.getMonth() + 1).padStart(2, "0"),
                yyyy = today.getFullYear(),
                nextYear = yyyy + 1,
                dayMonth = "09/30/",
                birthday = dayMonth + yyyy;
            
            today = mm + "/" + dd + "/" + yyyy;
            if (today > birthday) {
              birthday = dayMonth + nextYear;
            }
            //end
            
            const countDown = new Date(birthday).getTime(),
                x = setInterval(function() {    
          
                  const now = new Date().getTime(),
                        distance = countDown - now;
          
                  document.getElementById("days").innerText = Math.floor(distance / (day)),
                    document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
                    document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
                    document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
          
                  //do something later when date is reached
                  if (distance < 0) {
                    document.getElementById("headline").innerText = "It's my birthday!";
                    document.getElementById("countdown").style.display = "none";
                    document.getElementById("content").style.display = "block";
                    clearInterval(x);
                  }
                  //seconds
                }, 0)
    };

    
    const name = () => {
        const name = (new URLSearchParams(window.location.search)).get('to');
        const guest = document.getElementById('guest-name');

        if (!name || !guest) {
            guest.remove();
        } else {
            const div = document.createElement('div');
            div.classList.add('m-2');
            div.innerHTML = `<p class="mt-0 mb-1 mx-0 p-0" style="font-size: 0.95rem;">${guest.getAttribute('data-message')}</p><h2>${util.escapeHtml(name)}</h2>`;
            guest.appendChild(div);
        }

        const form = document.getElementById('form-name');
        if (form) {
            form.value = storage('information').get('name') ?? name;
        }
    };

    const open = (button) => {
        button.disabled = true;
    
        document.body.style.overflowY = 'scroll';
        document.body.scrollIntoView({ behavior: 'instant' });
        util.opacity('welcome', 0.025);
    
        audio.play();
        audio.showButton();
        theme.showButtonChangeTheme();
        
        AOS.refresh(); // Menyegarkan AOS untuk animasi baru
    };
    

    const init = () => {
        countDownDate();

        
    };

    return {
        init,
        open,
        name,
    };
})();