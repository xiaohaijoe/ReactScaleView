import React from 'react';
import styles from './Introduction.module.less';
const BriefItem = props => {
  return (
    <div className={styles.briefItem}>
      <div className={styles.top}>
        <div className={styles.title}>{props.title}</div>
        <img
          className={styles.icon}
          src={require(`@stories/assets/${props.icon}`)}
          alt=""
        />
      </div>
      <div className={styles.bottom}>{props.subTitle}</div>
    </div>
  );
};
export const Brief = () => {
  const list = [
    {
      title: '全局样式',
      subTitle: '色彩、字体、图标、基因',
      icon: 'ic_introduction_1.svg',
    },
    {
      title: '数据看板',
      subTitle: '图表、自定义数据模块',
      icon: 'ic_introduction_2.svg',
    },
    {
      title: '表格',
      subTitle: '详情页大表格、弹窗小表格',
      icon: 'ic_introduction_3.svg',
    },
    {
      title: '导航',
      subTitle: '菜单栏、一、二级导航',
      icon: 'ic_introduction_4.svg',
    },
    {
      title: '弹窗',
      subTitle: '地图弹窗、常规信息弹窗',
      icon: 'ic_introduction_5.svg',
    },
    {
      title: '控件',
      subTitle: '操作、筛选、录入、切换',
      icon: 'ic_introduction_6.svg',
    },
  ];
  return (
    <div className={styles.brief}>
      {list.map((item, index) => (
        <BriefItem key={index} {...item}></BriefItem>
      ))}
    </div>
  );
};
