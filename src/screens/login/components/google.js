import React from 'react';
import * as Google from 'expo-google-app-auth';
import { Button, Icon, Thumbnail, View, Text } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';


import { GOOGLE_IOS_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID } from '../../../config/constants';
import { HOME_SCREEN } from '../../../utils/screenName';
import { setProfile } from '../../../redux/actions/actionCreators';


export const LoginWithGoogle = (props) => {
    const dispatch = useDispatch();



    const googleLogin = async () => {
        try {
            const { type, accessToken, user } = await Google.logInAsync({
                androidClientId: GOOGLE_ANDROID_CLIENT_ID,
                iosClientId: GOOGLE_IOS_CLIENT_ID,
            });

            return { type, token: accessToken, user };
        } catch (e) {
            return { error: e };
        }
    };

    const handleGoogleLoginPress = async () => {
        props.setCargando(true);
        try {
            const { type, token, user, error } = await googleLogin();
            if (type === 'success') {
                // DISPATCH TOKEN AND USER DATA
                // TO IMPLEMENT NAVIGATION AND USER INFO DISPLAYS
                //   dispatch({ type: 'GOOGLE_LOGIN', token: accessToken, user });

                dispatch(setProfile(user));
                
                props.navigation.navigate(HOME_SCREEN, {
                    online: true,
                    initialPage: 0,
                    profile: user
                })

                props.setCargando(false);

            } else {
                props.setCargando(false);
            }
        } catch (e) {
            props.setCargando(false);
            console.log('error', e);
        }
    };
    return (<TouchableOpacity
        style={styles.buttonStyle}
        onPress={handleGoogleLoginPress}
    >
        <View style={{ flex: 1 }}>
            <Thumbnail style={{ height: 25, width: 25 }} source={require('../../../assets/google.png')}></Thumbnail>
        </View>
        <View style={{ alignItems: 'center', width: '100%' }}>
            <Text uppercase style={styles.buttonTextStyle}>Inicia con Google</Text>
        </View>
    </TouchableOpacity>
    )
}
export const LogOutGoogle = () => {
    return (<TouchableOpacity
        style={{ width: '100%' }}
        onPress={handleLogoutPress}
    ><Text>Cerrar sesion</Text></TouchableOpacity>)
}



const handleLogoutPress = async () => {
    // I ASSUME YOU HAVE YOUR GOOGLE TOKEN SOMEWHERE STORED
    // INSIDE YOUR APP CONTEXT/REDUX STATE
    if (state.googleAuthToken) {
        try {
            const config = {
                androidClientId: GOOGLE_ANDROID_CLIENT_ID,
                iosClientId: GOOGLE_IOS_CLIENT_ID,
            };

            await Google.logOutAsync({
                accessToken: state.googleAuthToken,
                ...config,
            });

            // DISPATCH LOGOUT TO IMPLEMENT LOGOUT NAVIGATION
            //   dispatch({ type: 'LOGOUT' });
        } catch (e) {
            console.log(e);
        }
    }
};

const styles = StyleSheet.create({
    contentStyle: { paddingHorizontal: 20, paddingVertical: 25, flex: 1 },
    viewStyle: { width: '100%', alignItems: 'center' },
    mainText: { marginBottom: 10 },
    buttonTextStyle: { alignSelf: 'center', color: '#110415', fontSize: 14 },
    buttonStyle: {
        width: '100%',
        height: 40,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderWidth: 1
    }
})