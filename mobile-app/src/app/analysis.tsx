import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function AnalysisScreen() {
  const { data } = useLocalSearchParams();
  const router = useRouter();
  
  let parsedData = null;
  try {
    parsedData = data ? JSON.parse(data as string) : null;
  } catch(e) { console.error(e); }

  if (!parsedData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data received or invalid format.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardContent}>{children}</View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtonIcon} onPress={() => router.back()}>
          <Text style={styles.backButtonIconText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analysis Results</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Section title="State Transition">
          <View style={styles.stateRow}>
            <View style={styles.stateBox}>
              <Text style={styles.stateLabel}>Before State</Text>
              <Text style={styles.stateValue}>{parsedData.before_state?.status}</Text>
              <Text style={styles.stateOwner}>{parsedData.before_state?.owner}</Text>
            </View>
            <Text style={styles.stateArrow}>→</Text>
            <View style={[styles.stateBox, styles.stateBoxActive]}>
              <Text style={styles.stateLabel}>After State</Text>
              <Text style={[styles.stateValue, {color: '#38bdf8'}]}>{parsedData.after_state?.status}</Text>
              <Text style={styles.stateOwner}>{parsedData.after_state?.owner}</Text>
            </View>
          </View>
        </Section>

        <Section title="Facts Extracted">
          {parsedData.facts?.map((f: string, i: number) => (
            <Text key={i} style={styles.listItem}>• {f}</Text>
          ))}
        </Section>

        <Section title="Insight">
          <Text style={styles.paragraph}>{parsedData.insight}</Text>
        </Section>

        <Section title="Impact Analysis">
          <Text style={[styles.paragraph, styles.alertText]}>{parsedData.impact}</Text>
        </Section>

        <Section title="Recommended Actions">
          {parsedData.recommended_actions?.map((a: string, i: number) => (
            <Text key={i} style={styles.listItemAction}>{i + 1}. {a}</Text>
          ))}
        </Section>

        <Section title="Simulation Execution">
          <Text style={styles.logStatus}>Status: {parsedData.simulation?.status}</Text>
          <View style={styles.logContainer}>
            {parsedData.simulation?.logs?.map((l: string, i: number) => (
              <Text key={i} style={styles.logItem}>$ {l}</Text>
            ))}
          </View>
        </Section>

        <Section title="Agent Trace Log">
          {parsedData.agent_trace?.map((t: any, i: number) => (
            <View key={i} style={styles.traceItem}>
              <Text style={styles.traceAgent}>{t.agent} <Text style={styles.traceStatus}>[{t.status}]</Text></Text>
              <Text style={styles.traceSummary}>{t.summary}</Text>
            </View>
          ))}
        </Section>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20, backgroundColor: '#1e293b', borderBottomWidth: 1, borderBottomColor: '#334155' },
  backButtonIcon: { padding: 8 },
  backButtonIconText: { color: '#38bdf8', fontSize: 16, fontWeight: '600' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#f8fafc' },
  scrollContent: { padding: 20, paddingBottom: 60 },
  errorText: { color: '#ef4444', fontSize: 18, textAlign: 'center', marginTop: 100 },
  backButton: { backgroundColor: '#334155', padding: 12, borderRadius: 8, alignSelf: 'center', marginTop: 20 },
  backButtonText: { color: '#f8fafc', fontWeight: '600' },
  
  card: { backgroundColor: '#1e293b', borderRadius: 16, marginBottom: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#334155' },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, padding: 16, backgroundColor: '#0f172a', borderBottomWidth: 1, borderBottomColor: '#334155' },
  cardContent: { padding: 16 },
  
  paragraph: { color: '#e2e8f0', fontSize: 16, lineHeight: 24 },
  alertText: { color: '#fca5a5' },
  listItem: { color: '#e2e8f0', fontSize: 15, marginBottom: 8, lineHeight: 22 },
  listItemAction: { color: '#38bdf8', fontSize: 16, fontWeight: '600', marginBottom: 12, lineHeight: 22 },
  
  stateRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stateBox: { flex: 1, backgroundColor: '#0f172a', padding: 12, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  stateBoxActive: { borderColor: '#0ea5e9', backgroundColor: '#0c4a6e20' },
  stateLabel: { fontSize: 12, color: '#64748b', marginBottom: 4, textTransform: 'uppercase' },
  stateValue: { fontSize: 16, fontWeight: '700', color: '#94a3b8', marginBottom: 4, textAlign: 'center' },
  stateOwner: { fontSize: 12, color: '#cbd5e1', textAlign: 'center' },
  stateArrow: { fontSize: 24, color: '#64748b', paddingHorizontal: 10 },
  
  logContainer: { backgroundColor: '#020617', padding: 12, borderRadius: 8, marginTop: 12 },
  logStatus: { color: '#4ade80', fontSize: 14, fontWeight: '700', marginBottom: 4 },
  logItem: { color: '#2dd4bf', fontFamily: 'monospace', fontSize: 13, marginBottom: 6 },
  
  traceItem: { marginBottom: 16, paddingLeft: 12, borderLeftWidth: 2, borderLeftColor: '#38bdf8' },
  traceAgent: { color: '#f8fafc', fontSize: 15, fontWeight: '700', marginBottom: 4 },
  traceStatus: { color: '#4ade80', fontSize: 12, fontWeight: 'normal' },
  traceSummary: { color: '#94a3b8', fontSize: 14, lineHeight: 20 }
});
