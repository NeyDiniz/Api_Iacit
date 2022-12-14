(function($) {
	"use strict";

	// Spinner
	var spinner = function() {
		setTimeout(function() {
			if ($("#spinner").length > 0) {
				$("#spinner").removeClass("show");
			}
		}, 1);
	};
	spinner();

	// Calender
	$("#calender").datetimepicker({
		inline: true,
		format: "L",
	});

	// Calender
	$("#calender2").datetimepicker({
		inline: true,
		format: "L",
	});
})(jQuery);

function lista() { }

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
	var data = google.visualization.arrayToDataTable([
		["Element", "Density", { role: "style" }],
		["Temp Bulbo Seco", 20.94, "#b87333"],
		["Temp Max", 10.49, "silver"],
		["Temp Min", 19.3, "gold"],
	]);

	var view = new google.visualization.DataView(data);
	view.setColumns([
		0,
		1,
		{
			calc: "stringify",
			sourceColumn: 1,
			type: "string",
			role: "annotation",
		},
		2,
	]);

	var options = {
		title: "Temperatura",
		width: 600,
		height: 400,
		bar: { groupWidth: "95%" },
		legend: { position: "none" },
	};

	var chart = new google.visualization.ColumnChart(
		document.getElementById("columnchart_values")
	);
	chart.draw(view, options);
}

var getData1 = function() {
	var dataHoje = new Date();
	dataHoje.setMinutes(dataHoje.getMinutes() - dataHoje.getTimezoneOffset());
	var input = $("#dataInicio").val();

	/*  if ($("#dataHorarioAcordado").hasClass("d-none")) return null;
	  if (input == "" || input == " ") return "vazio";  */

	var dataInput = new Date(Date.parse(input));
	dataInput.setMinutes(dataInput.getMinutes() - dataInput.getTimezoneOffset());
	if (dataHoje >= dataInput) {
		return "erro";
	}

	return dataInput;
};

$(document).ready(function() {
	$(document).on("click", "#btnEnviarDados", function() {
		//debugger;

		// Valores da data de inico e fim que foram inseridas nas entradas de data.
		var vDataInicio = $("#dataInicio").val();
		var vDataFim = $("#dataFim").val();
		var vDadoDesejado = "";
		debugger;

		$.post(
			"/filtrar/vDadoDesejado",
			//corpo da requisi????o <body> == {}
			JSON.stringify({ dataInicio: vDataInicio, dataFinal: vDataFim }),
			function(data) {
				if (data[0].status == 0) {
					debugger;
					window.location.href = "/index";
				} else {
					debugger;
					sessionStorage.setItem("userNameADM", data[0].userName);

					window.location.href = "/temperatura";
				}
			},
			"json"
		);
	});


	var OnClickLeo = function() {
		$("#relatorio").click(function() {
			debugger

			$.getJSON({
				url: "/testeIndex",
				success: function(data) {
					//KTApp.unblockPage();


					if (data.resultado == "OK") {
						debugger
						window.location.reload("/testeIndex");
					}
					if (data.resultado == "ERROR") {
						debugger
						Swal.fire(
							'Erro!',
							'Houve um erro ao se comunicar com o servido, tente novamente mais tarde.',
							'error'
						);
					}
				}
			})

		});
	}


	OnClickLeo();


})

/*
 $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/search",
        data: JSON.stringify(search),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {

            var json = "<h4>Ajax Response</h4><pre>"
                + JSON.stringify(data, null, 4) + "</pre>";
            $('#feedback').html(json);

            console.log("SUCCESS : ", data);
            $("#btn-search").prop("disabled", false);

        },
        error: function (e) {

            var json = "<h4>Ajax Response</h4><pre>"
                + e.responseText + "</pre>";
            $('#feedback').html(json);

            console.log("ERROR : ", e);
            $("#btn-search").prop("disabled", false);

        }
    });
*/