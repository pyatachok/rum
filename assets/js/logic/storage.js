(function() {
	// объект, который будет хранить данные, пока окно браузера не перезагрузят
	// берем данные из хранилища в виде json и парсим их
	var _objectLocalStorage = JSON.parse( localStorage.getItem( 'objectStorage' ) ) || {},
		timer = null;
	// определяем объект с именем objectLocalStorage в window и добавляем ему геттер и сеттер
	// во избежание недоразумений, мы не трогаем localStorage, он каким был, тактим остаётся
	Object.defineProperty( window, 'objectLocalStorage', {
		get: function() {

			// timer нужен для того, чтоб не вызывать стрингификацию при каждом запросе объекта
			// и для того, чтоб старые данные localStorage не переписали новые данные,
			// что было следствием асинхронности

			// setTimeout для сохранения объекта >после< присваивания, а не до
			if( timer === null ) {
				timer = setTimeout( function(){
					var stringified = JSON.stringify( _objectLocalStorage );
					// некое подобие оптимизации: если данные в объекте не изменились,
					// значит присваивания никакого не было, сработал обычный гет
					if( stringified !== localStorage.getItem( 'objectStorage' ) ) {
						// сохраняем
						localStorage.setItem( 'objectStorage', stringified );
					}
					timer = null;
				}, 0);
			}

			return _objectLocalStorage;
		},
		// на случай, если objectLocalStorage присвоили целый объект
		set: function( v ) {
			_objectLocalStorage = v;
			localStorage.setItem( 'objectStorage', JSON.stringify( _objectLocalStorage ) );
		}
	} );
})();