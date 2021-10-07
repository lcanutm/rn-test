
import React, { useState } from "react";

import { Button, Container, Content, Thumbnail, View, Text } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { onLogout } from "../../redux/actions/actionCreators";
import { LogOutGoogle } from "../login/components/google";
import { START_SCREEN } from "../../utils/screenName";


const Profile = (props) => {
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();

    return (
        <Container>
            <View style={styles.contentStyle}>
                <View style={styles.contentView} >
                    <View style={styles.viewStyle}>
                        <Thumbnail source={profile?.photoUrl ? { uri: profile.photoUrl } : require('../../../assets/icon.png')}></Thumbnail>
                    </View>
                    <View style={styles.viewStyle}>
                        <Text style={styles.mainText}>{profile?.name ? profile.name : 'Sin Nombre'}</Text>
                    </View>
                </View>
                <View style={styles.contentButton}>
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(onLogout());
                            LogOutGoogle();
                            props.navigation.navigate(START_SCREEN);
                        }}
                        style={styles.buttonStyle}>
                        <Text uppercase style={styles.buttonTextStyle}>Cerrar sesion</Text></TouchableOpacity>
                </View>

            </View>
        </Container>
    )
}

export default Profile;

const styles = StyleSheet.create({
    contentStyle: { paddingHorizontal: 20, paddingVertical: 25, flex: 1 },
    viewStyle: { width: '100%', alignItems: 'center', justifyContent: 'center' },
    contentView: { flex: 3, width: '100%', alignItems: 'center', justifyContent: 'center' },
    mainText: { marginVertical: 20 },
    buttonTextStyle: { alignSelf: 'center', color: '#110415', fontSize: 14 },
    contentButton: { flex: 1, paddingTop: 20 },
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
        borderWidth: 1,
    }
})