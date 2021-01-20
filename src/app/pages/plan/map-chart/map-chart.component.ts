import { Component, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
// import { WitonScreenService } from '../services/witon-screen.service';
import ChartOption from './chart-option';

@Component({
  selector: 'app-map-chart',
  templateUrl: './map-chart.component.html',
  styleUrls: ['./map-chart.component.less']
})
export class MapChartComponent implements OnInit {
  @ViewChild('main') box: any;
  data_1 = [
    {name: '鄂尔多斯', value: 12},
  ];

  data_2 = [
    {name: '韶关', value: 38},
    {name: '嘉峪关', value: 38},
    {name: '广州', value: 38},
    {name: '延安', value: 38},
    {name: '太原', value: 39},
    {name: '清远', value: 39},
    {name: '中山', value: 39},
    {name: '昆明', value: 39},
    {name: '上海仁济', value: 12},
    {name: '上海同济', value: 12}

  ];

  constructor(
    // private witonScreenService: WitonScreenService
  ) { }

  ngOnInit() {

    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(this.box.nativeElement);
    // this.witonScreenService.getMapDataList().subscribe(
    //   res => {
        // 绘制图表
        let res: any[] = [];
        const chartOption: any = new ChartOption(res);
        myChart.setOption( chartOption.option );
      }
    // );

    // myChart.on('legendselectchanged', function(obj: { selected: any; name: any; }) {
    //   const {selected, name} = obj;
    //   console.log(obj);
    // });


}
