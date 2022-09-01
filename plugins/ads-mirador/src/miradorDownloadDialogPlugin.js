import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { getCanvasLabel, getVisibleCanvases, selectInfoResponse } from 'mirador/dist/es/src/state/selectors/canvases';
import { addError } from 'mirador/dist/es/src/state/actions'
import { getManifestTitle } from 'mirador/dist/es/src/state/selectors'
import { getWindowViewType } from 'mirador/dist/es/src/state/selectors/windows';
import { getManifestoInstance } from 'mirador/dist/es/src/state/selectors/manifests';
import { getContainerId } from 'mirador/dist/es/src/state/selectors/config';
import ScrollIndicatedDialogContent from 'mirador/dist/es/src/containers/ScrollIndicatedDialogContent';
import { saveAs } from 'file-saver'


/**
 * MiradorDownloadDialog ~
*/
export class MiradorDownloadDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usePageRange: false,
            startPage: 1,
            endPage: 1
        };
    }


    fetchPDF(usePageRange) {
        const { authToken, pdfUrl, title, addError, closeDialog, addExternalAlert } = this.props;
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${authToken}` },
        }

        let url = `${pdfUrl}?id=${title}`
        if (usePageRange) {
            url += `&page_start=${this.state.startPage}&page_end=${this.state.endPage}`
        }

        fetch(url, requestOptions).then(res => {
            if (!res.ok) {
                addError("Sorry, an error occured while generating the PDF")
            } else {
                addExternalAlert("Please wait while your PDF is being generated. Depending on the file size it might take up to 30 seconds.")
                res.blob().then((blob) => {
                    saveAs(blob, `${title}_scan_explorer.pdf`)
                })
            }
        })

        closeDialog()
    }

    /**
     * Returns the rendered component
    */
    render() {
        const {
            closeDialog,
            containerId,
            open,
        } = this.props;

        if (!open) return ('');

        return (
            <React.Fragment>
                <Dialog
                    container={document.querySelector(`#${containerId} .mirador-viewer`)}
                    disableEnforceFocus
                    onClose={closeDialog}
                    open={open}
                    scroll="paper"
                    fullWidth
                    maxWidth="xs"
                >
                    <DialogTitle disableTypography>
                        <Typography variant="h2">Download Pages</Typography>
                    </DialogTitle>
                    <ScrollIndicatedDialogContent>
                        <Box
                            component="form"
                            sx={{ p: 2, border: '1px dashed grey' }}
                            autoComplete="off"
                        >
                            <FormControl >
                                <form onSubmit={(e) => { e.preventDefault(); this.fetchPDF(this.state.usePageRange); }}>
                                    <FormLabel id="row-radio-buttons-group-label">Download pages</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={this.state.usePageRange}
                                        onChange={(event) => { this.setState({ usePageRange: event.target.value === 'true' }) }}
                                    >
                                        <FormControlLabel value={false} control={<Radio />} label="All" />
                                        <FormControlLabel value={true} control={<Radio />} label="Range" />
                                    </RadioGroup>

                                    <Grid container>
                                        <Grid item xs={4}>
                                            <TextField
                                                type={'number'}
                                                required
                                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                id="outlined-required"
                                                label="Page start"
                                                defaultValue={this.state.startPage}
                                                style={{ width: '80%' }}
                                                disabled={!this.state.usePageRange}
                                                onChange={(e) => this.setState({ startPage: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                type={'number'}
                                                required
                                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                id="outlined-disabled"
                                                label="Page end"
                                                defaultValue={this.state.endPage}
                                                style={{ width: '80%' }}
                                                disabled={!this.state.usePageRange}
                                                onChange={(e) => this.setState({ endPage: e.target.value })}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button type='submit' variant="contained" style={{ margin: '20px' }} >Download Pages</Button>
                                </form>
                            </FormControl>
                        </Box>
                    </ScrollIndicatedDialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

MiradorDownloadDialog.propTypes = {
    canvasLabel: PropTypes.func.isRequired,
    canvases: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.string, index: PropTypes.number }),
    ),
    classes: PropTypes.shape({
        h2: PropTypes.string,
        h3: PropTypes.string,
    }).isRequired,
    closeDialog: PropTypes.func.isRequired,
    containerId: PropTypes.string.isRequired,
    infoResponse: PropTypes.func.isRequired,
    manifest: PropTypes.shape({
        getSequences: PropTypes.func,
    }),
    open: PropTypes.bool,
    restrictDownloadOnSizeDefinition: PropTypes.bool,
    viewType: PropTypes.string.isRequired,
    windowId: PropTypes.string.isRequired,
};
MiradorDownloadDialog.defaultProps = {
    canvases: [],
    manifest: {},
    open: false,
    restrictDownloadOnSizeDefinition: false,
};

const mapDispatchToProps = (dispatch, { windowId }) => ({
    closeDialog: () => dispatch({ type: 'CLOSE_WINDOW_DIALOG', windowId }),
    addError: (error) => dispatch(addError(error)),
});

const mapStateToProps = (state, { windowId }) => ({
    canvases: getVisibleCanvases(state, { windowId }),
    canvasLabel: canvasId => (getCanvasLabel(state, { canvasId, windowId })),
    containerId: getContainerId(state),
    infoResponse: canvasId => (selectInfoResponse(state, { windowId, canvasId }) || {}),
    manifest: getManifestoInstance(state, { windowId }),
    authToken: state.config.miradorAdsPlugins && state.config.miradorAdsPlugins.authToken,
    pdfUrl: state.config.miradorAdsPlugins && state.config.miradorAdsPlugins.pdfUrl,
    id: state.config.miradorAdsPlugins && state.config.miradorAdsPlugins.id,
    open: (state && state.windowDialogs && state.windowDialogs[windowId] && state.windowDialogs[windowId].openDialog === 'download'),
    viewType: getWindowViewType(state, { windowId }),
    title: getManifestTitle(state, { windowId }),
    addExternalAlert: (msg) => state.config.miradorAdsPlugins && state.config.miradorAdsPlugins.addExternalAlert(msg),
});




export default {
    target: 'Window',
    mode: 'add',
    name: 'MiradorDownloadDialog',
    component: MiradorDownloadDialog,
    mapDispatchToProps,
    mapStateToProps,
};
