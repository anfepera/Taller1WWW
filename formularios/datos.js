 // Load the Visualization API and the piechart package.
      google.load('visualization', '1', {packages:['piechart']});
      
      // Set a callback to run when the API is loaded.
      google.setOnLoadCallback(drawChart);
      
      // Callback that creates and populates a data table, 
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {
        var data = new google.visualization.DataTable();
	// Datos de la tabla de dos columnas       
	// Declarar las fila y columnas
        data.addColumn('string', 'Prestador'); // campo de tipo string y etiqueta Prestador Servicio
        data.addColumn('number', 'Total');
        data.addRows(3);
	//Los datos
        data.setValue(0, 0, 'Entre 601 y 2500'); // Row 0, column 0
        data.setValue(0, 1, 6);     // Row 0, column 1
        
	      data.setValue(1, 0, 'Entre 100 y 600');  // Row 1, column 0
	      data.setValue(1, 1, 2);

        data.setValue(2, 0, 'Menores de 100');
	      data.setValue(2, 1, 4);

        var chart = new google.visualization.PieChart(document.getElementById('result'));
        chart.draw(data, {width: 350, height: 175, is3D: true, title: 'Resultados'});
      }