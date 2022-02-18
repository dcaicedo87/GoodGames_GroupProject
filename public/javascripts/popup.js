$('button[data-popup]').click(function(){
    $('.popup[data-popup="' + $(this).data('popup') + '"]').fadeIn('fast');
});

$('.popup .close').click(function() {
    $(this).parent().parent().fadeOut('fast');
});

$( '.popup' ).mousedown(function(e) {
    if (!$(e.target).closest('.window').length ) {
        $(this).fadeOut('fast');
}
});
