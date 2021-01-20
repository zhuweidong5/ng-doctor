import geoCoordMap from './map-config';
export default class ChartOption {
  private option = {
    backgroundColor: 'rgba(0,14,46, 0)',
    itemStyle: {
      // 定义样式
      normal: {
        // 普通状态下的样式
        areaColor: '#02eaff',
        borderColor: '#111',
      },
      emphasis: {
        // 高亮状态下的样式
        areaColor: '#02eaff',
      },
    },
    title: {},
    tooltip: {
      trigger: 'item',
      formatter: function (params: { name: string; value: string[]; }) {
        return params.name + ' : ' + params.value[2];
      },
    },
    legend: {
      orient: 'horizontal',
      top: 'bottom',
      data: ['互联网医院', '智慧医院', '在线咨询'],
      textStyle: {
        color: '#fff',
        fontSize: 24,
      },
      margin: [100, 0, 0, 0 ],
    },
    geo: {
      map: 'china',
      zoom: 1.15,
      // roam: true,
      // scaleLimit: { // 滚轮缩放的极限控制
      //   min: 1,
      //   max: 2
      // },
      itemStyle: {
        areaColor: 'rgba(20, 41, 87, 0)',
        borderColor: 'rgba(0, 156, 176, 0.8)',
        borderWidth: 1,
      },
      emphasis: {
        label: {
          show: false,
        },
      },
    },
    series: [
      {
        name: '互联网医院',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        label: {
          formatter: '{b}',
          position: 'right',
          show: false,
        },
        data: [],

        symbolSize: function (val: number[]) {
          return val[2] / 10;
        },
        showEffectOn: 'render',
        hoverAnimation: true,
        itemStyle: {
          normal: {
            color: '#ffff0b',
            borderType: 'dashed',
          },
          borderColor: 'rgba(0, 156, 176)',
          borderWidth: 1,
          borderType: 'dashed',
        },
        zlevel: 2
      },
      {
        name: '智慧医院',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        encode: {
          value: 2,
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: false,
        },
        data: [],
        symbolSize: function (val: number[]) {
          return val[2] / 30;
        },
        showEffectOn: 'render',
        hoverAnimation: true,
        itemStyle: {
          color: '#02eaff',
          shadowBlur: 10,
          shadowColor: '#FFFFFF',
        },
      },
      {
        name: '在线咨询',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        encode: {
          value: 2,
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: false,
        },
        data: [],
        symbolSize: function (val: number[]) {
          return val[2] / 30;
        },
        showEffectOn: 'render',
        hoverAnimation: true,
        itemStyle: {
          color: '#fc9a00',
          shadowBlur: 10,
          shadowColor: '#FFFFFF',
        },
      },
    ],
    //   series : [
    //     {
    //         name: 'pm2.5',
    //         type: 'scatter',
    //         coordinateSystem: 'bmap',
    //         data: [],
    //         symbolSize: function (val) {
    //             return val[2] / 20;
    //         },
    //         encode: {
    //             value: 2
    //         },
    //         label: {
    //             formatter: '{b}',
    //             position: 'right',
    //             show: false
    //         },
    //         itemStyle: {
    //             color: '#02eaff',
    //             shadowBlur: 10,
    //             shadowColor: '#FFFFFF'
    //         },
    //         emphasis: {
    //             label: {
    //                 show: true
    //             }
    //         }
    //     },
    //     {
    //         name: 'Top 5',
    //         type: 'effectScatter',
    //         coordinateSystem: 'bmap',
    //         data: [],
    //         symbolSize: function (val) {
    //              return val[2] / 30;
    //         }
    //         encode: {
    //             value: 2
    //         },
    //         showEffectOn: 'render',
    //         rippleEffect: {
    //             brushType: 'stroke'
    //         },
    //         hoverAnimation: true,
    //         label: {
    //             formatter: '{b}',
    //             position: 'right',
    //             show: true
    //         },
    //         itemStyle: {
    //             color: '#ffff0b',
    //             shadowBlur: 10,
    //             shadowColor: '#FFFFFF'
    //         },
    //         zlevel: 1
    //     }
    // ]
  };

  // dataList 数组对象 对应 series 个数
  constructor(dataList: Array<any>) {
    dataList.forEach((item, index) => {
      this.option.series[index].data = item;
    });
  }

  // 匹配城市坐标
  convertData(data: string | any[]) {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
        });
      }
    }
    return res;
  }
}

// convertData(data.sort(function (a, b) {
//   return b.value - a.value;
// }).slice(0, 6)),
// symbolSize: function (val) {
//   return val[2] / 30;
// }
