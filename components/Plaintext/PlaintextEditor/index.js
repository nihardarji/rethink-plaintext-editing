import React from 'react';
import PropTypes from 'prop-types';

import css from './style.module.css';
import { TextareaAutosize } from '@material-ui/core';

function PlaintextEditor({ value, setValue}) {
  return (
    <div className={css.editor}>
      <TextareaAutosize className={css.textarea} rowsMax={20} value={value} onChange={(e) =>setValue(e.target.value)}/>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
