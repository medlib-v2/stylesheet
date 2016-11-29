<template>
    <div class="cookies-wrapper" :class="{dismiss : dismissCookie, hide:cookieSet}">
        <div class="cookies-message">
            <p>{{message}}<a herf="javascript::void();" id="button-promp" class="button-promp" title="Politique de confidentialité" @click="showModal = true">En savoir plus</a></p>
            <button @click.prevent="_cancelCookie" id="button-close-no" class="button-close-no">Ne pas autoriser</button>
            <button @click.prevent="_closeCookieMessage" id="button-close" class="button-close">Autoriser</button>
        </div>
        <div class="button-wrapper"><button @click.prevent="_closeCookieMessage" id="close-button">&times;</button></div>
    </div>
</template>

<script>
import CookiesBarModel from './CookiesBarModel.vue'
export default {
    props : ['cookie-message', 'days-to-expire'],
    components: { modal: CookiesBarModel },
    data () {
        /**
        * @param {string} cookieName
        * @param {message} cookieName
        * @param {expiresIn} cookieName
        */
        return {
            cookieName : 'medlib_cookie',
            message : "Ce site utilise des cookies pour améliorer l'expérience de navigation et fournir des fonctionnalités supplémentaires..",
            expiresIn : 365,
            cookieSet : false,
            dismissCookie : false,
            showModal: false
        }
    },
    mounted() {
        //-- check for user settings/properties
        this.message = (this.cookieMessage !== undefined || this.cookieMessage)
                      ? this.cookieMessage
                      : this.message
        this.expiresIn = (this.daysToExpire !== undefined || this.daysToExpire)
                      ? this.daysToExpire
                      : this.expiresIn
        //--
        this.init()
    },
    methods: {
        /**
        * initialise the component
        */
        init() {
            this._checkCookie();
        },
        /**
        * check for a existing cookie
        */
        _checkCookie() {
            //-- get the required cookie
            let cookie = this._getCookie();
            //-- check if we do have a cookie already set
            if (cookie !== "") {
                this.cookieSet = cookie.cookieSet;
                this.dismissCookie = cookie.dismissCookie;
                return;
            }
        },
        /**
        * set the cookie
        */
        _setCookie(cookie) {
            let d = new Date(),
            cvalue = this._setCookieValue();
            cookie.value = cvalue;
            d.setTime(d.getTime() + (this.expiresIn*24*60*60*1000));
            let expires = "expires="+d.toUTCString();
            document.cookie = [
				this.cookieName, '=', this.stringifyCookieValue(cookie),
				expires ? '; ' + expires : '', // use expires attribute, max-age is not supported by IE
				//path    ? '; path=' + path : '',
				//domain  ? '; domain=' + domain : '',
				//secure  ? '; secure' : ''
			].join('');
        },
        /**
        * get the cookies and searh for ours
        * @return {string}
        */
        _getCookie() {
            let key = this.cookieName;
            let ca = document.cookie ? document.cookie.split('; ') : [];
            for(let i=0; i < ca.length; i++) {
                let parts = ca[i].split('='), name = decodeURIComponent(parts.shift()), cookie = parts.join('=');
                if (key === name) {
                    let result = this.parseCookieValue(cookie);
                    // If second argument (value) is a function it's a converter...
                    return result;
                    break;
                }
            }
            return "";
        },
        /**
        * set the cookie value
        * @return {string}
        */
        _setCookieValue() {
            let a = () => { return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)};
            return (a() + a() + "-" + a() + "-" + a() + a() + a())
        },
        /**
        * close cookie message
        * @param {event} event
        */
        _closeCookieMessage(event) {
            event.preventDefault();
            this._setCookie({cookieSet: true, dismissCookie: true});
            this.cookieSet = true;
            this.dismissCookie = true;
        },
        /**
        * cancel cookie message
        * @param {event} event
        */
        _cancelCookie(event){
            event.preventDefault();
            this._setCookie({cookieSet: false, dismissCookie: true});
            this.cookieSet = false;
            this.dismissCookie = true;
        },
        stringifyCookieValue(value){ return JSON.stringify(value); },
        parseCookieValue(value) { return JSON.parse(value); }
    }
}
</script>

