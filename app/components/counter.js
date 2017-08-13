import React, {Component} from 'react';

const styles = {
  button: {
    width: 100,
    height: '30px',
    padding: '10px',
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin:'10px auto',
  },
    text: {
      fontSize:100,
      color:'#ff1cba',
      textAlign: 'center'
    },
    buttonText:{
      color:'#434bff'
    }
};

export default class Counter extends Component {
  constructor(props) {
    super(props);
  }
  notification (e) {
      new Notification("Hello World");
  }
  // mysqlと接続するためのfunction
  mysql () {
      console.log('aiu')
      const {ipcRenderer} = require('electron');
      // // 非同期通信の結果を受けたときのコールバック
      ipcRenderer.on('async-reply', (event, arg) => {
        console.log('async-replyまで到着')
          for (let i = 0; i<arg.length; i++) {
              console.log(arg[i]['k_no'])
              console.log(arg[i]['k_name'])
              console.log(arg[i]['k_ado'])
              console.log(arg[i]['k_sei'])
              console.log(arg[i]['k_nen'])
              console.log(arg[i]['k_id'])
              console.log(arg[i]['k_pass'])
          }
      });
      // メインプロセスに引数を送信
      ipcRenderer.send('async', { value:200 });
    }

  render() {
    const { counter, increment, decrement } = this.props;
      console.log('this.props is ');
      console.log(this.props);
      const Notification = e => this.notification(e)
      const mysql = () =>this.mysql()
      // conterには値が入っていて、incrementとdecrementにはfunctionが入っていた
      // つまり、どこかで、counterActionをimportさせて、functionにとばしている
      // this.propsをこの定数に代入しているので、this.propsにfunctionが入っているはず

      return (
      <div style={{backgroundColor: '#434bff', marginLeft: '30%', width: 500}}>
        <p style={styles.text}>{counter}円</p>
        <div onClick={increment} style={styles.button}>
          <p style={styles.buttonText}>10個上げる</p>
        </div>
        <div onClick={decrement} style={styles.button}>
          <p>1個下げるよ</p>
        </div>
        <div><button onClick={Notification}>通知するよ</button></div>
        <div><button onClick={mysql}>mysqlに接続</button></div>
      </div>
    );
  }
}
