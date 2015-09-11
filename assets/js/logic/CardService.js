function CardService () {

	return {
		"generate" : function () {
			var colors = ['red', 'black', 'orange', 'blue'];
			var items = [1,2,3,4,5,6,7,8,9,10,11,12,13];
			var decs = [1,2];
			var cards = [];
			for (i in colors) {
				for (k in decs ) {
					for ( j in items) {
						cards.push(
							{
								'color' : colors[i],
								'id' : colors[i] + '-' + i + decs[k] + items[j],
								'number' : items[j]
							}
						)
					}
				}
			}
			objectLocalStorage.cards = cards;
		},
		"getAll" : function () {
			if (objectLocalStorage.cards) {
				return objectLocalStorage.cards;
			}
			return [];
		},
		"countCards" : function () {
			return this.getAll().length;
		},
		"getRandomKey" : function ()
		{
			var length = this.getAll().length-1;
			return Math.floor(Math.random() * length);
		},
		"getOne" : function () {
			if ( this.countCards().length <= 0 ) {
				this.generate();
			}
			var key = this.getRandomKey();
			var cards = this.getAll();
			var out = cards[key];
			cards.splice(key, 1);
			objectLocalStorage.cards =  cards;
			return out;
		}
	};
};

