function optionToContent (opt) {
  var axisData = opt.xAxis[0].data
  var series = opt.series
  var table = '<table class="el-table">'
        + '<thead class="is-group"><tr>'
        + '<th><div class="cell">日期</div></th>'
        + '<th><div class="cell">' + series[0].name + '</div></th>'
        + '<th><div class="cell">' + series[1].name + '</div></th>'
        + '<th><div class="cell">' + series[2].name + '</div></th>'
        + '<th><div class="cell">' + series[3].name + '</div></th>'
        + '<th><div class="cell">' + series[4].name + '</div></th>'
        + '</tr></thead><tbody>'
  for (var i = 0, l = axisData.length; i < l; i++) {
    table += '<tr class="el-table__row">'
            + '<td><div class="cell">' + axisData[i] + '</div></td>'
            + '<td><div class="cell">' + series[0].data[i] + '</div></td>'
            + '<td><div class="cell">' + series[1].data[i] + '</div></td>'
            + '<td><div class="cell">' + series[2].data[i] + '</div></td>'
            + '<td><div class="cell">' + series[3].data[i] + '</div></td>'
            + '<td><div class="cell">' + series[4].data[i] + '</div></td>'
            + '</tr>'
  }
  table += '</tbody></table>'
  return table
};
export default function TestingOption(dataobj) {
  var legends = []
  var series1 = []
  var series2 = []
  var series3 = []
  var series4 = []
  var series5 = []
  for (var index = 0; index < dataobj.length; index++) {
    legends.push(dataobj[index].date) // x 轴
    series1.push(dataobj[index].empty) // 空号数据
    series2.push(dataobj[index].real) // 实号数据
    series3.push(dataobj[index].silence) // 沉默数据
    series4.push(dataobj[index].shut)  // 风险数据
    series5.push(dataobj[index].total)  // 总数据
  };
  return {
    title: {
      top: '10',
      text: '检测包数据'
    },
    tooltip: {
      trigger: 'axis'
    },
    color: ['#4992ff', '#f6b37f', '#A2A2A0', '#ff0000', '#67C23A'],
    legend: {
      top: '10',
      data: ['实号包', '沉默包', '空号包', '风险包', '总条数']
    },
    toolbox: {
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: true, optionToContent: optionToContent },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    grid: {
      top: '60',
      left: '30',
      right: '30',
      bottom: '30',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: legends
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '实号包',
        type: 'line',
        data: series2
      },
      {
        name: '沉默包',
        type: 'line',
        data: series3
      },
      {
        name: '空号包',
        type: 'line',
        data: series1
      },
      {
        name: '风险包',
        type: 'line',
        data: series4
      },
      {
        name: '总条数',
        type: 'line',
        data: series5
      }
    ]
  }
}