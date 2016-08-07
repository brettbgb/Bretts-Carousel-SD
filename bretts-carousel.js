    // Carousel by Brett Bisyak
	//
	var MainCarouselView = Backbone.View.extend({

        el: '.bb-carousel-section',
		
	events: {
	  'click .prev': 'prevClick',
	  'click .next': 'nextClick'
	},

	initialize: function(){
	    this.render();
	},
		
        render: function(){
	    var template = _.template($( '#mainCarouselTemplate' ).html(), {carouselTitle:'Brett Bisyak here !'});
	    this.$el.html(template);
		
            this.carouselCollection = new BrettsCarouselCollection();
			
	    this.getLatestTop20();
        },
		
	prevClick: function() {
	    var left = parseInt($('.bb-carousel').css('left')) + 400;
	    if ( left < 0) {
                $('.bb-carousel').css({left:left + 'px'});
      	        $('.next').removeClass('disabled');
	    } else if ( left == 0 ) {
	        $('.bb-carousel').css({left:left + 'px'});
	        $('.prev').addClass('disabled');
	    } 
	},
	
	nextClick: function() {
	    var left = parseInt($('.bb-carousel').css('left')) - 400;
	    if ( left > -1600) {
            $('.bb-carousel').css({left:left + 'px'});
		$('.prev').removeClass('disabled');
            } else if ( left == -1600) {
		$('.bb-carousel').css({left:left + 'px'});
		$('.next').addClass('disabled');
            }
	},
	
	loadCarousel: function() { 
	    var self = this;
	    this.carouselCollection.each(function(item) {
                var newView = new CarouselItemView({model: item});
                self.$el.find('.bb-carousel').append( newView.render().el);
	    });
	},
	
	getLatestTop20: function() {
	    var self = this;
	    $.ajax({
	    // currently getting top 20 of random classic rock songs query
	    url: "http://itunes.apple.com/search?term=classic+rock&limit=20", 
            dataType: 'jsonp', 
	    success: function(result){
	        _.each(result.results, function(song) {
		    self.carouselCollection.add( new BrettsCarouselModel({songTitle     : song.trackName, 
					                                  songArtworkUrl: song.artworkUrl100, 
									  artistName    : song.artistName, 
									  albumName     : song.collectionName}));
		    });
	            self.loadCarousel();
		}

	    });		
	}		
    });
	
	



	
	
