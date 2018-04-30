var app = angular.module('invitadosApp');

app.service('InvitadosService', function () {
    var self = this;

    var height = 180;
    var width = 320;
    var radius = 15;
    var distance = 40;

    var lastCircleSelected;
    var currentTableNumber;

    var jsonCircles = [
        { "x_axis": 25, "y_axis": 25 },
        { "x_axis": 25, "y_axis": 25 + distance * 1 },
        { "x_axis": 25, "y_axis": 25 + distance * 2 },
        { "x_axis": 25, "y_axis": 25 + distance * 3 },
        { "x_axis": 75, "y_axis": 25 + distance * 3 },
        { "x_axis": 240, "y_axis": 25 + distance * 3 },
        { "x_axis": 290, "y_axis": 25 },
        { "x_axis": 290, "y_axis": 25 + distance * 1 },
        { "x_axis": 290, "y_axis": 25 + distance * 2 },
        { "x_axis": 290, "y_axis": 25 + distance * 3 },
    ];

    function reloadSavedData(x) {
        console.log(x);
        var data = localStorage.getItem('data' + x);
        var form = document.getElementById('form');
        var inputs = form.getElementsByTagName('input');
        var length = inputs.length;
        for (var i = 0; i < length; i++) {
            inputs[i].value = '';
        }
        if (data) {
            data = JSON.parse(data);
            for (var prop in data) {
                if (data[prop]) {
                    inputs[parseInt(prop)].value = data[prop];
                }
            }
        }
    };

    function save() {
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
        localStorage.setItem('data' + currentTableNumber, JSON.stringify(data));
    }

    self.drawTable = function () {
        var svgContainer = d3.select("#svg").append("svg");
        svgContainer
            .attr("width", width)
            .attr("height", height);
        svgContainer.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "gray");
        svgContainer.append("text")
            .attr('x', 110)
            .attr('y', 25)
            .attr('font-size', "20px")
            .attr('fill', "black")
            .text(function () {
                return 'Mesa Principal';
            })
        var circles = svgContainer
            .selectAll('circles')
            .data(jsonCircles)
            .enter()
            .append('circle');
        circles.on('click', function (d, i) {
            currentTableNumber = i;
            reloadSavedData(i);
            circles.style('fill', 'blue');
            var circle = d3.select(circles[0][i]);
            lastCircleSelected = circle;
            circle.style('fill', 'green');
        });
        var circlesAttributes = circles
            .attr('cx', function (d) {
                return d.x_axis;
            })
            .attr('cy', function (d) {
                return d.y_axis;
            })
            .attr('r', radius)
            .style('fill', 'blue');
    }

});