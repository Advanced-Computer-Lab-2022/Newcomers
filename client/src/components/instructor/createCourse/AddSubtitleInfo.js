import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";

import { addSubtitle, editSubtitleInfo } from "../../../redux/createCourseSlice";
import { MdOutlineError } from "react-icons/md";

export default function AddSubtitleInfo(props) {
	const dispatch = useDispatch();

	// If the component is used for Add, the Title and Hours are default values
	// If the component is used for Edit, the Title, Hours and SubtitleKey is passed as a prop from the selected Subtitle
	const [Title, setTitle] = useState(
		props.case === "Add" ? "" : props.subtitle.title ? props.subtitle.title : ""
	);
	const SubtitleKey = props.case === "Add" ? -1 : props.subtitleKey;
	const [MissingTitle, setMissingTitle] = useState(false);

	const handleAddSubtitle = () => {
		if (Title === "") {
			setMissingTitle(true);
		} else {
			setMissingTitle(false);
		}
		if (Title === "") {
			return;
		}
		switch (props.case) {
			// If the component is used for Add, it adds the subtitleInfo to the Subtitles array in the reducer
			// If the component is used for Edit, it edits the subtitleInfo of a specific subtitle in the reducer using the index

			case "Add": {
				let newSubtitle = {
					title: Title,
					seconds: 0,
					exercises: [],
					videos: [],
				};
				dispatch(addSubtitle(newSubtitle));
				break;
			}
			case "Edit": {
				let newSubtitle = {
					title: Title,
				};
				dispatch(editSubtitleInfo({ key: SubtitleKey, subtitle: newSubtitle }));
				break;
			}
			default:
		}
		setTitle("");
		props.handleClose();
	};
	return (
		<Modal
			show={props.show}
			onHide={props.handleClose}
			backdrop="static"
			keyboard={false}
			size="xl"
			dialogClassName="modal-90w"
			aria-labelledby="example-custom-modal-styling-title"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="example-custom-modal-styling-title">
					Adding a Subtitle
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group
					as={Row}
					className="mb-3 d-flex align-items-center justify-content-start">
					<Form.Label column sm={2}>
						<span>Subtitle title</span>
						<br />
						<span>
							{MissingTitle && (
								<span className="error">
									Missing
									<MdOutlineError />
								</span>
							)}
						</span>
					</Form.Label>

					<Col sm={6}>
						<Form.Control
							type="text"
							placeholder="Title"
							value={Title}
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
					</Col>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.handleClose}>
					Close
				</Button>
				<Button className="me-3" onClick={handleAddSubtitle}>
					Add Subtitle
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
