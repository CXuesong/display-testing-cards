import { IconButton, Tooltip } from '@material-ui/core';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import * as React from 'react';

interface IFullscreenSwitchStates {
    isFullscreen: boolean
};

export class FullscreenSwitch extends React.PureComponent<{}, IFullscreenSwitchStates> {
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
                const fsdoc1 = document as any as IDocumentWithFullScreen;
                (fsdoc1.exitFullscreen || fsdoc1.webkitExitFullscreen || fsdoc1.msExitFullscreen).apply(fsdoc1);
            } else {
                const fshtml = document.documentElement as any as IElementWithFullScreen;
                (fshtml.requestFullscreen || fshtml.webkitRequestFullscreen || fshtml.msRequestFullscreen).apply(fshtml);
            }
        };
        const isFullscreen = this.state.isFullscreen;
        const fsdoc = document as any as IDocumentWithFullScreen;
        return <Tooltip title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
            <IconButton
                onClick={onButtonClicked}
                color="inherit"
                disabled={!(fsdoc.fullscreenEnabled || fsdoc.webkitFullscreenEnabled || fsdoc.msFullscreenEnabled)}
            >
                {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
        </Tooltip>
    }
    private onFullScreenChanged = (e: Event) => {
        const fsdoc = document as any as IDocumentWithFullScreen;
        const isFullScreen = !!(fsdoc.webkitIsFullScreen || fsdoc.fullscreenElement || fsdoc.msFullscreenElement);
        this.setState({ isFullscreen: isFullScreen });
    };
}

interface IDocumentWithFullScreen {
    fullscreenEnabled: boolean;
    webkitFullscreenEnabled: boolean;
    msFullscreenEnabled: boolean;
    fullscreenElement: HTMLElement;
    webkitIsFullScreen: boolean;
    msFullscreenElement: HTMLElement;
    exitFullscreen(): Promise<void>;
    webkitExitFullscreen(): Promise<void>;
    msExitFullscreen(): Promise<void>;
}

interface IElementWithFullScreen {
    requestFullscreen(options?: FullscreenOptions): Promise<void>;
    webkitRequestFullscreen(options?: FullscreenOptions): Promise<void>;
    msRequestFullscreen(options?: FullscreenOptions): Promise<void>;
}
