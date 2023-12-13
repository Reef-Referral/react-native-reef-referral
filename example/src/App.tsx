import * as React from 'react';

import {
  StyleSheet,
  Text,
  ScrollView,
  Button,
  SafeAreaView,
  Linking,
} from 'react-native';
import * as ReefReferral from 'react-native-reef-referral';

export default function App() {
  const [result, setResult] = React.useState<ReefReferral.ReferralStatus>();
  const [deepLink, setDeepLink] = React.useState<string | null>();

  React.useEffect(() => {
    ReefReferral.startAsync({
      apiKey: '12b5831a-c4eb-4855-878f-e5fdacce8e18',
    });
  }, []);

  React.useEffect(() => {
    Linking.getInitialURL().then(setDeepLink);
  }, []);

  React.useEffect(() => {
    ReefReferral.getReferralStatusAsync().then(setResult);
  }, []);

  React.useEffect(() => {
    const listener = Linking.addEventListener('url', ({ url }) => {
      console.log('handling deep link', url);
      setDeepLink(url);
    });
    return () => {
      listener.remove();
    };
  }, []);

  React.useEffect(() => {
    const listener = ReefReferral.addEventListener(
      'referralStatusUpdated',
      (status) => {
        console.log('handling updated status', status);
        setResult(status);
      }
    );
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text>Deep Link: {JSON.stringify(deepLink)}</Text>
        <Text>Result: {JSON.stringify(result, null, 2)}</Text>
        <Button
          title="Open URL"
          disabled={!result?.senderStatus.linkUrl}
          onPress={() => {
            Linking.openURL(result!.senderStatus.linkUrl!);
          }}
        />
        <Button
          title="getReferralStatusAsync"
          onPress={() => {
            ReefReferral.getReferralStatusAsync().then(setResult);
          }}
        />
        <Button
          title="triggerReceiverSuccessAsync"
          onPress={() => {
            ReefReferral.triggerReceiverSuccessAsync();
          }}
        />
        <Button
          title="triggerSenderSuccessAsync"
          onPress={() => {
            ReefReferral.triggerSenderSuccessAsync();
          }}
        />
        <Button
          title="handleDeepLinkAsync"
          disabled={!deepLink}
          onPress={() => {
            ReefReferral.handleDeepLinkAsync(deepLink!).catch(console.warn);
          }}
        />
        <Button
          title="setUserId"
          onPress={() => {
            ReefReferral.setUserId(`usr-${Math.random().toString().slice(2)}`);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