<style>
.cookies-wrapper {
    position: fixed;
    z-index: 4000;
    bottom: 0;
    left: 0;
    right: 0;
    height: auto;
    width: 100%;
    display: table;
    background: #7f7f7f;
    background:    -moz-linear-gradient(top,  rgba(0,0,0,.5) 0, rgba(0,0,0,.5) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(30,30,30,0.65)), color-stop(100%,rgba(0,0,0,0.95)));
    background: -webkit-linear-gradient(top,  rgba(0,0,0,.5) 0, rgba(0,0,0,.5) 100%);
    background:      -o-linear-gradient(top,  rgba(0,0,0,.5) 0, rgba(0,0,0,.5) 100%);
    background:     -ms-linear-gradient(top,  rgba(30,30,30,0.65) 0, rgba(0,0,0,0.70) 100%);
    background:         linear-gradient(to bottom,  rgba(30,30,30,0.65) 0, rgba(0,0,0,0.70) 100%);
    -webkit-transition: opacity 300ms ease;
    -moz-transition: opacity 300ms ease;
    -o-transition: opacity 300ms ease;
    transition: opacity 300ms ease;
  }
.cookies-wrapper.hide {opacity: 0; display: none;}
.cookies-wrapper.dismiss {opacity: 0; display: none;}
.cookies-wrapper p {
    font-size: 10pt !important;
    float: left;
    margin: 4px 0 0 20px;
    padding: 0;
    color: #FFF;
    font-family: sans-serif;
}
.cookies-wrapper .cookies-message {
    margin: 0;
    padding: 15px 10px;
    display: table-cell;
    vertical-align: middle;
    font-size: 13px;
    font-family: sans-serif;
    color: white;
    text-align: left;
    width: 93%;
}
.cookies-wrapper .button-wrapper {
    margin: 0;
    padding: 0;
    display: table-cell;
    vertical-align: middle;
    width: 6%;
    pointer-events: auto;
}
.cookies-wrapper .button-wrapper button {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 0;
    font-size: 20px;
    font-family: sans-serif;
    font-weight: 700;
    color: white;
    background: transparent;
    border-left: 1px rgba(0,0,0,.2) solid;
    cursor: pointer;
    outline: none;
    -webkit-transition: background 300ms ease;
    -moz-transition: background 300ms ease;
    -o-transition: background 300ms ease;
    transition: background 300ms ease;
}
.cookies-wrapper .button-wrapper button:hover {
    background: rgba(0,0,0,.5);
}
.cookies-wrapper .cookies-message button {
    margin: 0;
    padding: 0;
    border-radius: 5px;
    color: #FFF !important;
    cursor: pointer;
    display: inline-block;
    float: right;
    line-height: 1;
    margin-right: 20px;
    padding: 5px 10px 6px;
    position: relative;
    text-decoration: none;
}
.cookies-wrapper .cookies-message button.button-close {
    background-color: #36BF2D;
}
.cookies-wrapper .cookies-message button.button-close-no {
    background-color: #D02828;
}
.cookies-wrapper a.button-promp {
    color: white;
    padding: 0px 10px 0px;
    text-decoration: underline;
    cursor: pointer;
}
.cookies-wrapper a.button-promp:hover { text-decoration: none; }

@media (max-width: 800px) {
    .cookies-wrapper p { margin: 4px 0 10px 20px; }
    .cookies-wrapper .cookies-message {width: 90%; font-size: 11px}
    .cookies-wrapper .button-wrapper{width: 10%}
}

@media (max-width: 400px) {
    .cookies-wrapper p { margin: 4px 0 10px 20px; }
    .cookies-wrapper .cookies-message {width: 86%}
    .cookies-wrapper .button-wrapper{width: 13%}
}
</style>
