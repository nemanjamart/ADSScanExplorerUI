import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DownloadIcon from '@material-ui/icons/VerticalAlignBottomSharp';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';

const downloadDialogReducer = (state = {}, action) => {
  if (action.type === 'OPEN_WINDOW_DIALOG') {
    return {
      ...state,
      [action.windowId]: {
        openDialog: action.dialogType,
      },
    };
  }

  if (action.type === 'CLOSE_WINDOW_DIALOG') {
    return {
      ...state,
      [action.windowId]: {
        openDialog: null,
      },
    };
  }
  return state;
};

const mapDispatchToProps = (dispatch, { windowId }) => ({
  openDownloadDialog: () => dispatch({ type: 'OPEN_WINDOW_DIALOG', windowId, dialogType: 'download' }),
});

class MiradorDownload extends Component {
  openDialogAndCloseMenu() {
    const { handleClose, openDownloadDialog } = this.props;

    openDownloadDialog();
    handleClose();
  }

  render() {
    return (
      <React.Fragment>
        <MiradorMenuButton onClick={() => this.openDialogAndCloseMenu()} aria-label="Download pages">
          <DownloadIcon />
        </MiradorMenuButton>
      </React.Fragment>
    );
  }
}

MiradorDownload.propTypes = {
  handleClose: PropTypes.func,
  openDownloadDialog: PropTypes.func,
};

MiradorDownload.defaultProps = {
  handleClose: () => { },
  openDownloadDialog: () => { },
};

export default {
  target: 'WindowTopBarPluginArea',
  mode: 'add',
  name: 'MiradorDownloadPlugin',
  component: MiradorDownload,
  mapDispatchToProps,
  reducers: {
    windowDialogs: downloadDialogReducer,
  },
};