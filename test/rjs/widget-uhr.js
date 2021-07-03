define(['lui'], function(lui) {
	function Uhr() {
		lui.hook_rerender();
		lui.hook_dom('p', {
			innerText: lui.now()
		});
		return null;
	}

	return function(root) {
		lui.init(function() {
			return [{
				S: {
					background: 'lime'
				}
			}, [
				lui.node(Uhr)
			]];
		}, root);
	};
});
