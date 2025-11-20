import React, {memo, useEffect, useRef} from 'react';
import {TouchableOpacity} from 'react-native';

const TIMEOUT_DEFAULT = 6 * 1000;
const TRIGGER_TIMES = 10;

const Button = memo(props => {
  const {onPress, children, ...others} = props;

  const timerRef = useRef(null);
  const onPressTimesRef = useRef(0);

  useEffect(() => {
    onPressTimesRef.current = 0;
  }, []);

  const _onPress = () => {
    onPressTimesRef.current = onPressTimesRef.current + 1;
    if (onPressTimesRef.current >= TRIGGER_TIMES) {
      onPress?.();
      onPressTimesRef.current = 0;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    } else {
      if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          onPressTimesRef.current = 0;
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
        }, TIMEOUT_DEFAULT);
      }
    }
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={_onPress} {...others}>
      {children}
    </TouchableOpacity>
  );
});

export default Button;
