type HeaderProps = {
    gameName: string;
};

function Header({gameName}: HeaderProps) {
    return <h1>{gameName}</h1>;
}

export default Header;