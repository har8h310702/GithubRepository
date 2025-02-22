import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RepositoryDetails = ({ route }) => {
    const { repo } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{repo.name}</Text>
            <Text>{repo.description}</Text>
            <Text>Stars: {repo.stargazers_count}</Text>
            <Text>Forks: {repo.forks_count}</Text>
            <Text>Language: {repo.language}</Text>
            <Image source={require('./assets/snack-icon.png')} style={styles.avatar} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    }
});

export default RepositoryDetails;
