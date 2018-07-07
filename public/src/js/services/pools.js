'use strict';

angular.module('insight.pool')
    .factory('PoolChart', function(gettextCatalog, $filter) {

        function PoolChart(date) {

            this.date = date;
            this.chartOptions = {
                series : ['Test'],
                data: [],
				labels: ['Test1'],
				datasetOverride : [],

                options : {
                    plugins: {
                      stacked100: { enable: true, replaceTooltipLabel: true }
                    },
					tooltips:{
						mode: 'dataset',
						intersect: true,
                        backgroundColor: '#012d88',
                        titleFontFamily: 'Ubuntu,sans-serif',
                        titleFontSize: 12,
                        titleFontStyle: '500',
                        titleFontColor: '#ffffff',
                        bodyFontFamily: 'Ubuntu,sans-serif',
                        bodyFontSize: 12,
                        bodyFontStyle: '400',
                        bodyFontColor: '#ffffff',
                        caretSize: 5,
                        cornerRadius: 3,
                        displayColors: false,
                        callbacks: { }
                    },
                    layout: {
                        padding: {
                            left: 5
                        }
                    },
					legend: {
						display: false,
						position: 'bottom',
						labels: {
							    fontColor: '#4700cc',
                                fontFamily: 'Ubuntu,sans-serif'
						}
					},
					hover: {
						mode: 'single'
					},
					scales: {
							xAxes: [{
								display: false,
								stacked: true,
								gridLines: {
									display:false,
									drawBorder: false
								}
							}],
							yAxes: [{
								display: false,
								stacked: true,
								gridLines: {
									display:false,
									drawBorder: false
								}
							}]
						}
                }
            };

            //this.chartStats = [];

        }

        PoolChart.prototype.load = function (factory, itemField, itemName) {
            var self = this;

            factory.get({
                date: self.date
            }, function(response){

				var array = response.blocks_by_pool

				self.chartOptions.labels = [  ];

				self.chartOptions.blocks = response.n_blocks_mined

                self.chartOptions.data = array.map(function(item) {

				return [item[ itemField ]];

                });
				self.chartOptions.datasetOverride = array.map(function(item) {
				var pallette;
				function getRandomColor() {
					var letters = '0123456789ABCDEF'.split('');
					var color = '#';
					for (var i = 0; i < 6; i++ ) {
						color += letters[Math.floor(Math.random() * 16)];
					}
					return color;
				}
				pallete = getRandomColor();
				return {
						label: item.poolName,
						data: [ item[ itemField ] ],
						hoverBorderColor: "#012d88",
						hoverBackgroundColor: pallete,
						backgroundColor: pallete + 'bd',
						borderColor: pallete,
						borderWidth: 2


					};
                });
                self.chartOptions.series = [ itemName ];
                //self.chartStats = response.blocks_by_pool;

            });

        };

        return PoolChart;

});
