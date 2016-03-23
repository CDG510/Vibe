vibe.factory("alert", function($uibModal, moment){
	function show(action, event) {
		return $uibModal.open({
			templateUrl: 'static/partials/sessionModal.html',
			controller: function() {
				var vm = this;
				vm.action = action;
				vm.event = event
				// vm.event.startsAt = moment(vm.event.startsAt).format('MMMM Do YYYY, h:mm:ss a')
				// vm.event.endsAt = moment(vm.event.endsAt).format('MMMM Do YYY, h:mm:ss a')
			},
			controllerAs: 'vm'
		})
	}
	return {
		show: show
	};
});
