import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';

const Stack = createStackNavigator();

function HomeScreen({ navigation, route }) {
  // Retrieve menu items from Add Menu screen
  const menuItems = route.params?.menuItems || [];

  return (
    <View style={styles.container}>
      {/* Chef Logo */}
      <Image 
        source={{ uri: 'https://th.bing.com/th/id/OIP.VRt7CBwBYh7W98PTokvtJgHaFn?rs=1&pid=ImgDetMain' }} 
        style={styles.logo} 
      />
      
      <Text style={styles.header}>Chef's Menu</Text>
      <Text>Total Menu Items: {menuItems.length}</Text>

      {/* Display the list of menu items */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>
              {item.dishName} - {item.course} - R{item.price}
            </Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />

      <Button
        title="Add Menu Item"
        onPress={() => navigation.navigate('AddMenu', { menuItems })}
      />
    </View>
  );
}
 
function AddMenuScreen({ navigation, route }) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters');
  const [price, setPrice] = useState('');
  const [menuItems, setMenuItems] = useState(route.params?.menuItems || []);

  const courses = ['Starters', 'Mains', 'Dessert'];

  const addMenuItem = () => {
    if (dishName && description && price) {
      const newItem = {
        id: Math.random().toString(),
        dishName,
        description,
        course,
        price,
      };
      setMenuItems([...menuItems, newItem]);
      setDishName('');
      setDescription('');
      setPrice('');
      navigation.navigate('Home', { menuItems: [...menuItems, newItem] });
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Menu Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Select Course</Text>
      <Picker
        selectedValue={course}
        style={styles.picker}
        onValueChange={(itemValue) => setCourse(itemValue)}
      >
        {courses.map((item) => (
          <Picker.Item key={item} label={item} value={item} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Price (in ZAR)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="Add Menu Item" onPress={addMenuItem} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddMenu" component={AddMenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 300,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  menuItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  menuText: {
    fontWeight: 'bold',
  },
});
