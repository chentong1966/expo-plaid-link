import React, { Component } from 'react';
import { WebView } from 'react-native';
import { PropTypes } from 'prop-types';
//import omit from 'object.omit';

class PlaidClient extends Component {
  constructor(props) {
    super(props)
    this.Actions = new Map([
      ['ready', this.props.onReady ? this.props.onReady : this.sendMessage],
      ['acknowledged', this.props.onAcknowledged ? this.props.onAcknowledged : this.sendMessage],
      ['event', this.props.onEvent ? this.props.onEvent : this.sendMessage],
      ['connected', this.props.onConnected ? this.props.onConnected : this.sendMessage],
      ['exit', this.props.onExit ? this.props.onExit : this.sendMessage],
    ]);
  }
  render() {
    console.log(this.props)
    let map = Object.entries(this.props);
//    console.log('map', map);
    let url = '?';
    map.forEach(element => {
      url += element[0] + '=' + element[1] + '&';
    });
    url = url.replace('PublicKey', 'key')
    console.log(url, url);
    const {
      clientName,
      countryCodes,
      env,
      PublicKey,
      product,
      webhook,
      language,
      userLegalName,
      userEmailAddress,
      origin,
      selectAccount,
      style,
      PlaidLinkUri,
      token,
    } = this.props;

    baseUri = PlaidLinkUri ? PlaidLinkUri : 'https://cdn.plaid.com/link/v2/stable/link.html';
//    baseUri = baseUri + '?isUsingOnEventCallback=true&isUsingOnExitCallback=true&isUsingOnLoadCallback=true&isUsingOnonSuccessCallback=true';
    let uri = baseUri + url
    console.log('uri', uri)
// `?clientName=${clientName}&key=${PublicKey}&env=${env}&origin=${origin}&product=${product}&selectAccount=${selectAccount}`;
//  uri = token !== undefined ? `${uri}&token=${token}` : uri;
//  uri = webhook !== undefined ? `${uri}&webhook=${webhook}` : uri;
//  console.log('uri', uri)
    return (
      <WebView
        ref={this.props.plaidRef}
        source={{ uri }}
        onMessage={this.onMessage}
        onLoad={this.onLoad}
        useWebKit
        isWebview={true}
      />
    );
  }

  onMessage = e => {

    let data = JSON.parse(e.nativeEvent.data)
    let theaction = data.action
    if (theaction) {
//      console.log(data)
      console.log('action: ',theaction)
      theaction = theaction.split("::")
      let key = theaction[1]
      console.log('key: ',key)
      let f = this.Actions.get(key)
      if(typeof(f) == "function"){f(data)} 
      else {this.sendMessage(data)}
    }else(this.sendMessage(data))
  };

  sendMessage = data => {
    if (this.props.onMessage) {
      this.props.onMessage(data);
    }
  }

  plaidRef = () => {
    console.log('plaidRef')
    if(this.props.onPlaidRef)this.props.onPlaidRef()
  }
}

PlaidClient.propTypes = {
  PublicKey: PropTypes.string.isRequired,
  env: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  clientName: PropTypes.string,
  webhook: PropTypes.string,
  onMessage: PropTypes.func,
  onPlaidRef: PropTypes.func,
  onLoad: PropTypes.func,
  onSuccess: PropTypes.func,
  onExit: PropTypes.func,
  onEvent: PropTypes.func,
};

PlaidClient.defaultProps = {
  clientName: 'Plaid Client',
//  plaidRef: () => {}
};

export default PlaidClient;
