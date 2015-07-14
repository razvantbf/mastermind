var mastermind = {};
// TIMELINE {{{
mastermind.timeline = function() {

	var timelineBlocks = $('.timeline-block'),
		offset = 0.7;

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
        if (!window.requestAnimationFrame) {
            setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
        } else {
            window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
        }
    });

	function hideBlocks(blocks, offset) {
		blocks.each(function(){
            if ($(this).offset().top > $(window).scrollTop()+$(window).height()*offset) {
                //$(this).find('.timeline-content, .date').addClass('is-hidden');
                $(this).find('.timeline-content').addClass('is-hidden');
            }
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(){
            if ($(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.timeline-content').hasClass('is-hidden')) {
                $(this).find('.timeline-content')
                    .removeClass('is-hidden')
                    .addClass('animate-enter');
            }
		});
	}
}
// }}}
// ON LOAD {{{
$(document).ready(function() {
    $('.cta').on('click', function() {
        location.href = $('.cta').attr('data-href');
    })
    if ($('html').hasClass('no-touch')) {
        mastermind.timeline();
    }
});
// }}}
