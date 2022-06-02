function Buttons(props) {
  //   const [isActive, setIsActive] = useState(false);
  //   const toggleNoteBox = () => {
  //     setIsActive(!isActive);
  //   };
  return (
    <>
      <button className="addBtn" onClick={props.toggleNoteBox}>
        Add Notes
      </button>
      <button className="addBtn">Add Calender</button>
    </>
  );
}

export default Buttons;
