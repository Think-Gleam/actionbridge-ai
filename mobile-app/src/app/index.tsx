import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function InputScreen() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/analyze', { content: input });
      router.push({
        pathname: '/analysis',
        params: { data: JSON.stringify(res.data) }
      });
    } catch (error) {
      console.error(error);
      alert('Error connecting to backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>ActionBridge AI</Text>
          <Text style={styles.subtitle}>Autonomous Content-to-Action Agent</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.label}>Raw Input</Text>
          <TextInput 
            style={styles.input}
            multiline
            placeholder="Paste your messy reports, news, or complaints here..."
            placeholderTextColor="#64748b"
            value={input}
            onChangeText={setInput}
          />
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleAnalyze} disabled={loading}>
          {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>Generate Action Plan</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  scrollContent: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  header: { marginBottom: 32, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: '800', color: '#f8fafc', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#94a3b8', textAlign: 'center' },
  card: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 },
  label: { fontSize: 14, fontWeight: '600', color: '#38bdf8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  input: { backgroundColor: '#0f172a', borderRadius: 12, padding: 16, color: '#f8fafc', fontSize: 16, minHeight: 180, textAlignVertical: 'top', borderWidth: 1, borderColor: '#334155' },
  button: { backgroundColor: '#0ea5e9', paddingVertical: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#0ea5e9', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  buttonText: { color: '#ffffff', fontSize: 18, fontWeight: '700', letterSpacing: 0.5 }
});
