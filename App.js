import * as React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Keyboard,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [text, setText] = React.useState('');
  const [fragrances, setFragrances] = React.useState([]);

  const addFragrance = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setFragrances(prev => [{ id: Date.now().toString(), name: trimmed }, ...prev]);
    setText('');
    Keyboard.dismiss();
  };

  const deleteFragrance = id => {
    setFragrances(prev => prev.filter(item => item.id !== id));
  };

  const clearAll = () => {
    setFragrances([]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item.name}</Text>
      <TouchableOpacity onPress={() => deleteFragrance(item.id)}>
        <MaterialIcons name="delete-outline" size={22} color="#6A1B9A" />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#E0C3FC', '#8EC5FC']}
      style={styles.root}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>✨ My Designer Fragrances ✨</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Add a Fragrance</Text>

          <View style={styles.row}>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Enter fragrance name (e.g. Dior Sauvage)"
              placeholderTextColor="rgba(0,0,0,0.35)"
              style={styles.input}
              onSubmitEditing={addFragrance}
              returnKeyType="done"
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={addFragrance}
              activeOpacity={0.8}
            >
              <MaterialIcons name="add" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.collectionHeader}>
            <Text style={styles.subHeader}>Your Collection</Text>

            {fragrances.length > 0 && (
              <TouchableOpacity onPress={clearAll} style={styles.clearButton} activeOpacity={0.8}>
                <MaterialIcons name="delete-sweep" size={20} color="#fff" />
                <Text style={styles.clearText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>

          {fragrances.length === 0 ? (
            <Text style={styles.empty}>
              No fragrances yet — add your favorite scents above!
            </Text>
          ) : (
            <FlatList
              data={fragrances}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.list}
              keyboardShouldPersistTaps="handled"
            />
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1, padding: 20, justifyContent: 'center' },

  header: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    alignSelf: 'center',
    marginBottom: 18,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },

  label: {
    color: '#fff',
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 15,
    letterSpacing: 0.5,
  },

  row: { flexDirection: 'row', alignItems: 'center' },

  input: {
    flex: 1,
    minHeight: Platform.OS === 'ios' ? 44 : 48,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },

  addButton: {
    marginLeft: 10,
    backgroundColor: '#6A1B9A',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6A1B9A',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 14,
  },

  collectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  subHeader: {
    color: '#fff',
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 17,
  },

  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(106,27,154,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  clearText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },

  empty: {
    color: 'rgba(255,255,255,0.9)',
    fontStyle: 'italic',
  },

  list: { paddingBottom: 8 },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
  },

  listItemText: {
    color: '#111',
    fontSize: 15,
    fontWeight: '500',
  },
});
