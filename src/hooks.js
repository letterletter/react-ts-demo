import { useReducer, useContext, useRef, useEffect, useState } from 'react';
import { Ctx, InnerCtx, PropsCtx } from './context';

// 使用最顶层组件的 setState
export const useGlobal = () => {
  return useContext(Ctx);
};

export const useGlobalProps = () => {
  return useContext(PropsCtx);
};

export const useStore = () => {
  return useContext(InnerCtx);
};

// const logger = reducer => {
//   const reducerWithLogger = (state, action, actionName = 'Action') => {
//     console.group(actionName);
//     console.log('%cState:', 'color: #9E9E9E; font-weight: 500;', state);
//     console.log('%cAction:', 'color: #00A7F7; font-weight: 500;', action);
//     console.log('%cNext:', 'color: #47B04B; font-weight: 500;', {
//       ...state,
//       ...action,
//     });
//     console.groupEnd();
//     return reducer(state, action);
//   };
//   return reducerWithLogger;
// };

// export default logger;

// 类似于class component的setState
export const useSet = initState => {
  const [state, setState] = useReducer((state, newState) => {
    let action = newState;
    if (typeof newState === 'function') {
      action = action(state);
    }
    if (newState.action && newState.payload) {
      action = newState.payload;
      if (typeof action === 'function') {
        action = action(state);
      }
    }
    const result = { ...state, ...action };
    // if (newState.action !== 'no-log') {
    //   console.group(newState.action || 'action'); // TODO: give it a name
    //   console.log('%cState:', 'color: #9E9E9E; font-weight: 700;', state);
    //   console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', action);
    //   console.log('%cNext:', 'color: #47B04B; font-weight: 700;', result);
    //   console.groupEnd();
    // } else {
    // }
    return result;
  }, initState);
  const setStateWithActionName = (state, actionName) => {
    setState(state);
  };
  return [state, setStateWithActionName];
};



export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export const useShowOnce = localKey => {
  // 从 localStorage 读取 key 值
  const [show, setShow] = useState(false);
  let localStr;
  try {
    localStr = localStorage.getItem(localKey);
  } catch (error) {}
  if (!localStr) {
    setShow(true);
    localStorage.setItem(localKey, JSON.stringify(true));
  }
  return show;
};


export const useStorageState = (initState = {}, searchKey = 'SAVES') => {
  // 从 localStorage 读取 search 值
  const readSearchFromStorage = () => {
    const searchStr = localStorage.getItem(searchKey);
    if (searchStr) {
      try {
        return JSON.parse(searchStr);
      } catch (error) {
        return initState;
      }
    }
    return initState;
  };
  const [data, setData] = useState(readSearchFromStorage());
  // 存储搜索值到 localStorage
  const setSearchWithStorage = search => {
    setData(search);
    localStorage.setItem(searchKey, JSON.stringify(search));
  };
  return [data, setSearchWithStorage];
};
