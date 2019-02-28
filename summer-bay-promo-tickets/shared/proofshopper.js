'use strict';

Vue.component('proofshopper-component', {
    template: '#proofshopper-template',
    data: function data() {
        return {
            shoppers: [],
            counter: 28,
            stock_limited_element: '#stock'
        };
    },

    methods: {
        remove: function remove() {
            this.shoppers.shift();
        }
    }
});

var vueApp = new Vue({
    el: '#proofshopper'
});

var fetchProofShopper = function fetchProofShopper() {
    if ($('#float-alerts').length < 1) return;
    var product_name = $('#float-alerts').data('product');

    $.get('/api/proofshopper', function (data) {
        data['action'] = 'Just bought a package for ' + product_name;
        data['image'] = $('#shopper-img').data('img');
        data['image'] = randomImage();

        var shoppers = vueApp.$refs.proofshop.shoppers;
        var counter = vueApp.$refs.proofshop.counter;
        var counter_element = vueApp.$refs.proofshop.stock_limited_element;
        counter = counter - 1;
        $(counter_element).text(counter);
        vueApp.$refs.proofshop.counter = counter;

        shoppers.push(data);
        setTimeout(function () {
            vueApp.$refs.proofshop.shoppers.shift();
        }, 7000);

       // interval(function () {
       //     if ($('.alert-animated-test').length) {
       //         $('#proofshopper').removeClass('alert-show');
       //         $('#proofshopper').addClass('alert-hide');
       //     }
       //     setTimeout(function () {
       //         vueApp.$refs.proofshop.shoppers.shift();
       //     }, 4000);
       // }, 12000, 1);

        if (shoppers.length > 1) shoppers.shift();

        if ($('.alert-animated-test').length) {
            $('#proofshopper').removeClass('alert-hide');
            $('#proofshopper').addClass('alert-show');
        }
    });
};

function interval(func, wait, times) {
    var interv = function (w, t) {
        return function () {
            if (typeof t === "undefined" || t-- > 0) {
                setTimeout(interv, w);
                try {
                    func.call(null);
                } catch (e) {
                    t = 0;
                    throw e.toString();
                }
            }
        };
    }(wait, times);

    setTimeout(interv, wait);
};

function randomImage() {
    var mapsArray = ["/shared/images/maps/map1.jpg", "/shared/images/maps/map2.jpg", "/shared/images/maps/map3.jpg", "/shared/images/maps/map4.jpg", "/shared/images/maps/map5.jpg"];

    var rand = mapsArray[Math.floor(Math.random() * (mapsArray.length - 1))];
    return rand;
}

// run it only 5x
// interval(fetchProofShopper, 10000, 5);
// interval(fetchProofShopper, 20000, 5);
