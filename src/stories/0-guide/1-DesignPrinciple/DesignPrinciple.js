import React from 'react';
import styles from './DesignPrinciple.module.less';

export const Brief = () => {
  const list = [
    {
      title: '一致性  Consistency',
      list: [
        [
          '与现实生活一致：',
          '与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',
        ],
        [
          '在界面中一致：',
          '所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。',
        ],
      ],
    },
    {
      title: '反馈  Feedback',
      list: [
        [
          '控制反馈：',
          '通过界面样式和交互动效让用户可以清晰的感知自己的操作；',
        ],
        ['页面反馈：', '作后，通过页面元素的变化清晰地展现当前状态。'],
      ],
    },
    {
      title: '效率  Efficiency',
      list: [
        ['简化流程：', '设计简洁直观的操作流程；'],
        ['清晰明确：', '语言表达清晰且表意明确，让用户快速理解进而作出决策；'],
        [
          '帮助用户识别：',
          '界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。',
        ],
      ],
    },
    {
      title: '可控  Controllability',
      list: [
        [
          '用户决策：',
          '根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；',
        ],
        [
          '结果可控：',
          '用户可以自由的进行操作，包括撤销、回退和终止当前操作等。',
        ],
      ],
    },
  ];
  return (
    <div className={styles.brief}>
      {list.map((item, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.title}>{item.title}</div>
          <div className={styles.children}>
            {item.list.map((it, ix) => (
              <div className={styles.child} key={ix}>
                <span className={styles.childTitle}>{it[0]}</span>
                <span className={styles.childText}>{it[1]}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
