'use babel';

import VitaSimpleReplaceView from './vita-simple-replace-view';
import { CompositeDisposable } from 'atom';
import data from '../data/data';

export default {

  vitaSimpleReplaceView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.vitaSimpleReplaceView = new VitaSimpleReplaceView(state.vitaSimpleReplaceViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.vitaSimpleReplaceView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vita-simple-replace:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.vitaSimpleReplaceView.destroy();
  },

  serialize() {
    return {
      vitaSimpleReplaceViewState: this.vitaSimpleReplaceView.serialize()
    };
  },

  toggle() {
    console.log('VitaSimpleReplace was toggled!');
    const editor = atom.workspace.getActiveTextEditor();
    var cnt=0;
    if (editor) {
        data.forEach(function(o){
            pattern=new RegExp(o[0], 'gu')
            editor.scan(pattern,(match) => {
                // console.log(match);
                cnt++;
                match.replace(o[1]);
            })
        });
        alert(cnt+' replaced');
    }else{
        console.log("editor not found");
    }
    return ;
  }

};
