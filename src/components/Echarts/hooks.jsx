import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

let fIndex = 1;
export const useFormatter = () => {
  const parent = useRef(null);
  const id = useRef(fIndex++).current;
  useEffect(() => {
    // 在body下创建一个div
    let div = document.querySelector(`div[formatter-id='${id}']`);
    if (!div) {
      div = document.createElement('div');
      div.setAttribute('formatter-id', id);
      div.style.display = 'none';
      document.body.appendChild(div);
      parent.current = div;
    }
    return () => {
      div && document.body.removeChild(div);
    };
  }, []);
  // 渲染formatter
  const render = component => {
    return (...e) => {
      const Component =
        typeof component === 'function'
          ? component(e)
          : React.cloneElement(component, e);
      ReactDOM.render(Component, parent.current);
      return parent.current.innerHTML;
    };
  };
  return render;
};
