import React from "react";
import {View, Text, StyleSheet, ImageBackground, Button} from "react-native";
import bgImage from "@/assets/images/bladerunner.png";
import Board from "@/components/Board";  
export default function Main() {
    const [currentBoard, resetCurrentBoard] = Array(9).fill(" ")
    
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImage} source={bgImage}>
                <Text style={styles.title}>Tic Tac Toe</Text>
                <View style={styles.board}>
                    <Board/>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        textAlign: "center",
        color: "white",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    container: {
        flex: 1,
        flexDirection: "column"
    },
    board: {
        alignItems: "center",
        justifyContent: "center",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover", // Adjust the image size
        justifyContent: "center", // Center content
        width: '100%',
        height: '100%'
    }
});
