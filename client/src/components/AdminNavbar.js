import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutFunction = async () => {
		localStorage.clear();
		dispatch(logout());
		navigate("/login");
	};

	return (
		<>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Container>
					<Navbar.Brand
						onClick={() => {
							navigate("/home");
						}}
					>
						Home
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<NavDropdown
								title="Create User"
								id="basic-nav-dropdown"
							>
								<NavDropdown.Item href="#action/3.1">
									Admin
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Corporate Trainee
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Separated link
								</NavDropdown.Item>
							</NavDropdown>
							<Nav.Link href="#link">Reports</Nav.Link>
							<Nav.Link href="#link">Course Requests</Nav.Link>
							<Nav.Link href="#link">Refunds</Nav.Link>
							<Nav.Link href="#link">Discounts</Nav.Link>
						</Nav>
					</Navbar.Collapse>
					<Button onClick={() => logoutFunction()}>Logout</Button>
				</Container>
			</Navbar>
		</>
	);
}

export default AdminNavbar;
