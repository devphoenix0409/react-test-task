/**
 * Component for task1
 *
 * @package src/screens/task1
 * @author  <devphoenix092@gmail.com>
 * @version 1.0
 */

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
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { NoteProps } from "../../models/note";
import { ModalTypeEnum } from "../../models/enums/modal";
import { displayTime, previewBody } from "../../utils/utils";
import { TableFields } from "../../models/table";

const Task1Component = () => {
  const [allNoteData, setAllNoteData] = useState<NoteProps[]>([]); // data of all notes
  const [noteData, setNoteData] = useState<NoteProps[]>([]); // data of filtered notes
  const [keyword, setKeyword] = useState<string>(""); // keyword to search
  const initNote: NoteProps = {
    id: 0,
    title: "",
    body: "",
    created_at: 0,
    updated_at: 0,
  };
  const [currentNote, setCurrentNote] = useState<NoteProps>(initNote); // current selected note
  const [isOpen, setIsOpen] = useState<boolean>(false); // status of modal
  const [isValidate, setIsValidate] = useState<boolean>(true); // validate to add new note
  const [modalType, setModalType] = useState<string>(ModalTypeEnum.ADD_NOTE); // modal type such as add, edit, delete
  const initSortStatus: any[] = []; // init sort status of fields

  // Push false to all field's sort status
  TableFields.forEach((field) => {
    initSortStatus.push(true);
  });

  const [sortStatus, setSortStatus] = useState<Array<boolean>>(initSortStatus); // sort status of fields

  /**
   * The function to handle to add a new note
   */
  const handleAddNote = () => {
    setCurrentNote(initNote);
    setModalType(ModalTypeEnum.ADD_NOTE);
    setIsOpen(true); // Open modal
  };

  /**
   * The function to add new note
   */
  const addNote = () => {
    if (!isValidate) {
      // Checking validate to add a new note
      const note: NoteProps = {
        ...currentNote,
        id: allNoteData.length + 1,
        created_at: Date.now(),
        updated_at: Date.now(),
      };

      setAllNoteData(JSON.parse(JSON.stringify(allNoteData.concat(note)))); // Update note data

      handleInit();
      setIsOpen(false); // Close modal
    }
  };

  /**
   * The function to handle to edit note
   * @param {number} id
   */
  const handleEditNote = (id: number) => {
    const pos = allNoteData.map((item: NoteProps) => item.id).indexOf(id);
    setCurrentNote(allNoteData[pos]);
    setModalType(ModalTypeEnum.EDIT_NOTE);
    setIsOpen(true); // Open modal
  };

  /**
   * The function to update note
   * @param {number} id
   */
  const editNote = (id: number) => {
    if (!isValidate) {
      const pos = allNoteData.map((item: NoteProps) => item.id).indexOf(id);
      let updatedNoteData = allNoteData;

      updatedNoteData[pos].title = currentNote.title;
      updatedNoteData[pos].body = currentNote.body;
      updatedNoteData[pos].updated_at = Date.now();

      setAllNoteData(JSON.parse(JSON.stringify(updatedNoteData))); // Update note data

      setIsOpen(false); // Close modal
    }
  };

  /**
   * The function to handle to delete note
   * @param {number} id
   */
  const handleDeleteNote = (id: number) => {
    const pos = allNoteData.map((item: NoteProps) => item.id).indexOf(id);
    setCurrentNote(allNoteData[pos]);
    setModalType(ModalTypeEnum.DELETE_NOTE);
    setIsOpen(true); // Open modal
  };

  /**
   * The function to delete note
   * @param {number} id
   */
  const deleteNote = (id: number) => {
    const updatedNoteData = allNoteData.filter(
      (note: NoteProps) => note.id !== id
    );
    setAllNoteData(JSON.parse(JSON.stringify(updatedNoteData))); // Update note data

    handleInit();
    setIsOpen(false); // Close modal
  };

  /**
   * The function to init of current note
   */
  const handleInit = () => {
    setCurrentNote(initNote);
  };

  /**
   * The function to close modal
   */
  const handleClose = () => {
    handleInit();
    setIsOpen(false);
  };

  /**
   * The function to delete all notes
   */
  const handleClean = () => {
    handleInit();
    setAllNoteData([]);
  };

  /**
   * The function to sort
   */
  const handleSort = (field: string) => {
    if (allNoteData.length !== 0) {
      const index = TableFields.indexOf(field);
      let sortItems: any[] = [];
      sortStatus[index] = !sortStatus[index];
      setSortStatus(JSON.parse(JSON.stringify(sortStatus))); // Update note data

      if (!sortStatus[index]) {
        sortItems = allNoteData.sort((one: any, two: any) =>
          one[field] < two[field] ? 1 : -1
        );
      } else {
        sortItems = allNoteData.sort((one: any, two: any) =>
          one[field] < two[field] ? -1 : 1
        );
      }

      setAllNoteData(JSON.parse(JSON.stringify(sortItems))); // Update note data
    }
  };

  /**
   * The function to edit title
   */
  const changeTitle = (title: string) => {
    setCurrentNote({
      ...currentNote,
      title: title,
    });
  };

  /**
   * The function to edit body
   */
  const changeBody = (body: string) => {
    setCurrentNote({
      ...currentNote,
      body: body,
    });
  };

  useEffect(() => {
    if (currentNote.title !== "" && currentNote.body !== "") {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
  }, [currentNote]);

  useEffect(() => {
    const filterNoteData: NoteProps[] = allNoteData.filter(
      (note: NoteProps) =>
        note.title.includes(keyword) || note.body.includes(keyword)
    );
    setNoteData(JSON.parse(JSON.stringify(filterNoteData))); // Update note data
  }, [allNoteData, keyword]);

  return (
    <div className="content">
      <div className="title">Task 1</div>
      <div className="flex justify-between">
        <div className="w-1-4">
          <Input
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="action-content">
          <Button colorScheme="blue" onClick={handleAddNote}>
            Add New Note
          </Button>
          <Button className="ml-10" colorScheme="red" onClick={handleClean}>
            Clean
          </Button>
        </div>
      </div>

      <div className="content overflow-x">
        <div className="body">
          <div className="flex header p-5">
            <div className="row id" onClick={() => handleSort("id")}>
              No
            </div>
            <div className="row normal" onClick={() => handleSort("title")}>
              Title
              {sortStatus[1] ? (
                <ChevronUpIcon className="icon" />
              ) : (
                <ChevronDownIcon className="icon" />
              )}
            </div>
            <div className="row normal" onClick={() => handleSort("body")}>
              Body
              {sortStatus[2] ? (
                <ChevronUpIcon className="icon" />
              ) : (
                <ChevronDownIcon className="icon" />
              )}
            </div>
            <div
              className="row normal"
              onClick={() => handleSort("created_at")}
            >
              Created Date
              {sortStatus[3] ? (
                <ChevronUpIcon className="icon" />
              ) : (
                <ChevronDownIcon className="icon" />
              )}
            </div>
            <div
              className="row normal"
              onClick={() => handleSort("updated_at")}
            >
              Updated Date
              {sortStatus[4] ? (
                <ChevronUpIcon className="icon" />
              ) : (
                <ChevronDownIcon className="icon" />
              )}
            </div>
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
                    value={currentNote.title}
                    onChange={(e) => changeTitle(e.target.value)}
                  />
                </div>
                <div className="p-5">
                  <Textarea
                    placeholder="Enter Body"
                    value={currentNote.body}
                    onChange={(e) => changeBody(e.target.value)}
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
                    ? editNote(currentNote.id)
                    : deleteNote(currentNote.id)
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
