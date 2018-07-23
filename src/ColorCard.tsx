import * as React from 'react';

export interface IColorCardProps
{
    color: string
}

export class ColorCard extends React.Component<IColorCardProps>
{
    public render() {
        const divStyle: React.CSSProperties = {
            backgroundColor: this.props.color,
            position: "absolute",
            left: "0",
            top: "0",
            height: "100%",
            width: "100%",
            zIndex: -1,
        };
        return (<div style={divStyle} />);
    }
}
