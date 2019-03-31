$(document).ready(function(){
    $("li.active").removeClass("active");
    var hash = window.location.hash;
    $("li a[href^='#menu-'").each(function(index){
        if ($(this)[0].hash === hash){
            $(this).parent().addClass('active')
            console.log('load')
        }
    });
    $('a[href^="#menu-"]').on('click',function (e) {
        e.preventDefault();
        $(document).off("scroll");
        var target = this.hash;
        $target = $(target);
        $target.parent().addClass('active');
        $('html, body').stop().animate({
            'scrollTop':  $target.offset().top //no need of parseInt here
        }, 900, 'swing', function () {
            window.location.hash = target;
            $("li.active").removeClass("active");
            $("li a[href^='#menu-'").each(function(index){
                if ($(this)[0].hash === target){
                    $(this).parent().addClass('active')
                    console.log('load')
                }
            });
        });
    });
    
});