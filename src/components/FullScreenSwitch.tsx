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
    public componentWillMount() {
        document.addEventListener("fullscreenchange", this.onFullScreenChanged);
        document.addEventListener("webkitfullscreenchange", this.onFullScreenChanged);
        document.addEventListener("MSFullscreenChange", this.onFullScreenChanged);
    }
    public componentWillUnmount() {
        document.removeEventListener("fullscreenchange", this.onFullScreenChanged);
        document.removeEventListener("webkitfullscreenchange", this.onFullScreenChanged);
        document.removeEventListener("MSFullscreenChange", this.onFullScreenChanged);
    }
    public render() {
        const onButtonClicked = (e: React.MouseEvent<HTMLElement>) => {
            if (this.state.isFullscreen) {
                (document.exitFullscreen
                    || document.webkitExitFullscreen
                    || (document as any).msExitFullscreen).apply(document);
            } else {
                (document.documentElement.requestFullscreen
                    || document.documentElement.webkitRequestFullscreen
                    || (document.documentElement as any).msRequestFullscreen).apply(document.documentElement);
            }
        };
        const isFullscreen = this.state.isFullscreen;
        return <Tooltip title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
            <IconButton
                onClick={onButtonClicked}
                color="inherit"
                disabled={!(document.fullscreenEnabled || document.webkitFullscreenEnabled || (document as any).msFullscreenEnabled)}
            >
                {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
        </Tooltip>
    }
    private onFullScreenChanged = (e: Event) => {
        const isFullScreen = document.webkitIsFullScreen || !!(document as any).msFullscreenElement;
        this.setState({ isFullscreen: isFullScreen });
    };
}
