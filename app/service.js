var app = angular.module('invitadosApp');

app.service('InvitadosService', function () {
    var self = this;

    var height = 180;
    var width = 320;
    var radius = 15;
    var distance = 40;

    var lastCircleSelected;

    var texts;

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

    self.init = function (ctrl) {
        self.ctrl = ctrl;
    }

    self.updateTexts = function (invitedByTable) {
        texts.data(invitedByTable)
            .text(function (d) {
                return d;
            })
    }

    self.drawTable = function (invitedByTable) {
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
        texts = svgContainer
            .selectAll('texts')
            .data(jsonCircles)
            .enter()
            .append('text')
            .attr('x', function (d, i) {
                return d.x_axis - 5;
            })
            .attr('y', function (d, i) {
                return d.y_axis + 5;
            })
            .attr('font-size', "20px")
            .attr('fill', "black")
            .text(function (d, i) {
                return invitedByTable[i];
            })
        var clickHandler = function (d, i) {
            self.ctrl.reloadSavedData(i);
            circles.style('fill', 'blue');
            var circle = d3.select(circles[0][i]);
            lastCircleSelected = circle;
            circle.style('fill', 'green');
        }
        texts.on('click', clickHandler);
        circles.on('click', clickHandler);
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