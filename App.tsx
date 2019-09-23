import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlaidClient from './components';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <Text>Plaid Client</Text>
      <PlaidClient
        selectAccount="false"
        env="sandbox"
        PublicKey=""
        origin='localhost'
        product="auth,transactions"
        clientName="Plaid Link"
        webhook="https://requestb.in"
        PlaidLinkUri = 'https://cdn.plaid.com/link/v2/stable/link.html'
        onLoad={onLoad}
        onEvent={onEvent}
        onConnected={onConnected}
        onExit={onExit}
        onReady={onReady}
        onAcknowledged={onAcknowledged}
        onMessage={onMessage}
        onPlaidRef={onPlaidRef}
      />
    </View>
  );
}

function onLoad(msg){console.log('call back onLoad:',msg)}
function onReady(msg){console.log('call back onReady:',msg)}
function onAcknowledged(msg){console.log('call back onAcknowledged:',msg)}
function onConnected(msg){console.log('call back onConnected:',msg)}
function onExit(msg){console.log('call back onExit:',msg)}
function onEvent(msg){console.log('call back onEvent:',msg)}
function onMessage(msg){console.log('call back onMessage:',msg)};
function onPlaidRef(msg){console.log('call back onPlaidRef:',msg)};

