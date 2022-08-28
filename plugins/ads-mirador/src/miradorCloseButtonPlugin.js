import { setWorkspaceFullscreen } from 'mirador/dist/es/src/state/actions';
import CloseOutlined from '@material-ui/icons/CloseOutlined';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { Component } from 'react';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';

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
                <MiradorMenuButton onClick={() => this.toggleFullscreen()} aria-label='Toggle fullscreen'>
                    {this.state.fullscreen ? <FullscreenExitIcon/> : <FullscreenIcon />}
                </MiradorMenuButton>
                <MiradorMenuButton onClick={() => this.closeMirador()} aria-label='Close Mirador'>
                    <CloseOutlined />
                </MiradorMenuButton>
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

