import React from 'react';
import { View, StyleSheet, Animated, Dimensions} from 'react-native';

const { width } = Dimensions.get('window');

export const Route = () => null;

const buildSceneConfig = (children = []) => {
    const config = {};
  
    children.forEach(child => {
        config[child.props.name] = { key: child.props.name, component: child.props.component };
    });
  
    return config;
};

export class Navigator extends React.Component {
    constructor(props) {
        super(props);
    
        const sceneConfig = buildSceneConfig(props.children);
        const initialSceneName = props.children[0].props.name;
    
        this.state = {
            sceneConfig,
            stack: [sceneConfig[initialSceneName]],
        };
    }

    _animatedValue = new Animated.Value(0);

    handlePush = (sceneName) => {
        this.setState(state => ({
            ...state,
            stack: [...state.stack, state.sceneConfig[sceneName]],
        }),() => {
            this._animatedValue.setValue(width);
            Animated.timing(this._animatedValue, {
              toValue: 0,
              duration: 250,
              useNativeDriver: true,
            }).start();
        });
    }

    handlePop = () => {
        Animated.timing(this._animatedValue, {
            toValue: width,
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            this._animatedValue.setValue(0);
            this.setState(state => {
                const { stack } = state;
                if (stack.length > 1) {
                    return {
                    stack: stack.slice(0, stack.length - 1),
                    };
                }
        
                return state;
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.stack.map((scene, index) => {
                    const CurrentScene = scene.component;
                    const sceneStyles = [styles.scene];
                    if (index === this.state.stack.length - 1 && index > 0) {
                        sceneStyles.push({
                            transform: [
                                {
                                    translateX: this._animatedValue,
                                }
                            ]
                        });
                    }
            
                    return (
                        <Animated.View style={index === 0 ? styles.initialScreen: sceneStyles} key={scene.key}>
                            <CurrentScene navigator={{ push: this.handlePush, pop: this.handlePop }}/>
                        </Animated.View>
                    );
                })}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    scene: {
        // ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 50,
        flex: 1,
    },
    initialScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
    }
});