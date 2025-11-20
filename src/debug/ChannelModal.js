import React, {useState, memo, useMemo, useImperativeHandle} from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const ChannelModal = memo(props => {
  const [visible, setVisible] = useState(false);
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      mask: {
        width: width,
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
      },
      wrapper: {
        width: width - 64,
        borderRadius: 12,
        backgroundColor: '#DEDEE7',
        overflow: 'hidden',
        alignItems: 'center',
        position: 'relative',
        padding: 20,
      },
    });
  }, []);

  useImperativeHandle(props.onRef, () => ({
    show: () => {
      setVisible(true);
    },
    cancel: () => {
      setVisible(false);
    },
  }));

  const renderView = () => {
    return <View style={styles.wrapper}>{props.children}</View>;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      presentationStyle="overFullScreen"
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.mask}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        />
        {renderView()}
      </View>
    </Modal>
  );
});

export default ChannelModal;
