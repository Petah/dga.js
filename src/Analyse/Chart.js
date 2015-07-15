var Chart = function() {
};

Chart.prototype.chartData = function(data) {
    $('<div>').addClass('chart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Data'
        },
        xAxis: {
            title: {
                text: 'Byte'
            },
        },
        yAxis: {
            title: {
                text: 'Value'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        plotOptions: {
            series: {
                animation: false
            }
        },
        series: [
            {
                name: 'Data Set',
                data: data,
            },
        ],
    }).appendTo('body');

    var height = 100 / $('.chart').length;
    $('.chart').each(function() {
        $(this).css('height', height + '%');
    });

    $(window).trigger('resize');
};

