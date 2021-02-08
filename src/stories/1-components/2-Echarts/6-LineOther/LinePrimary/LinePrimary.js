import React, { useEffect, useRef, useState } from 'react';
import Echarts from 'echarts';
import { Line, deepMerge } from '@src/components/common/Echarts';
const { Default } = Line;

// 自定义主题一
const PrimaryLine = React.forwardRef(
  (
    {
      xAxis,
      yAxis,
      series,
      legend,
      tooltip,
      lineSource,
      barSource,
      ...restProps
    },
    ref
  ) => {
    const chartRef = useRef(null);

    const [mXAxis, setXAxis] = useState({});
    const [mYAxis, setYAxis] = useState([]);
    const color = useRef([
      '#3a70ff',
      '#02c1f0',
      '#68d751',
      '#ffc330',
      '#ff8d57',
      '#ff4d4f',
    ]).current;
    const [mSeries, setSeries] = useState([]);
    const [mLegend, setLegend] = useState({});
    const [mTooltip, setTooltip] = useState({});
    useEffect(() => {
      if (ref) {
        ref.current = chartRef.current;
      }
      // 设置横坐标样式
      setXAxis(
        deepMerge(
          {
            type: 'category',
            boundaryGap: true,
            axisTick: { show: false },
            //坐标轴线
            axisLine: { show: false },
            //x轴文本设置
            axisLabel: {
              color: 'rgba(221,234,255,0.5)',
              fontSize: 12,
              align: 'center',
              padding: [0, 0, 0, 0],
            },
          },
          xAxis
        )
      );
      // 设置纵坐标样式
      setYAxis(
        deepMerge(
          [
            {
              type: 'value',
              name: '',
              nameTextStyle: {
                height: 10,
                color: 'rgba(221,234,255,0.5)',
                align: 'left',
                fontSize: 12,
                padding: [0, 0, 0, 0],
              },
              boundaryGap: true,
              axisTick: { show: false },
              axisLine: { show: false },

              axisLabel: {
                color: 'rgba(221,234,255,0.5)',
                margin: 10,
                fontSize: 12,
              },
              splitLine: {
                lineStyle: {
                  color: '#1B2A43',
                },
              },
              axisPointer: { snap: true },
              min: 0,
              splitNumber: 5,
            },
            {
              // 右坐标轴默认不展示
              show: false,
              type: 'value',
              name: '',
              nameTextStyle: {
                height: 10,
                color: '#A4BAE3',
                align: 'right',
                fontSize: 12,
                padding: [0, 0, 0, 0],
              },
              boundaryGap: true,
              splitLine: { show: false },
              axisTick: { show: false },
              axisLine: { show: false },
              axisLabel: {
                color: '#A4BAE3',
                margin: 10,
                fontSize: 12,
              },
              axisPointer: { snap: true },
              min: 0,
              splitNumber: 5,
            },
          ],
          yAxis
        )
      );
      setLegend(
        deepMerge(
          {
            show: false,
            top: 10,
            left: 'center',
            icon: 'circle',
            textStyle: {
              color: '#DDEAFF',
              fontSize: 12,
              padding: [3, 0, 0, 0],
            },
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 10,
          },
          legend
        )
      );
      setTooltip(
        deepMerge(
          {
            trigger: 'axis',
            padding: 10,
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          tooltip
        )
      );
      let lineLength = 0; // 折线图长度
      let lineSeries = []; // 折线图系列
      let barSeries = []; // 柱状图系列
      let mergeSeries = [];
      // 设置每个系列的样式
      if (lineSource && lineSource.length > 0) {
        lineLength = lineSource.length;
        lineSeries = lineSource.map((n, i) => {
          return {
            name:
              legend && legend.data ? legend.data[i % legend.data.length] : '',
            showSymbol: false, //刚开始不显示拐点，鼠标移入显示
            areaStyle: {
              color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0.3,
                  color: color[i % color.length],
                },
                {
                  offset: 1,
                  color: 'rgba(0,0,0,0)',
                },
              ]),
            },
          };
        });
        mergeSeries = [...lineSeries];
      }
      // 设置每个系列的样式
      if (barSource && barSource.length > 0) {
        barSeries = barSource.map((n, i) => {
          return {
            name:
              legend && legend.data
                ? legend.data[(lineLength + i) % legend.data.length]
                : '',
          };
        });
        mergeSeries = [...mergeSeries, ...barSeries];
      }
      setSeries(deepMerge(mergeSeries, series));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      chartRef,
      ref,
      xAxis,
      yAxis,
      series,
      legend,
      tooltip,
      lineSource,
      barSource,
    ]);

    return (
      <Default
        xAxis={mXAxis}
        yAxis={mYAxis}
        color={color}
        series={mSeries}
        legend={mLegend}
        tooltip={mTooltip}
        lineSource={lineSource}
        barSource={barSource}
        {...restProps}
      />
    );
  }
);

export default PrimaryLine;
