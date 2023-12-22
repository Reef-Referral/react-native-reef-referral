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
  ReefReferral.useReefReferral({
    apiKey: '12b5831a-c4eb-4855-878f-e5fdacce8e18',
  });

  const { referralStatus, refresh } = ReefReferral.useReferralStatus();

  React.useEffect(() => {
    console.log(referralStatus);
  }, [referralStatus]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text>Receiver Status</Text>
        {referralStatus?.receiverStatus ? (
          <>
            <Text>Offer URL: {referralStatus.receiverStatus.offerCodeUrl}</Text>
            <Text>
              Reward eligibility:{' '}
              {referralStatus.receiverStatus.rewardEligibility}
            </Text>
          </>
        ) : (
          <Text>unknown</Text>
        )}
        <Text>Sender Status</Text>
        {referralStatus ? (
          <>
            <Text>
              Link URL:{' '}
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL(referralStatus.senderStatus.linkUrl!)
                }
              >
                {referralStatus.senderStatus.linkUrl}
              </Text>
            </Text>
            <Text>Offer URL: {referralStatus.senderStatus.offerCodeUrl}</Text>
            <Text>
              Redeemed reward: {referralStatus.senderStatus.redeemedCount}x
            </Text>
            <Text>
              Reward eligibility:{' '}
              {referralStatus.senderStatus.rewardEligibility}
            </Text>
          </>
        ) : (
          <Text>unknown</Text>
        )}
        <Text>User ID</Text>
        <Text>{referralStatus?.userId ?? 'unknown'}</Text>
        <Button
          title="triggerReceiverSuccessAsync"
          onPress={() => {
            ReefReferral.triggerReceiverSuccessAsync().catch((err) =>
              console.warn('failed to trigger receiver success', err)
            );
          }}
        />
        <Button
          title="triggerSenderSuccessAsync"
          onPress={() => {
            ReefReferral.triggerSenderSuccessAsync().catch((err) =>
              console.warn('failed to trigger sender success', err)
            );
          }}
        />
        <Button
          title="setUserIdAsync"
          onPress={() => {
            ReefReferral.setUserIdAsync(
              `usr-${Math.random().toString().slice(2)}`
            ).catch((err) => console.warn('failed to set user id', err));
          }}
        />
        <Button
          title="Refresh"
          onPress={() => {
            refresh().catch((err) =>
              console.warn('failed to refresh status', err)
            );
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
  link: {
    color: 'blue',
  },
});
