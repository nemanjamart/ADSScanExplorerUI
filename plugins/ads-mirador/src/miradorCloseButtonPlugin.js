import { setWorkspaceFullscreen } from 'mirador/dist/es/src/state/actions';
import CloseOutlined from '@material-ui/icons/CloseOutlined';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { Component } from 'react';
import { MenuItem, MenuList } from '@material-ui/core';

class MyPluginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {fullscreen: false};  
    }

    toggleFullscreen() {
        const { setWorkspaceFullscreen } = this.props;
        this.state.fullscreen = !this.state.fullscreen;
        setWorkspaceFullscreen(this.state.fullscreen);
    }

    closeMirador() {
        history.replaceState({}, '', localStorage.getItem('last_search_path'))
        history.go()
    }

    render() {
        return (
            <React.Fragment>
                <MenuItem onClick={() => this.toggleFullscreen()}>
                    {this.state.fullscreen ? <FullscreenExitIcon/> : <FullscreenIcon />}
                </MenuItem>
                <MenuItem onClick={() => this.closeMirador()}>
                    <CloseOutlined />
                </MenuItem>
            </React.Fragment >
        );
    }
}


const miradorCloseButtonPlugin = {
    component: MyPluginComponent,
    target: 'FullScreenButton',
    mode: 'wrap',

    mapDispatchToProps: (dispatch, {state, windowId }) => ({
        setWorkspaceFullscreen: (fullscreen) => dispatch(setWorkspaceFullscreen(fullscreen)),
    })
}

export default miradorCloseButtonPlugin;

