function SvgIcon({label, icon}) {
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