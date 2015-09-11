function mainController () {
	var users = [];
	var activeUser = 0;
	var gameField = [];
	var cs = CardService();
	if ( objectLocalStorage.users ) {
		users = objectLocalStorage.users;
	}

	return {
		'startGame' : function () {
			cs.generate();
			/**
			 * 2) раздать фишки
			 * 3) выбрать игрока для хода
			 */
			var n = 1;
			while ( n <= 14 ) {
				n++;
				for ( i in users ) {
					var card = cs.getOne();
					users[i].cards.push(card);
				}
			}
			objectLocalStorage.users = users;
			this.draw();

		},
		'finishGame' : function () {
			users = [];
			gameField = [];
			localStorage.removeItem('objectLocalStorage');
		},
		'registerUser' : function (name) {
			if ( users.length >=5 ) {
				alert('Sorry 4 is max!');
				return;
			}
			users.push({'name': name, 'cards' : [], 'active' : 0});
			objectLocalStorage.users = users;
		},
		'validate' : function () {

		},


		'draw' : function () {
			var template = $('<div class="card" draggable="true"></div>');

			for( i in users ) {
				$('.main-zone').append('<div class="card-pocket card-pocket-'+i+' "></div>');
				var cardPocket = $('.card-pocket-'+i);
				console.log(cardPocket);
				var userCards = users[i].cards;
				console.log(userCards);
				for ( j in userCards ) {
					var card = template.clone();
					cardPocket.append($(card)
						.addClass(userCards[j].color)
						.attr('id', userCards[j].id)
						.html(userCards[j].number));
				}


			}
			initMoving();
		}


	}
}