define(['lui'], function(lui) {
	function Uhr() {
		lui.hook_rerender();
		lui.hook_dom('p', {
			innerText: lui.now()
		});
		return null;
	}

	function Root() {
		lui.hook_dom('', {
			S: {
				background: 'lime'
			}
		});
		return [
			lui.node(Uhr)
		];
	}

	return function(root) {
		lui.init(Root, root);
	};
});
