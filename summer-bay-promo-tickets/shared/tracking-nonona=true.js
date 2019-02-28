if (window.location.hostname == 'localhost') {
    _analytic = console.log;
}

var trackingAction = function(action, category, label) {
    gtag('event', action, {
        hitType: 'clicks',
        event_category: category || 'category-undefined',
        event_label: label || 'label-undefined',
        send_to: window._gaID
    });
}


$(document).ready(function(){

    // general buttons
    $( "[data-tracking|='true']").click(function(event){
        $el = $(event.currentTarget);

        trackingAction($el.data('action'),
                       $el.data('category'),
                       $el.data('label')
                      )
    });

    // upsell

    $('#clickUpSale').on('submit', function(){
        trackingAction('form-upsell-submit', 'upsale', 'Upsale - YES');
    });

    $('#upsell-submit').on('click', function(){
        trackingAction('upsell-submit', 'button-upsale', 'Upsale - YES');
    });

    $('.no-thanks').on('click', function(){
        trackingAction('upsell-decline', 'button-upsale', 'Upsale - NO');
    });

    $('#claim-offer').on('click', function(){
        trackingAction('form-upsell-submit', 'upsale', 'Upsale - YES');
    })

})
