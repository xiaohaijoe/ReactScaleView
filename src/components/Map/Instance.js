import React, { useEffect, useRef } from 'react';
import ReactDom from 'react-dom';

const Instance = props => {
  const pNode = useRef(null);
  const renderNode = useRef(null);

  const el = document.querySelector(`div[map-id='${props.mapId}']`);
  if (!el) {
    // 在body下创建父节点
    pNode.current = document.createElement('div');
    pNode.current.setAttribute('map-id', props.mapId);
    pNode.current.setAttribute('style', 'display:none');
    document.body.appendChild(pNode.current);
  } else {
    // 赋值父节点
    pNode.current = el;
  }
  useEffect(() => {
    const node = renderNode.current;
    const el = pNode.current;
    const moveNodes = (pNode, nodes) => {
      while (nodes.length > 0) {
        pNode.appendChild(nodes[0]);
      }
    };
    // 判断body下是否有该组件，如果有则将body下的组件挪过来，如果没有则创建
    if (el.childNodes && el.childNodes.length > 0) {
      moveNodes(renderNode.current, el.childNodes);
    } else {
      ReactDom.render(props.children, renderNode.current);
    }

    const timer = setTimeout(() => {
      props.mount && props.mount();
    }, 0);

    return () => {
      // 将children移到body下
      moveNodes(pNode.current, node.childNodes);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span ref={renderNode}></span>;
};

export default Instance;
