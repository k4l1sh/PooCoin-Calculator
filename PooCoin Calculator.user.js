// ==UserScript==
// @name         PooCoin Calculator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  profit calculator
// @author       kalish
// @match        https://poocoin.app/tokens/*
// @icon         https://poocoin.app/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function calcularPreju(maxtries) {
        let balance = 0, profit = 0, loss = 0;
        if(document.querySelectorAll('.btn-group-sm > .btn-check')[1].checked) {
            document.getElementsByClassName('my-2 d-flex align-items-center')[0].innerHTML += '<span id="totalbalance" style="color:magenta"> </span>';
            setTimeout(() => {
                let colindex = (document.querySelectorAll("div.ReactVirtualized__Table__row > div[aria-colindex='2']")[0].innerText.match(/\$([0-9\.]+)/)) ? 2 : 3;
                    document.querySelectorAll("div.ReactVirtualized__Table__row > div[aria-colindex='"+colindex+"'] > .text-success").forEach(e => {
                        if(e.innerText.match(/\$([0-9\.]+)/)) loss += parseFloat(e.innerText.match(/\$([0-9\.]+)/)[1]);
                    });
                    document.querySelectorAll("div.ReactVirtualized__Table__row > div[aria-colindex='"+colindex+"'] > .text-danger").forEach(e => {
                        if(e.innerText.match(/\$([0-9\.]+)/)) profit += parseFloat(e.innerText.match(/\$([0-9\.]+)/)[1]);
                    });
                profit = Math.round(profit*100)/100;
                loss = Math.round(loss*100)/100;
                balance = Math.round((profit-loss)*100)/100;
                if(maxtries > 0 && balance == 0) {
                    document.getElementById('totalbalance').innerHTML = "&nbsp;&nbsp;Loading...";
                    calcularPreju(--maxtries);
                }
                else document.getElementById('totalbalance').innerHTML = "&nbsp;&nbsp;&nbsp;Balance: $"+balance+"&nbsp;&nbsp;&nbsp;<span style='color:red'>Bought: $"+loss+"</span>&nbsp;&nbsp;&nbsp;<span style='color:green'>Sold: $"+profit+"</span>";
            }, 1000);
        }
    }

    setTimeout(() => {
        calcularPreju(20);
        document.querySelectorAll('.btn-group-sm > .btn-check').forEach(btn => {
            btn.addEventListener('change', () => calcularPreju(20));
        });
    }, 3000);

})();