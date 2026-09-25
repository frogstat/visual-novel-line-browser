type SvgIconProps = {
    label: string;
    icon: any;
}

function SvgIcon({label, icon}: SvgIconProps) {
    const mask = `url("${icon}")`;
    return (
        <span
            className="icon"
            role="img"
            aria-label={label}
            style={{ maskImage: mask, WebkitMaskImage: mask }}
        />
    )
}

export default SvgIcon;