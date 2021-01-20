import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import * as echarts from 'echarts';

import { devDataConfig } from 'src/assets/config/config';
import { mapDataConfig } from 'src/assets/config/mapData';

@Component({
  selector: 'app-map-rank',
  templateUrl: './map-rank.component.html',
  styleUrls: ['./map-rank.component.less']
})
export class MapRankComponent implements OnInit {

  timerRank: Subscription | undefined;

  dataType = devDataConfig.dataType.value;
  @ViewChild('bar') box: any;

  constructor(
    // private witonScreenService: WitonScreenService
  ) { }

  ngOnInit() {
    this.timerRank = timer(0, 300 * 1000).subscribe(() => this.init()); // 5分钟执行一次
    console.log('地图数据配置：', this.dataType);
  }

  private init() {
    if (this.dataType === '1') {
      console.log('this.box.nativeElement:', this.box.nativeElement)
      this.configBar(mapDataConfig.rank.name, mapDataConfig.rank.value);
    } else {
      this.getRankList();
    }
  }

  // 获取业务数据
  private getRankList() {
    // this.witonScreenService.getRankList().subscribe(
    //   res => {
    //     if (res) {
    //       let hospitalName = [];
    //       let hospitalCnt = [];
    //       res.forEach(element => {
    //         hospitalName.push(element.hospitalName);
    //         hospitalCnt.push(element.cnt);
    //       });
    //       hospitalCnt = hospitalCnt.reverse();
    //       hospitalName = hospitalName.reverse();
    //       this.configBar(hospitalName, hospitalCnt);
    //     }
    //   }
    // );
  }

  // 配置进度条参数
  private configBar(names: any, values: any) {
    // document.getElementById('bar') 
    const myChart = echarts.init(this.box.nativeElement );
    const option = {
      backgroundColor: '',
      title: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
        },
      },
      legend: {},
      grid: {
        left: '1%',
        right: '4%',
        containLabel: true,
        width: '87%', // 宽度
        height: '90%', // 高度
        y: '2%'
      },
      xAxis: {
        type: 'value',

        show: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'category',
        data: names,
        show: true,
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
          padding: [0, 10, 0, 0], // 上右下左
        },
        // y轴的颜色和宽度
        axisLine: {
          lineStyle: {
            color: 'transparent',
            width: 0, // 这里是坐标轴的宽度
          },
        },
      },
      series: [
        {
          name: '',
          type: 'bar',
          data: values,
          barWidth: 20,
          itemStyle: {
            normal: {
              label: {
                formatter: function(params: { value: any; }) { // 标签内容
                  return   (params.value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '人/次';
                },
                show: true,
                position: 'top',
                textStyle: {
                  fontSize: 14,
                  fontFamily: '微软雅黑',
                  color: '#fefefe',
                },
              },

              barBorderRadius: 2,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#39e8f8',
                },
                {
                  offset: 1,
                  color: '#6e97f4',
                },
              ]),
            },
          },
        },
      ],
    }; // option

    console.log(option);
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

  }

  ngOnDestroy() {
    // 销毁计时器
    if (this.timerRank) {
        this.timerRank.unsubscribe();
    }
  }

}
