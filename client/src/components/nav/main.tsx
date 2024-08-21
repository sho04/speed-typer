import "./style.scss";

const Navbar = () => {
    return (
        <>
            <div className={"main-container"}>
                <div className={"nav-container"}>
                    <div className={"label"}>WikiTyper</div>
                    <div className={"nav-item"}>Home</div>
                    <div className={"nav-item"}>About</div>
                    <div className={"nav-item"}>Contact</div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
