import { IconButton, Tooltip } from '@material-ui/core';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import * as React from 'react';

interface IFullscreenSwitchStates {
    isFullscreen: boolean
};

export class FullscreenSwitch extends React.Component<{}, IFullscreenSwitchStates> {
    constructor(props: {}) {
        super(props);
        this.state = { isFullscreen: false };
    }
    public render() {
        const onButtonClicked = (e: React.MouseEvent<HTMLElement>) => {
            if (this.state.isFullscreen) {
                (document.exitFullscreen || document.webkitExitFullscreen).apply(document);
            } else {
                (document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen).apply(document.documentElement);
            }
            this.setState({ isFullscreen: !this.state.isFullscreen });
        };
        const isFullscreen = this.state.isFullscreen;
        return <Tooltip title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
            <IconButton
                onClick={onButtonClicked}
                color="inherit"
                disabled={!(document.fullscreenEnabled || document.webkitFullscreenEnabled)}
            >
                {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
        </Tooltip>
    }
}
