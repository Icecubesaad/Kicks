import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <View style={styles.parent}>
            {sidebarOpen && <View style={styles.sideBar}></View>}
            <Feather name="menu" size={24} color="black" onPress={() => setSidebarOpen(!sidebarOpen)} />
            <Feather name="search" size={24} color="black" />
        </View>
    );
}

const styles = StyleSheet.create({
    parent: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 20,
        width: '100%',
        flexDirection: 'row',
        marginTop:40
    },
    sideBar: {
        flex: 1,
        width: '70%',
        backgroundColor: 'lightgrey', // Added background color for visibility
    },
});

export default Header;
