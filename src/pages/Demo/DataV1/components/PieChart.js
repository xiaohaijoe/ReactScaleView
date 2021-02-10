import React from 'react';
import { Pie, useFormatter } from '@/components/Echarts';

// const Formatter = props => {
//   console.log(props);
//   return <></>;
// };
const Component = props => {
  const formatter = useFormatter();
  return (
    <>
      <div>default主题：默认样式</div>
      <div>
        <Pie.Default
          pieSource={[
            [
              {
                name: '画个饼1',
                value: 1,
              },
              {
                name: '画个饼2',
                value: 2,
              },
              {
                name: '画个饼3',
                value: 3,
              },
              {
                name: '画个饼4',
                value: 4,
              },
            ],
          ]}
          tooltip={{
            show: true,
            // formatter: formatter(<Formatter></Formatter>), // 也支持
            formatter: formatter(e => (
              <>
                <span>
                  {e[0].data.name}: {e[0].data.value}
                </span>
              </>
            )),
          }}
        ></Pie.Default>
      </div>
    </>
  );
};

export default Component;
