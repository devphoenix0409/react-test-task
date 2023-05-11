import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { NoteProps } from "../../models/note";
import { ModalTypeEnum } from "../../models/enums/modal";
import { displayTime, previewBody } from "../../utils/utils";

const Task1Component = () => {
  const [noteData, setNoteData] = useState<NoteProps[]>([]);
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [modalType, setModalType] = useState<string>(ModalTypeEnum.ADD_NOTE);

  const handleAddNote = () => {
    setId(0);
    setModalType(ModalTypeEnum.ADD_NOTE);
    setIsOpen(true);
  };

  /**
   * The function to add new note
   */
  const addNote = () => {
    if (!isDisabled) {
      const note: NoteProps = {
        id: noteData.length + 1,
        title,
        body,
        created_at: Date.now(),
        updated_at: Date.now(),
      };

      setNoteData(noteData.concat(note));

      setIsOpen(false);
    }
  };

  const handleEditNote = (id: number) => {
    const pos = noteData.map((item: NoteProps) => item.id).indexOf(id);
    setId(id);
    setTitle(noteData[pos].title);
    setBody(noteData[pos].body);
    setModalType(ModalTypeEnum.EDIT_NOTE);
    setIsOpen(true);
  };

  /**
   * The function to update note
   * @param {number} id
   */
  const editNote = (id: number) => {
    if (!isDisabled) {
      const pos = noteData.map((item: NoteProps) => item.id).indexOf(id);
      let updateNoteData = noteData;

      updateNoteData[pos].title = title;
      updateNoteData[pos].body = body;
      updateNoteData[pos].updated_at = Date.now();

      setNoteData(updateNoteData);

      setIsOpen(false);
    }
  };

  const handleDeleteNote = (id: number) => {
    setId(id);
    setModalType(ModalTypeEnum.DELETE_NOTE);
    setIsOpen(true);
  };

  /**
   * The function to delete note
   * @param {number} id
   */
  const deleteNote = (id: number) => {
    const pos = noteData.map((item: NoteProps) => item.id).indexOf(id);
    if (noteData.length === 1) {
      setNoteData([]);
    } else {
      const updatedNoteData = noteData.splice(pos - 1, 1);
      setNoteData(updatedNoteData);
    }

    handleInit();
    setIsOpen(false);
  };

  const handleInit = () => {
    setId(0);
    setTitle("");
    setBody("");
  };

  const handleClose = () => {
    handleInit();
    setIsOpen(false);
  };

  useEffect(() => {
    if (title !== "" && body !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [title, body]);

  return (
    <div className="content">
      <div className="title">Task 1</div>
      <div className="action-content">
        <Button colorScheme="blue" onClick={handleAddNote}>
          Add New Note
        </Button>
      </div>

      <div className="content overflow-x">
        <div className="body">
          <div className="flex header p-5">
            <div className="row id">No</div>
            <div className="row normal">Title</div>
            <div className="row normal">Body</div>
            <div className="row normal">Created Date</div>
            <div className="row normal">Updated Date</div>
            <div className="row action">Actions</div>
          </div>

          {noteData.map((note: NoteProps, key) => (
            <div className="flex p-5" key={key}>
              <div className="row id">{key + 1}</div>
              <div className="row normal">{note.title}</div>
              <div className="row normal">{previewBody(note.body)}</div>
              <div className="row normal">{displayTime(note.created_at)}</div>
              <div className="row normal">{displayTime(note.updated_at)}</div>
              <div className="row action">
                <Button
                  colorScheme="green"
                  onClick={() => handleEditNote(note.id)}
                >
                  Edit
                </Button>
                <div className="p-5" />
                <Button
                  colorScheme="red"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalType}</ModalHeader>
          <ModalBody>
            {modalType !== ModalTypeEnum.DELETE_NOTE && (
              <>
                <div className="p-5">
                  <Input
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="p-5">
                  <Textarea
                    placeholder="Enter Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </div>
              </>
            )}
            {modalType === ModalTypeEnum.DELETE_NOTE && (
              <div className="p-5">Do you want to delete this note ?</div>
            )}
          </ModalBody>
          <ModalFooter>
            <div className="p-5">
              <Button colorScheme="blackAlpha" onClick={handleClose}>
                Cancel
              </Button>
            </div>
            <div className="p-5">
              <Button
                colorScheme="teal"
                onClick={() =>
                  modalType === ModalTypeEnum.ADD_NOTE
                    ? addNote()
                    : modalType === ModalTypeEnum.EDIT_NOTE
                    ? editNote(id)
                    : deleteNote(id)
                }
              >
                Confirm
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Task1Component;
