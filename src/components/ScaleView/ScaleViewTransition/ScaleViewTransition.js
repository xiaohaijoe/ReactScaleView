import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

export const UNMOUNTED = "unmounted";
export const EXITED = "exited";
export const ENTERING = "entering";
export const ENTERED = "entered";
export const EXITING = "exiting";

const ScaleViewTransition = (props) => {
  const appearStatus = useRef(null);
  const nextCallback = useRef(null);
  const [status, setStatus] = useState(() => {
    if (props.in) {
      if (props.appear) {
        appearStatus.current = ENTERING;
        return EXITED;
      } else {
        return ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        return UNMOUNTED;
      } else {
        return EXITED;
      }
    }
  });

  useEffect(() => {
    updateStatus(true, appearStatus.current);
    return () => {
      cancelNextCallback();
    };
  }, []);

  useEffect(() => {
    let nextStatus = null;
    if (props.in) {
      if (status !== ENTERING && status !== ENTERED) {
        nextStatus = ENTERING;
      }
    } else {
      if (status === ENTERING || status === ENTERED) {
        nextStatus = EXITED;
      }
    }
    updateStatus(false, nextStatus);
  }, [props]);

  const getTimeouts = () => {
    const { timeout } = props;
    let exit, enter, appear;

    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== "number") {
      exit = timeout.exit;
      enter = timeout.enter;
      // TODO: remove fallback for next major
      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }
    return { exit, enter, appear };
  };

  const updateStatus = (mounting = false, nextStatus) => {
    if (nextStatus !== null) {
      cancelNextCallback();

      if (nextStatus === ENTERING) {
        performEnter(mounting);
      } else {
        performExit();
      }
    } else if (props.unmountOnExit && status === EXITED) {
      setStatus(UNMOUNTED);
    }
  };

  const performEnter = (mounting) => {
    const { enter } = props;
    const appearing = mounting;
    const [maybeNode, maybeAppearing] = props.nodeRef
      ? [appearing]
      : [ReactDOM.findDOMNode(this), appearing];

    const timeouts = getTimeouts();
    const enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set
    if (!mounting && !enter) {
      safeSetState(ENTERED, () => {
        props.onEntered(maybeNode);
      });
      return;
    }

    props.onEnter(maybeNode, maybeAppearing);

    safeSetState(ENTERING, () => {
      props.onEntering(maybeNode, maybeAppearing);

      onTransitionEnd(enterTimeout, () => {
        safeSetState(ENTERED, () => {
          props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };

  const performExit = () => {
    const { exit } = props;
    const timeouts = getTimeouts();
    const maybeNode = props.nodeRef ? undefined : ReactDOM.findDOMNode(this);

    // no exit animation skip right to EXITED
    if (!exit) {
      safeSetState(EXITED, () => {
        props.onExited(maybeNode);
      });
      return;
    }

    props.onExit(maybeNode);

    safeSetState(EXITING, () => {
      props.onExiting(maybeNode);

      onTransitionEnd(timeouts.exit, () => {
        safeSetState(EXITED, () => {
          props.onExited(maybeNode);
        });
      });
    });
  };

  const cancelNextCallback = () => {
    if (nextCallback.current !== null) {
      nextCallback.current.cancel();
      nextCallback.current = null;
    }
  };

  const safeSetState = (nextState, callback) => {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = setNextCallback(callback);
    setStatus(nextState);
    callback && callback();
    // this.setState(nextState, callback);
  };

  const setNextCallback = (callback) => {
    let active = true;

    nextCallback.current = (event) => {
      if (active) {
        active = false;
        nextCallback.current = null;

        callback(event);
      }
    };

    nextCallback.current.cancel = () => {
      active = false;
    };

    return nextCallback.current;
  };

  const onTransitionEnd = (timeout, handler) => {
    setNextCallback(handler);
    const node = props.nodeRef
      ? props.nodeRef.current
      : ReactDOM.findDOMNode(this);

    const doesNotHaveTimeoutOrListener =
      timeout == null && !props.addEndListener;
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(nextCallback.current, 0);
      return;
    }

    if (props.addEndListener) {
      const [maybeNode, maybeNextCallback] = props.nodeRef
        ? [nextCallback.current]
        : [node, nextCallback.current];
      props.addEndListener(maybeNode, maybeNextCallback);
    }

    if (timeout != null) {
      setTimeout(nextCallback.current, timeout);
    }
  };
  const { children, in: _in, ...restProps } = props;

  if (status === UNMOUNTED) {
    return null;
  }
  return (
    <>
      {typeof children === "function"
        ? children(status, restProps)
        : React.cloneElement(React.Children.only(children), restProps)}
    </>
  );
};

ScaleViewTransition.UNMOUNTED = UNMOUNTED;
ScaleViewTransition.EXITED = EXITED;
ScaleViewTransition.ENTERING = ENTERING;
ScaleViewTransition.ENTERED = ENTERED;
ScaleViewTransition.EXITING = EXITING;

const DefaultComponent = (props) => {
  const mProps = {
    in: props.in !== undefined ? props.in : false,
    mountOnEnter: props.mountOnEnter !== undefined ? props.mountOnEnter : false,
    unmountOnExit:
      props.unmountOnExit !== undefined ? props.unmountOnExit : false,
    appear: props.appear !== undefined ? props.appear : false,
    enter: props.enter !== undefined ? props.enter : true,
    exit: props.exit !== undefined ? props.exit : true,

    onEnter: props.onEnter || (() => {}),
    onEntering: props.onEntering || (() => {}),
    onEntered: props.onEntered || (() => {}),

    onExit: props.onExit || (() => {}),
    onExiting: props.onExiting || (() => {}),
    onExited: props.onExited || (() => {}),
    ...props,
  };
  return <ScaleViewTransition {...mProps}></ScaleViewTransition>;
};
export default DefaultComponent;
