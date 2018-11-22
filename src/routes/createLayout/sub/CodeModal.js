/**
 * Created by GYL on 2018/10/8
 */
import React, {Component} from 'react';
import MyModal from '../../../components/common/MyModal';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

const code = `const a = 0;
let list = [
  {
    type: "input",
    initialValue: "请输入",
    paramName: "input"
  }
]`;

class CodeModal extends Component {
  state = {
    list:[
      {
        type: "input",
        initialValue: "请输入",
        paramName: "input"
      }
    ]
  };
  componentDidMount(){

  };
  render(){
    let t = this;
    let {list} = t.state;
    return(
      <div>
        <MyModal
          {...t.props}
          width={800}
        >
          <CodeMirror
            value={`${JSON.stringify(list)}`}
            options={{
              theme: 'eclipse',
              keyMap: 'sublime',
              mode: 'json',
            }}
          />
        </MyModal>
      </div>
    )
  }
}
export default CodeModal;
