import React, {useState} from "react";
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, Button} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const maxGridSize = 300; // Maximum grid size (e.g., for desktop)
const minGridSize = 200; // Minimum grid size (e.g., for small phones)
const gridSize = 3; // 3x3 grid

// Calculate dynamic grid and cell sizes
const gridSizeDynamic = Math.min(screenWidth * 0.9, maxGridSize); // Use 90% of screen width or max size
const cellSize = gridSizeDynamic / gridSize; // Divide grid into equal cells

export default function Board() {
    console.log(cellSize)
    const [gameState, setGameState] = useState(Array(9).fill(" "));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [currentWinner, setWinner] = useState("");
    const [showText, setTextState] = useState(false);
    
    const winningCombinations = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6], // Diagonal 2
    ];

    // Handle box press
    function handleBoxPress(index: number) {
        console.log("Index has been pressed:" + index);
        // Ignore the press if the box is already filled or game is over
        if (gameState[index] !== " " || currentPlayer === "") {
            return;
        }

        const newGameState = [...gameState];
        newGameState[index] = currentPlayer;
        setGameState(newGameState);

        // Check if the current player has won
        if (hasPlayerWon(newGameState)) {
            console.log(`Player ${currentPlayer} has won!`);
            setWinner(`Player ${currentPlayer} has won!`);
            setCurrentPlayer("")
            setTextState(true);

            return;
        }

        // Check for a draw
        if (!newGameState.includes(" ")) {
            console.log("It's a draw!");
            setWinner("It's a draw!");
            setTextState(true);
            return;
        }

        // Switch to the other player
        switchPlayer();
        console.log("loggin current player" + currentPlayer);
    }
    
    function switchPlayer(){
        if (currentPlayer === "X") {
            setCurrentPlayer("O");
        }
        else if (currentPlayer === "O") {
            setCurrentPlayer("X");
        }
        else {
            setCurrentPlayer("");
        }
    }

    // Check if the current player has won
    function hasPlayerWon(state: string[]) {
        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (state[a] && state[a] === state[b] && state[a] === state[c]) {
                // Means the combination is not fully populated yet, so it cannot win
                if (state[a] === " " && state[b] === " " && state[c] === " ") {
                    return false;
                }
                
                return true;
            }
        }
        return false;
    }
    
    function resetGame() {
        setCurrentPlayer("X");
        setGameState(Array(9).fill(" "));
        setTextState(false);
    }

    const renderGrid = () => {
        return (<View>
            <Text style={styles.textContent}>
                {showText ? `${currentWinner}` : `${currentPlayer}'s turn`}
            </Text>
            {
            Array.from({length: gridSize}).map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {Array.from({length: gridSize}).map((_, colIndex) => {
                        const cellIndex = rowIndex * gridSize + colIndex;
                        return (
                            <TouchableOpacity
                                key={cellIndex}
                                style={styles.cell}
                                onPress={() => handleBoxPress(cellIndex)}
                            >
                                <Text style={styles.cellText}>{gameState[cellIndex]}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ))}
            <Button title={"Reset"} onPress={() => resetGame()}></Button>
        </View>)
    };

    return <View style={styles.board}>{renderGrid()}</View>;
}

const styles = StyleSheet.create({
    board: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column", // Ensures rows are stacked vertically
    },
    row: {
        flexDirection: "row", // Ensures cells in each row are aligned horizontally
    },
    cell: {
        width: cellSize - 2,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#000",
        backgroundColor: "#f0f0f0",
    },
    cellText: {
        fontSize: cellSize * 0.3,
        fontWeight: "bold",
        textAlign: "center"
    },
    textContent:  {
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
        fontSize: 30,
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
});