import React, { Component } from 'react';

export default class AddRule extends Component {
  constructor(props) {
    super(props);
    this.handleAddRule = this.handleAddRule.bind(this);
  }

  handleAddRule() {
    const files = this.refs.file.files;

    const readFile = (files, i, onfile, eof) => {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (data) => {
        onfile(data, file.name);

        if (files[i + 1]) {
          readFile(files, i + 1, onfile, eof);
        } else {
          eof();
        }
      };
      reader.readAsText(file);
    };

    const callback = (upload, name) => {
      const body = upload.target.result;
      this.props.onAddRule({ name, body });
    };

    readFile(files, 0, callback, () => {
      this.refs.file.value = '';
    });
  }

  render() {
    return (
      <input className="Button Upload" type="file" ref="file" onChange={this.handleAddRule} multiple />
    );
  }
}
