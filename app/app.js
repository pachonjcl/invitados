var app = angular.module('invitadosApp', []);

app.controller('InvitadosCtrl', function (InvitadosService) {
    var ctrl = this;

    var currentTableNumber;

    ctrl.getTotal = function () {
        var total = 0;
        for (var i = 0; i < 10; i++) {
            var data = localStorage.getItem('data' + i);
            data = JSON.parse(data);
            if (data) {
                for (var j = 0; j < 20; j++) {
                    if (data[j]) {
                        total++;
                    }
                }
            }
        }
        return total;
    }

    ctrl.$onInit = function () {
        ctrl.data = JSON.stringify(localStorage.getItem('data' + 0));
        InvitadosService.init(ctrl);
        InvitadosService.drawTable();
    }

    ctrl.reloadSavedData = function (x) {
        currentTableNumber = x;
        var data = localStorage.getItem('data' + x);
        var form = document.getElementById('form');
        var inputs = form.getElementsByTagName('input');
        var length = inputs.length;
        var mesa = document.getElementById('mesa');
        mesa.value = '';
        for (var i = 0; i < length; i++) {
            inputs[i].value = '';
        }
        if (data) {
            data = JSON.parse(data);
            for (var i = 0; i < 20; i++) {
                if (data[i]) {
                    inputs[i].value = data[i];
                }
            }
            if (data['nombreMesa']) {
                mesa.value = data['nombreMesa'];
            }
        }
    }

    ctrl.save = function () {
        var form = document.getElementById('form');
        var inputs = form.getElementsByTagName('input');
        var length = inputs.length;
        var data = {};
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            var value = input.value;
            if (value) {
                data[i] = value;
            }
        }
        var mesa = document.getElementById('mesa');
        var nombreMesa = mesa.value;
        if (nombreMesa) {
            data['nombreMesa'] = nombreMesa;
        }
        localStorage.setItem('data' + currentTableNumber, JSON.stringify(data));
    }

});