$(function (){

	var menuButton = document.getElementById('circle');
	menuButton.addEventListener('click', function (e) {
	menuButton.classList.toggle('is-active');
	    e.preventDefault();
	    $('#navmenu').slideToggle();
	});


});

function scrollToContact( id ){

	var ContactTopOffset = $(id).position().top;

	$('html, body').animate({
	    scrollTop: ContactTopOffset
	}, 1000);


};

function LoadFlikrImg(){

	var $container = $('#container');

	var URL = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
	var searchInfo = {
	  // change this ID to another flickr ID (like your own if you have one)
	  id : "137888135@N05",
	  format : "json"
	};

	$.getJSON(URL,searchInfo,function(data) {
		console.log(data);

	      var photoHTML = '';
	
	      $.each(data.items,function(i,photo) {
	        photoHTML += '<div class="box photo col2">';
	        photoHTML += '<a href="' + photo.media.m.replace('_m','') + '">';
	        photoHTML += '<img src="' + photo.media.m + ' alt = ' + photo.title + '">'; 
	        photoHTML += '</a>'; 
	        photoHTML += '<h3 class="pro-info-title">' + photo.title + '</h3>'; 
	        photoHTML += '<p>' + photo.description.split('<p>').pop(); + '</p>'; 
	        photoHTML += '</div>'; 

	      }); // end each

	     $container.html(photoHTML);

	     $container.imagesLoaded( function(){
	       $container.masonry({
	         itemSelector : '.box',
	         isFitWidth: true,
	         isAnimated: true
	       });
	     });


	     $('.photo a').click( function (event){
	      
	          event.preventDefault();

	          var bigImg = $(this).attr('href');
	          var desImg = $(this).find('img').attr('alt');
	           
	          $('<div class="mask">'+
	          	  '<div class="large_pic"><img src="' + bigImg + '" alt = "'+ desImg +'" /></div>'+
	          	  '<p class="caption">'+desImg+'<p>'+
	          	  '</div>')
	           .appendTo('body').fadeIn().click(function (){
		           $(this).remove();
		           $('.large_pic').remove();
	          }).width($(document).width()).height($(document).height());
	         
	          // var $ImgObj = $('<img src="' + bigImg + '" alt = "'+ desImg +'" />');
	          // var $caption = $('<p class="caption">'+desImg+'<p>');

	          var setPicCenter;
	          if($('.large_pic img').height() == 0){
	          		setPicCenter = 150;
	          }else{
	          		setPicCenter = ($(window).height() - $('.large_pic img').height())/2
	          };
	          // $('.large_pic').append($ImgObj).append($caption);
	          $('.large_pic').css({'opacity':100,'top':setPicCenter});

	     	   console.log($(window).height(),$('.large_pic img').height());
	    

	     });

	  }); // end get JSON
	

	
}





