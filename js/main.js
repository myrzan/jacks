$(function(){
    "use strict";

    $("input[name=phone]").mask("+7(999) 999-9999");

    var nav_offset_top = $('header').height() + 50; 
    /*-------------------------------------------------------------------------------
	  Navbar 
	-------------------------------------------------------------------------------*/

	//* Navbar Fixed
    function navbarFixed(){
        if($('.header_area').length){ 
            $(window).scroll(function(){
                var scroll = $(window).scrollTop();   
                if(scroll >= nav_offset_top){
                    $(".header_area").addClass("navbar_fixed");
                }else{
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        };
    };
    navbarFixed();

    //------- mailchimp --------//  
	function mailChimp(){
		$('#mc_embed_signup').find('form').ajaxChimp();
	}
    mailChimp();

    $('select').niceSelect();
    /*-------------------------------------------------------------------------------
	  testimonial slider
	-------------------------------------------------------------------------------*/
    if($('.testimonial').length){
        $('.testimonial').owlCarousel({
            loop: true,
            margin: 30,
            items: 5,
            nav: false,
            dots: true,
            responsiveClass: true,
            slideSpeed: 300,
            paginationSpeed: 500,
            responsive:{
                0:{
                    items: 1
                }
            }
        })
    }

    $(".nav-link").on("click", function(){
        let id = $(this).attr("href");
        let top = $(id).offset().top;
        $("html, body").animate({
            scrollTop: top-100
        }, 1000);
        return false;
    });

    $(".request-btn").on("click", function(){
        $("#requestModal").modal('show');
        return false;
    });

    $("#request_form button").on("click", function(){
        let form = $("#request_form");
        let modal = $("#requestModal");
        let name = form.find("input[name=name]").val();
        if(name.length == 0){
            alert('Введите имя');
            return false;
        }
        let phone = form.find("input[name=phone]").val();
        if(phone.length == 0){
            alert('Введите номер телефона');
            return false;
        }
        $.ajax({
            url: "request.php",
            type: "POST",
            data: {
                name: name,
                phone: phone
            },
            dataType: "json",
            success(response){
                modal.find('.response').html(response['message']);
                form.hide();
            }
        });
    });

    $('#requestModal').on('hidden.bs.modal', function(e){
        $(this).find('.response').empty();
        $(this).find('form').show();
    });

    $("#requestModal").find("input").on("keydown", function(e){
        if(e.which == 13){
            $("#requestModal").find(".button-hero").trigger("click");
        }
    });

    $(".button-contactForm").on("click", function(){
        let form = $("#contactForm");
        let name = form.find("input[name=name]").val();
        if(name.length == 0){
            alert('Введите имя');
            return false;
        }
        let phone = form.find("input[name=phone]").val();
        if(phone.length == 0){
            alert('Введите номер телефона');
            return false;
        }
        let email = form.find("input[name=email]").val();
        if(email.length == 0){
            alert('Введите email');
            return false;
        }
        let message = form.find("#message").val();
        if(message.length == 0){
            alert('Введите ваше сообщение');
            return false;
        }
        $.ajax({
            url: "contact_process.php",
            type: "POST",
            data: {
                name: name,
                phone: phone,
                email: email,
                message: message,
            },
            dataType: "json",
            success(response){
                form.find(".response").html(response['message']);
            }
        });
    });
    $("#contactForm").find("input").on("keydown", function(e){
        if(e.which == 13){
            $(".button-contactForm").trigger("click");
        }
    });
});