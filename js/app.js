import { audio } from './audio.js';
import { guest } from './guest.js';
import { progress } from './progress.js';
import { theme } from './theme.js';
import { util } from './util.js';

document.addEventListener('DOMContentLoaded', () => {
    audio.init();
    theme.check();

    guest.init();
    progress.init();
    window.AOS.init();

    window.util = util;
    window.guest = guest;
    window.theme = theme;
    window.audio = audio;
});
