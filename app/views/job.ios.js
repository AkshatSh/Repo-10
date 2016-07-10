/**
 * HelperUpper React Native App
 * https://github.com/Opportunity-Hack-San-Jose-2016/Repo-10
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

const Firebase = require('./config/Firebase.js');
const db = Firebase.database();

class ListingDetailJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([])
    };
    this.listings = db.ref("listings");
  }

  componentDidMount () {
    this.listings.on('value', (snap) => {
      var result = [];
      snap.forEach((child) => {
        result.push({
          title: child.val().name
        });
      })

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(result)
      });
    })
  }

  _renderRow (item) {
    return <Text>{item.title}</Text>;
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections={true}
          style={{flex: 1}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
})

AppRegistry.registerComponent('ListingDetailJob', () => ListingDetailJob);
