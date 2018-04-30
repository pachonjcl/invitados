var app = angular.module('invitadosApp', []);

app.controller('InvitadosCtrl', function (InvitadosService) {
    var ctrl = this;

    ctrl.getTotal = function () {
        var total = 0;
        for (var i = 0; i < 10; i++) {
            var data = localStorage.getItem('data' + i);
            data = JSON.parse(data);
            if (data) {
                for (var asiento in data) {
                    total++;
                }
            }
        }
        return total;
    }

    ctrl.$onInit = function () {
        InvitadosService.drawTable();
    }

});