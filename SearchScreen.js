import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const SearchScreen = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [repositories, setRepositories] = useState([]);

    const fetchRepositories = async () => {
        try {
            const response = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
            setRepositories(response.data.items);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search for repositories"
                onChangeText={setQuery}
                value={query}
            />
            <Button title="Search" onPress={fetchRepositories} />
            <FlatList
                data={repositories}
                renderItem={({ item }) => (
                    <View style={styles.repoItem}>
                        <Text>{item.name}</Text>
                        <Button
                            title="View Details"
                            onPress={() => navigation.navigate('RepositoryDetails', { repo: item })}
                        />
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    repoItem: {
        marginVertical: 10,
    }
});

export default SearchScreen;
