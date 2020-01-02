'use babel';

import Wlwl2WordCountView from './wlwl2-word-count-view';
import { CompositeDisposable } from 'atom';

// If you want to extend Atom's behavior, your package should contain a single
// top-level module, which you export from whichever file (this file) is
// indicated by the main key in your package.json file.
export default {

  wlwl2WordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.wlwl2WordCountView = new Wlwl2WordCountView(state.wlwl2WordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.wlwl2WordCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'wlwl2-word-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.wlwl2WordCountView.destroy();
  },

  serialize() {
    return {
      wlwl2WordCountViewState: this.wlwl2WordCountView.serialize()
    };
  },

  toggle() {
    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      const editor = atom.workspace.getActiveTextEditor();
      const selection = editor.getSelectedText();
      this.wlwl2WordCountView.getSelection(selection);
      this.modalPanel.show();
    }
  }

  // window.addEventListener('click', function (event) {
  //   console.log('test')
  // }, false)

};
