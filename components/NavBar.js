export default function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/classes'>Classes</Link>
                </li>
                <li>
                    <Link to='/courses'>Courses</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        </nav>
    )
}