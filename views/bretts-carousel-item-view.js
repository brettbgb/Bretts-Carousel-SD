	var CarouselItemView = Backbone.View.extend({
		
		tagName: 'li',

		initialize: function(){
		    this.render();
		},
		
        render: function(){
			var template = _.template($( '#carouselItemTemplate' ).html(), {songArtworkUrl:this.model.get('songArtworkUrl'), 
			                                                                songTitle:this.model.get('songTitle'),
																			artistName: this.model.get('artistName')});
			this.$el.html(template);
			return this;
        }
	});
	
