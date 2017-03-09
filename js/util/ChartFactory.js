function SemanaChartFactory(){
  this.data = {};
  this.typeOfChart = "BarChart";
  this.title = "";


  this.setTitle = function(title)
  {
    this.title = title;
  };

  this.create  = function()
  {
    var chart  = {};
    chart.data = this.data;
    chart.type = this.typeOfChart;
    chart.options = {
      title: this.title
    };
    return chart;
  };

  function sortDiasSemana(semana1, semana2)
  {
    return semana1.numeroDia - semana2.numeroDia;
  };

  this.setData = function(semanaObject)
  {

    var diasSemana = ['Domingo','Segunda', 'Terça', 'Quarta',
      'Quinta', 'Sexta', 'Sábado'];

    this.data = {};
    this.data.cols = [{
        id: "dia",
        label: "Dias da Semana",
        type: "string"
      },
      {
        id: "horas",
        label: "Total de Horas",
        type: "number"
      }
    ];

    this.data.rows = [];
    var rows = this.data.rows;
    for(dia of diasSemana)
    {
      var object = { c: [{ v: dia}, { v: 0 }] };
      rows.push(object);
    }

    for (dia of semanaObject)
    {
        var numeroDia = dia.numeroDia;
        var nomeDoDia = diasSemana[numeroDia];
        var horasDia  = dia.horasDia;
        rows[numeroDia].c[1].v = horasDia;
    }
  };

}
