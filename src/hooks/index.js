import { useContext, useEffect, useRef } from 'react';
// import { autorun, reaction } from 'mobx';
// import { MobXProviderContext, useObserver } from 'mobx-react';

// import { getDisplayName } from '@/utils';

// export default function useStores() {
//   const store = useContext(MobXProviderContext);
//   if (!store) {
//     // this is especially useful in TypeScript so you don't need to be checking for null all the time
//     throw new Error('You have forgot to use StoreProvider.');
//   }
//   return store;
// }

// export function withInject(selector) {
//   return function wrappedComponent(baseComponent) {
//     const baseComponentName = `WithInject(${getDisplayName(baseComponent)})`;

//     const Component = props => {
//       const store = useStores();
//       return useObserver(
//         () => baseComponent(selector({ store, props })),
//         baseComponentName
//       );
//     };

//     Component.displayName = baseComponentName;
//     return Component;
//   };
// }

// export function useRender(renderingFn) {
//   return renderingFn();
// }

// /* eslint-disable react-hooks/exhaustive-deps */
// export function useAutorun(effectFn) {
//   useEffect(() => {
//     return autorun(effectFn);
//   }, []);
// }

// export function useReaction(dataFn, effectFn) {
//   useEffect(() => {
//     return reaction(dataFn, effectFn);
//   }, []);
// }
/* eslint-enable react-hooks/exhaustive-deps */

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
