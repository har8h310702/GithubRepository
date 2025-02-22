// import { Text, SafeAreaView, StyleSheet } from 'react-native';

// // You can import supported modules from npm
// import { Card } from 'react-native-paper';

// // or any files within the Snack
// import AssetExample from './components/AssetExample';

// export default function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.paragraph}>
//         Change code in the editor and watch it change on your phone! Save to get a shareable url.
//       </Text>
//       <Card>
//         <AssetExample />
//       </Card>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });


import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
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
        <SafeAreaView style={styles.container}>
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
                        <Text>{item.description}</Text>
                        <Text>{item.stargazers_count} Stars</Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
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

export default App;
