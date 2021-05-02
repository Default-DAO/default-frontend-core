import keys from '../config/keys'

function setupChatra(window, document) {
    let chatScript = (function(d, w, c) {
        w.ChatraID = 'Fcy6YwtRWuZxPoMLB';
        var s = d.createElement('script');
        w[c] = w[c] || function() {
            (w[c].q = w[c].q || []).push(arguments);
        };
        s.async = true;
        s.src = 'https://call.chatra.io/chatra.js';
        if (d.head) d.head.appendChild(s);
    });
    
    chatScript(document, window, 'Chatra')
    
    window.ChatraSetup = {
        colors: {
            buttonText: 'white', /* chat button text color */
            buttonBg: keys.PRIMARY_COLOR    /* chat button background color */
        }
    };
}

module.exports = setupChatra
