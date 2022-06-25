// import { useState, useRef, useEffect } from "react";
// import "./style.css";
// import TaskList from "../../../components/TaskList";
// import Demo from "../../../components/demo";
// import { useNavigate } from "react-router-dom";
// import { useTranslation, Trans } from "react-i18next";
// const API = "http://54.87.14.216";

// function ManagementSystem() {
//   const { t, i18n } = useTranslation();
//   const user = JSON.parse(localStorage.getItem("user-info"));
//   const token = user?.token;
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!localStorage.getItem("user-info")) {
//       navigate("/login");
//     }
//   });
//   // TaskBar Script
//   const dragEl = useRef(null);
//   const [pos, setPos] = useState([476, 0]);
//   const [mov, setMov] = useState([0, 0]);
//   const [initial, setInitial] = useState([0, 0]);
//   const [down, setDown] = useState(false);
//   const [style, setStyle] = useState({});
//   const parent = document.querySelector('body');
//   const parentRect = parent.getBoundingClientRect();

//   const handlePointerDown = (e) => {
//     setDown(true);
//     setInitial([e.clientX, e.clientY]);
//     setMov([0, 0]);

//     if (dragEl?.current != null) {
//       dragEl?.current?.setPointerCapture(e.pointerId);
//     }
//   };

//   const handlePointerMove = (e) => {
//     if (down === true) {
//       if ((e.clientX + 100 >= e.target.offsetWidth) && (e.clientX <= parentRect.right - 100)) {
//         if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;

//         setMov([e.clientX - initial[0], e.clientY - initial[1]]);
//         const x = pos[0] + mov[0];
//         const y = pos[1] + mov[1];
//         setStyle({
//           // transform: `translate3d(${x}px,${y}px,0)`,
//           left: `${x}px`,
//           top: `${y}px`
//         });
//       }
//     }
//   };

//   const handlePointerUp = (e) => {
//     setDown(false);
//     setPos([pos[0] + mov[0], pos[1] + mov[1]]);

//     if (dragEl?.current != null) {
//       dragEl?.current?.releasePointerCapture(e.pointerId);
//     }
//   };

//   // Event Calender Script
//   const [pos2, setPos2] = useState([0, 0]);
//   const [mov2, setMov2] = useState([0, 0]);
//   const [initial2, setInitial2] = useState([0, 0]);

//   const [down2, setDown2] = useState(false);

//   const [style2, setStyle2] = useState({});
//   const dragEl2 = useRef(null);

//   const eventHandlePointerDown = (e) => {
//     setDown2(true);
//     setInitial2([e.clientX, e.clientY]);
//     setMov2([0, 0]);

//     if (dragEl2?.current != null) {
//       dragEl2?.current?.setPointerCapture(e.pointerId);
//     }
//   };

//   const eventHandlePointerMove = (e) => {
//     if (down2 === true) {
//       if ((e.clientX + 100 >= e.target.offsetWidth) && (e.clientX <= parentRect.right - 100)) {
//         if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;

//         setMov2([e.clientX - initial2[0], e.clientY - initial2[1]]);
//         const x = pos2[0] + mov2[0];
//         const y = pos2[1] + mov2[1];
//         setStyle2({
//           // transform: `translate3d(${x}px,${y}px,0)`,
//           left: `${x}px`,
//           top: `${y}px`,
//         });
//       };
//     };
//   };

//   const eventHandlePointerUp = (e) => {
//     setDown2(false);
//     setPos2([pos2[0] + mov2[0], pos2[1] + mov2[1]]);

//     if (dragEl2?.current != null) {
//       dragEl2?.current?.releasePointerCapture(e.pointerId);
//     }
//   };

//   // resize taskbar
//   const taskRef = useRef(null);
//   const taskRefLeft = useRef(null);
//   const taskRefTop = useRef(null);
//   const taskRefRight = useRef(null);
//   const taskRefBottom = useRef(null);
//   // sidebar
//   const taskRefBottomRight = useRef(null);
//   const taskRefTopRight = useRef(null);
//   const taskRefBottomLeft = useRef(null);
//   const taskRefTopLeft = useRef(null);
//   useEffect(() => {
//     const resizeableEle = taskRef.current;
//     const styles = window.getComputedStyle(resizeableEle);
//     let width = parseInt(styles.width, 10);
//     let height = parseInt(styles.height, 10);
//     let x = 0;
//     let y = 0;

//     // resizeableEle.style.top = "0";
//     // resizeableEle.style.left = "0";

//     // Right resize
//     const onMouseMoveRightResize = (event) => {
//       const dx = event.clientX - x;
//       x = event.clientX;
//       if ((width + dx) < 320) {
//         width = 320;
//       } else {
//         width = width + dx;
//       }
//       resizeableEle.style.width = `${width}px`;
//     };

//     const onMouseUpRightResize = (event) => {
//       document.removeEventListener("ontouchmove", onMouseMoveRightResize);
//     };

//     const onMouseDownRightResize = (event) => {
//       x = event.clientX;
//       resizeableEle.style.left = styles.left;
//       resizeableEle.style.right = null;
//       document.addEventListener("ontouchmove", onMouseMoveRightResize);
//       document.addEventListener("ontouchstart", onMouseUpRightResize);
//     };

//     // Top resize
//     const onMouseMoveTopResize = (event) => {
//       const dy = event.clientY - y;
//       height = height - dy;
//       y = event.clientY;
//       resizeableEle.style.height = `${height}px`;
//     };

//     const onMouseUpTopResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveTopResize);
//     };

//     const onMouseDownTopResize = (event) => {
//       y = event.clientY;
//       const styles = window.getComputedStyle(resizeableEle);
//       resizeableEle.style.bottom = styles.bottom;
//       resizeableEle.style.top = null;
//       document.addEventListener("mousemove", onMouseMoveTopResize);
//       document.addEventListener("mouseup", onMouseUpTopResize);
//     };

//     // Bottom resize
//     const onMouseMoveBottomResize = (event) => {
//       const dy = event.clientY - y;
//       height = height + dy;
//       y = event.clientY;
//       resizeableEle.style.height = `${height}px`;
//     };

//     const onMouseUpBottomResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveBottomResize);
//     };

//     const onMouseDownBottomResize = (event) => {
//       y = event.clientY;
//       const styles = window.getComputedStyle(resizeableEle);
//       resizeableEle.style.top = styles.top;
//       resizeableEle.style.bottom = null;
//       document.addEventListener("mousemove", onMouseMoveBottomResize);
//       document.addEventListener("mouseup", onMouseUpBottomResize);
//     };

//     // Left resize
//     const onMouseMoveLeftResize = (event) => {
//       const dx = event.clientX - x;
//       x = event.clientX;
//       if ((width - dx) < 320) {
//         width = 320;
//       } else {
//         width = width - dx;
//       }
//       resizeableEle.style.width = `${width}px`;
//     };

//     const onMouseUpLeftResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveLeftResize);
//       document.removeEventListener("ontouchmove", onMouseMoveLeftResize);
//     };

//     const onMouseDownLeftResize = (event) => {
//       x = event.clientX;
//       resizeableEle.style.right = styles.right;
//       resizeableEle.style.left = null;
//       document.addEventListener("mousemove", onMouseMoveLeftResize);
//       document.addEventListener("mouseup", onMouseUpLeftResize);
//       document.addEventListener("ontouchmove", onMouseMoveLeftResize);
//       document.addEventListener("ontouchstart", onMouseUpLeftResize);
//     };

//     //Bottom  Right resize
//     const onMouseMoveBottomRightResize = (event) => {
//       const dx = event.clientX - x;
//       const dy = event.clientY - y;
//       x = event.clientX;
//       y = event.clientY;
//       width = width + dx;
//       height = height + dy;
//       // if ((width + dx) < 320) {
//       //   width = 320;
//       // } else {

//       // }
//       resizeableEle.style.width = `${width}px`;
//       resizeableEle.style.height = `${height}px`;
//     };

//     const onMouseUpBottomRightResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveBottomRightResize);
//       document.removeEventListener("ontouchmove", onMouseMoveBottomRightResize);
//     };

//     const onMouseDownBottomRightResize = (event) => {
//       x = event.clientX;
//       y = event.clientY;
//       resizeableEle.style.left = styles.left;
//       resizeableEle.style.right = null;
//       resizeableEle.style.top = styles.top;
//       resizeableEle.style.bottom = null;
//       document.addEventListener("mousemove", onMouseMoveBottomRightResize);
//       document.addEventListener("mouseup", onMouseUpBottomRightResize);
//       document.addEventListener("ontouchmove", onMouseMoveBottomRightResize);
//       document.addEventListener("ontouchstart", onMouseUpBottomRightResize);
//     };

//     //Top Right resize
//     const onMouseMoveTopRightResize = (event) => {
//       const dx = event.clientX - x;
//       const dy = event.clientY - y;
//       x = event.clientX;
//       y = event.clientY;
//       width = width + dx;
//       height = height - dy;
//       // if ((width + dx) < 320) {
//       //   width = 320;
//       // } else {

//       // }
//       resizeableEle.style.width = `${width}px`;
//       resizeableEle.style.height = `${height}px`;
//     };

//     const onMouseUpTopRightResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveTopRightResize);
//       document.removeEventListener("ontouchmove", onMouseMoveTopRightResize);
//     };

//     const onMouseDownTopRightResize = (event) => {
//       x = event.clientX;
//       y = event.clientY;
//       resizeableEle.style.left = styles.left;
//       resizeableEle.style.right = null;
//       resizeableEle.style.top = styles.top;
//       resizeableEle.style.Top = null;
//       document.addEventListener("mousemove", onMouseMoveTopRightResize);
//       document.addEventListener("mouseup", onMouseUpTopRightResize);
//       document.addEventListener("ontouchmove", onMouseMoveTopRightResize);
//       document.addEventListener("ontouchstart", onMouseUpTopRightResize);
//     };

//     //Top Left resize
//     const onMouseMoveTopLeftResize = (event) => {
//       const dx = event.clientX - x;
//       const dy = event.clientY - y;
//       x = event.clientX;
//       y = event.clientY;
//       width = width - dx;
//       height = height - dy;
//       // if ((width + dx) < 320) {
//       //   width = 320;
//       // } else {

//       // }
//       resizeableEle.style.width = `${width}px`;
//       resizeableEle.style.height = `${height}px`;
//     };

//     const onMouseUpTopLeftResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveTopLeftResize);
//       document.removeEventListener("ontouchmove", onMouseMoveTopLeftResize);
//     };

//     const onMouseDownTopLeftResize = (event) => {
//       x = event.clientX;
//       y = event.clientY;
//       resizeableEle.style.left = styles.left;
//       resizeableEle.style.right = null;
//       resizeableEle.style.top = styles.top;
//       resizeableEle.style.Top = null;
//       document.addEventListener("mousemove", onMouseMoveTopLeftResize);
//       document.addEventListener("mouseup", onMouseUpTopLeftResize);
//       document.addEventListener("ontouchmove", onMouseMoveTopLeftResize);
//       document.addEventListener("ontouchstart", onMouseUpTopLeftResize);
//     };

//     //Bottom Left resize
//     const onMouseMoveBottomLeftResize = (event) => {
//       const dx = event.clientX - x;
//       const dy = event.clientY - y;
//       x = event.clientX;
//       y = event.clientY;
//       width = width - dx;
//       height = height + dy;
//       // if ((width + dx) < 320) {
//       //   width = 320;
//       // } else {

//       // }
//       resizeableEle.style.width = `${width}px`;
//       resizeableEle.style.height = `${height}px`;
//     };

//     const onMouseUpBottomLeftResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveBottomLeftResize);
//       document.removeEventListener("ontouchmove", onMouseMoveBottomLeftResize);
//     };

//     const onMouseDownBottomLeftResize = (event) => {
//       x = event.clientX;
//       y = event.clientY;
//       resizeableEle.style.left = styles.left;
//       resizeableEle.style.right = null;
//       resizeableEle.style.top = styles.top;
//       resizeableEle.style.bottom = null;
//       document.addEventListener("mousemove", onMouseMoveBottomLeftResize);
//       document.addEventListener("mouseup", onMouseUpBottomLeftResize);
//       document.addEventListener("ontouchmove", onMouseMoveBottomLeftResize);
//       document.addEventListener("ontouchstart", onMouseUpBottomLeftResize);
//     };

//     // Add mouse down event listener
//     const resizerRight = taskRefRight.current;
//     resizerRight.addEventListener("mousedown", onMouseDownRightResize);
//     resizerRight.addEventListener("ontouchend", onMouseDownRightResize);
//     const resizerBottom = taskRefBottom.current;
//     resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);
//     resizerBottom.addEventListener("ontouchend", onMouseDownBottomResize);
//     const resizerTop = taskRefTop.current;
//     resizerTop.addEventListener("mousedown", onMouseDownTopResize);
//     resizerTop.addEventListener("ontouchend", onMouseDownTopResize);
//     const resizerLeft = taskRefLeft.current;
//     resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);
//     resizerLeft.addEventListener("ontouchend", onMouseDownLeftResize);
//     const resizerBottomRight = taskRefBottomRight.current;
//     resizerBottomRight.addEventListener("mousedown", onMouseDownBottomRightResize);
//     resizerBottomRight.addEventListener("ontouchend", onMouseDownBottomRightResize);
//     const resizerTopRight = taskRefTopRight.current;
//     resizerTopRight.addEventListener("mousedown", onMouseDownTopRightResize);
//     resizerTopRight.addEventListener("ontouchend", onMouseDownTopRightResize);
//     const resizerTopLeft = taskRefTopLeft.current;
//     resizerTopLeft.addEventListener("mousedown", onMouseDownTopLeftResize);
//     resizerTopLeft.addEventListener("ontouchend", onMouseDownTopLeftResize);
//     const resizerBottomLeft = taskRefBottomLeft.current;
//     resizerBottomLeft.addEventListener("mousedown", onMouseDownBottomLeftResize);
//     resizerBottomLeft.addEventListener("ontouchend", onMouseDownBottomLeftResize);

//     return () => {
//       resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
//       resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
//       resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
//       resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
//       resizerBottomRight.removeEventListener("mousedown", onMouseDownBottomRightResize);
//       resizerTopRight.removeEventListener("mousedown", onMouseDownTopRightResize);
//       resizerTopLeft.removeEventListener("mousedown", onMouseDownTopLeftResize);
//       resizerBottomLeft.removeEventListener("mousedown", onMouseDownBottomLeftResize);
//       resizerTop.removeEventListener("ontouchend", onMouseDownTopResize);
//       resizerRight.removeEventListener("ontouchend", onMouseDownRightResize);
//       resizerBottom.removeEventListener("ontouchend", onMouseDownBottomResize);
//       resizerLeft.removeEventListener("ontouchend", onMouseDownLeftResize);
//       resizerBottomRight.removeEventListener("ontouchend", onMouseDownBottomRightResize);
//       resizerTopRight.removeEventListener("ontouchend", onMouseDownTopRightResize);
//       resizerTopLeft.removeEventListener("ontouchend", onMouseDownTopLeftResize);
//       resizerBottomLeft.removeEventListener("ontouchend", onMouseDownBottomLeftResize);
//     };
//   }, []);

//   // resize Event calender
//   const eventRef = useRef(null);
//   const eventRefLeft = useRef(null);
//   const eventRefRight = useRef(null);
//   const eventRefBottom = useRef(null);
//   const eventRefTop = useRef(null);

//   // sidebar
//   const eventRefBottomRight = useRef(null);
//   const eventRefTopRight = useRef(null);
//   const eventRefBottomLeft = useRef(null);
//   const eventRefTopLeft = useRef(null);
//   useEffect(() => {
//     const resizeableEle = eventRef.current;
//     const styles = window.getComputedStyle(resizeableEle);
//     let width = parseInt(styles.width, 10);
//     let height = parseInt(styles.height, 10);
//     let x = 0;
//     let y = 0;

//     // Top resize
//     const onMouseMoveTopResize = (event) => {
//       const dy = event.clientY - y;
//       height = height - dy;
//       y = event.clientY;
//       if ((height - dy) < 512) {
//         height = 512;
//       } else {
//         height = height - dy;
//       }
//       let calenderMainWrap = document.querySelector("#notesListId .MuiPaper-elevation");
//       let eventTableCell = document.querySelectorAll("#notesListId .Cell-cell.MuiTableCell-body");
//       let eventModule = document.querySelectorAll("#notesListId .css-ljfojm > div");
//       for (var i = 0; i < eventTableCell.length; i++) {
//         eventTableCell[i].style.height = `${height / 8.5}px`;
//         console.log(eventModule);
//       }
//       for (var modl = 0; modl < eventModule.length; modl++) {
//         eventModule[modl].style.top = `${height / 10}px`;
//         console.log(eventModule);
//       }
//       // eventModule.style.top = `${height / 7.5625}px`;
//       calenderMainWrap.style.height = `${height}px`;
//       resizeableEle.style.height = `${height}px`;
//     };

//     const onMouseUpTopResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveTopResize);
//       document.removeEventListener("ontouchmove", onMouseMoveTopResize);
//     };

//     const onMouseDownTopResize = (event) => {
//       y = event.clientY;
//       const styles = window.getComputedStyle(resizeableEle);
//       resizeableEle.style.bottom = styles.bottom;
//       resizeableEle.style.top = null;
//       document.addEventListener("mousemove", onMouseMoveTopResize);
//       document.addEventListener("mouseup", onMouseUpTopResize);
//       document.addEventListener("ontouchmove", onMouseMoveTopResize);
//       document.addEventListener("ontouchstart", onMouseUpTopResize);
//     };

//     // Right resize
//     const onMouseMoveRightResize = (event) => {
//       const dx = event.clientX - x;
//       x = event.clientX;
//       if ((width + dx) < 500) {
//         width = 500;
//       } else {
//         width = width + dx;
//       }
//       resizeableEle.style.width = `${width}px`;
//       resizeableEle.style.flex = `0 0 ${width}px`;
//     };

//     const onMouseUpRightResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveRightResize);
//       document.removeEventListener("ontouchmove", onMouseMoveRightResize);
//     };

//     const onMouseDownRightResize = (event) => {
//       x = event.clientX;
//       resizeableEle.style.left = styles.left;
//       resizeableEle.style.right = null;
//       document.addEventListener("mousemove", onMouseMoveRightResize);
//       document.addEventListener("mouseup", onMouseUpRightResize);
//       document.addEventListener("ontouchmove", onMouseMoveRightResize);
//       document.addEventListener("ontouchup", onMouseUpRightResize);
//     };

//     // Bottom resize
//     const onMouseMoveBottomResize = (event) => {
//       const dy = event.clientY - y;
//       height = height + dy;
//       y = event.clientY;
//       if ((height + dy) < 512) {
//         height = 512;
//       } else {
//         height = height + dy;
//       }
//       let calenderMainWrap = document.querySelector("#notesListId .MuiPaper-elevation");
//       let eventTableCell = document.querySelectorAll("#notesListId .Cell-cell.MuiTableCell-body");
//       let eventModule = document.querySelectorAll("#notesListId .css-ljfojm > div");
//       for (var i = 0; i < eventTableCell.length; i++) {
//         eventTableCell[i].style.height = `${height / 8.5}px`;
//         console.log(eventModule);
//       }
//       for (var modl = 0; modl < eventModule.length; modl++) {
//         eventModule[modl].style.top = `${height / 10}px`;
//         console.log(eventModule);
//       }
//       // eventModule.style.top = `${height / 7.5625}px`;
//       calenderMainWrap.style.height = `${height}px`;
//       resizeableEle.style.height = `${height}px`;
//     };

//     const onMouseUpBottomResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveBottomResize);
//       document.removeEventListener("ontouchmove", onMouseMoveBottomResize);
//     };

//     const onMouseDownBottomResize = (event) => {
//       y = event.clientY;
//       const styles = window.getComputedStyle(resizeableEle);
//       resizeableEle.style.top = styles.top;
//       resizeableEle.style.bottom = null;
//       document.addEventListener("mousemove", onMouseMoveBottomResize);
//       document.addEventListener("mouseup", onMouseUpBottomResize);
//       document.addEventListener("ontouchmove", onMouseMoveBottomResize);
//       document.addEventListener("ontouchstart", onMouseUpBottomResize);
//     };

//     // Left resize
//     const onMouseMoveLeftResize = (event) => {
//       const dx = event.clientX - x;
//       x = event.clientX;
//       if ((width - dx) < 500) {
//         width = 500;
//       } else {
//         width = width - dx;
//       }
//       resizeableEle.style.width = `${width}px`;
//       resizeableEle.style.flex = `0 0 ${width}px`;
//     };

//     const onMouseUpLeftResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveLeftResize);
//       document.removeEventListener("ontouchmove", onMouseMoveLeftResize);
//     };

//     const onMouseDownLeftResize = (event) => {
//       x = event.clientX;
//       resizeableEle.style.right = styles.right;
//       resizeableEle.style.left = null;
//       document.addEventListener("mousemove", onMouseMoveLeftResize);
//       document.addEventListener("mouseup", onMouseUpLeftResize);
//       document.addEventListener("ontouchmove", onMouseMoveLeftResize);
//       document.addEventListener("ontouchstart", onMouseUpLeftResize);
//     };

//     //Bottom  Right resize
//     const onMouseMoveBottomRightResize = (event) => {
//       const dx = event.clientX - x;
//       const dy = event.clientY - y;
//       x = event.clientX;
//       y = event.clientY;
//       width = width + dx;
//       height = height + dy;
//       // if ((width + dx) < 320) {
//       //   width = 320;
//       // } else {

//       // }
//       if ((height + dy) < 512) {
//         height = 512;
//       } else {
//         height = height + dy;
//       }
//       let calenderMainWrap = document.querySelector("#notesListId .MuiPaper-elevation");
//       let eventTableCell = document.querySelectorAll("#notesListId .Cell-cell.MuiTableCell-body");
//       let eventModule = document.querySelectorAll("#notesListId .css-ljfojm > div");
//       for (var i = 0; i < eventTableCell.length; i++) {
//         eventTableCell[i].style.height = `${height / 8.5}px`;
//         console.log(eventModule);
//       }
//       for (var modl = 0; modl < eventModule.length; modl++) {
//         eventModule[modl].style.top = `${height / 10}px`;
//         console.log(eventModule);
//       }
//       // eventModule.style.top = `${height / 7.5625}px`;
//       calenderMainWrap.style.height = `${height - 42}px`;
//       resizeableEle.style.width = `${width}px`;
//       resizeableEle.style.flex = `0 0 ${width}px`;
//       resizeableEle.style.height = `${height}px`;
//     };

//     const onMouseUpBottomRightResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveBottomRightResize);
//       document.removeEventListener("ontouchmove", onMouseMoveBottomRightResize);
//     };

//     const onMouseDownBottomRightResize = (event) => {
//       x = event.clientX;
//       y = event.clientY;
//       resizeableEle.style.left = styles.left;
//       resizeableEle.style.right = null;
//       resizeableEle.style.top = styles.top;
//       resizeableEle.style.bottom = null;
//       document.addEventListener("mousemove", onMouseMoveBottomRightResize);
//       document.addEventListener("mouseup", onMouseUpBottomRightResize);
//       document.addEventListener("ontouchmove", onMouseMoveBottomRightResize);
//       document.addEventListener("ontouchstart", onMouseUpBottomRightResize);
//     };

//     //Top Right resize
//     const onMouseMoveTopRightResize = (event) => {
//       const dx = event.clientX - x;
//       const dy = event.clientY - y;
//       x = event.clientX;
//       y = event.clientY;
//       width = width + dx;
//       // height = height - dy;
//       // if ((width + dx) < 320) {
//       //   width = 320;
//       // } else {

//       // }
//       if ((height - dy) < 512) {
//         height = 512;
//       } else {
//         height = height - dy;
//       }
//       let calenderMainWrap = document.querySelector("#notesListId .MuiPaper-elevation");
//       let eventTableCell = document.querySelectorAll("#notesListId .Cell-cell.MuiTableCell-body");
//       let eventModule = document.querySelectorAll("#notesListId .css-ljfojm > div");
//       for (var i = 0; i < eventTableCell.length; i++) {
//         eventTableCell[i].style.height = `${height / 8.5}px`;
//         console.log(eventModule);
//       }
//       for (var modl = 0; modl < eventModule.length; modl++) {
//         eventModule[modl].style.top = `${height / 10}px`;
//         console.log(eventModule);
//       }
//       // eventModule.style.top = `${height / 7.5625}px`;
//       calenderMainWrap.style.height = `${height - 42}px`;
//       resizeableEle.style.width = `${width}px`;
//       resizeableEle.style.flex = `0 0 ${width}px`;
//       resizeableEle.style.height = `${height}px`;
//     };

//     const onMouseUpTopRightResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveTopRightResize);
//       document.removeEventListener("ontouchmove", onMouseMoveTopRightResize);
//     };

//     const onMouseDownTopRightResize = (event) => {
//       x = event.clientX;
//       y = event.clientY;
//       resizeableEle.style.left = styles.left;
//       resizeableEle.style.right = null;
//       resizeableEle.style.bottom = styles.bottom;
//       resizeableEle.style.top = null;
//       document.addEventListener("mousemove", onMouseMoveTopRightResize);
//       document.addEventListener("mouseup", onMouseUpTopRightResize);
//       document.addEventListener("ontouchmove", onMouseMoveTopRightResize);
//       document.addEventListener("ontouchstart", onMouseUpTopRightResize);
//     };

//     //Top Left resize
//     const onMouseMoveTopLeftResize = (event) => {
//       const dx = event.clientX - x;
//       const dy = event.clientY - y;
//       x = event.clientX;
//       y = event.clientY;
//       width = width - dx;
//       // height = height - dy;
//       // if ((width + dx) < 320) {
//       //   width = 320;
//       // } else {

//       // }
//       if ((height - dy) < 512) {
//         height = 512;
//       } else {
//         height = height - dy;
//       }
//       let calenderMainWrap = document.querySelector("#notesListId .MuiPaper-elevation");
//       let eventTableCell = document.querySelectorAll("#notesListId .Cell-cell.MuiTableCell-body");
//       let eventModule = document.querySelectorAll("#notesListId .css-ljfojm > div");
//       for (var i = 0; i < eventTableCell.length; i++) {
//         eventTableCell[i].style.height = `${height / 8.5}px`;
//         console.log(eventModule);
//       }
//       for (var modl = 0; modl < eventModule.length; modl++) {
//         eventModule[modl].style.top = `${height / 10}px`;
//         console.log(eventModule);
//       }
//       // eventModule.style.top = `${height / 7.5625}px`;
//       calenderMainWrap.style.height = `${height - 42}px`;
//       resizeableEle.style.width = `${width}px`;
//       resizeableEle.style.flex = `0 0 ${width}px`;
//       resizeableEle.style.height = `${height}px`;
//     };

//     const onMouseUpTopLeftResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveTopLeftResize);
//       document.removeEventListener("ontouchmove", onMouseMoveTopLeftResize);
//     };

//     const onMouseDownTopLeftResize = (event) => {
//       x = event.clientX;
//       y = event.clientY;
//       resizeableEle.style.right = styles.right;
//       resizeableEle.style.left = null;
//       resizeableEle.style.bottom = styles.bottom;
//       resizeableEle.style.top = null;
//       document.addEventListener("mousemove", onMouseMoveTopLeftResize);
//       document.addEventListener("mouseup", onMouseUpTopLeftResize);
//       document.addEventListener("ontouchmove", onMouseMoveTopLeftResize);
//       document.addEventListener("ontouchstart", onMouseUpTopLeftResize);
//     };

//     //Bottom Left resize
//     const onMouseMoveBottomLeftResize = (event) => {
//       const dx = event.clientX - x;
//       const dy = event.clientY - y;
//       x = event.clientX;
//       y = event.clientY;
//       width = width - dx;
//       // height = height + dy;
//       // if ((width + dx) < 320) {
//       //   width = 320;
//       // } else {

//       // }
//       if ((height + dy) < 512) {
//         height = 512;
//       } else {
//         height = height + dy;
//       }
//       let calenderMainWrap = document.querySelector("#notesListId .MuiPaper-elevation");
//       let eventTableCell = document.querySelectorAll("#notesListId .Cell-cell.MuiTableCell-body");
//       let eventModule = document.querySelectorAll("#notesListId .css-ljfojm > div");
//       for (var i = 0; i < eventTableCell.length; i++) {
//         eventTableCell[i].style.height = `${height / 8.5}px`;
//         console.log(eventModule);
//       }
//       for (var modl = 0; modl < eventModule.length; modl++) {
//         eventModule[modl].style.top = `${height / 10}px`;
//         console.log(eventModule);
//       }
//       // eventModule.style.top = `${height / 7.5625}px`;
//       calenderMainWrap.style.height = `${height - 42}px`;
//       resizeableEle.style.width = `${width}px`;
//       resizeableEle.style.flex = `0 0 ${width}px`;
//       resizeableEle.style.height = `${height}px`;
//     };

//     const onMouseUpBottomLeftResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveBottomLeftResize);
//       document.removeEventListener("ontouchmove", onMouseMoveBottomLeftResize);
//     };

//     const onMouseDownBottomLeftResize = (event) => {
//       x = event.clientX;
//       y = event.clientY;
//       resizeableEle.style.right = styles.right;
//       resizeableEle.style.left = null;
//       resizeableEle.style.top = styles.top;
//       resizeableEle.style.bottom = null;
//       document.addEventListener("mousemove", onMouseMoveBottomLeftResize);
//       document.addEventListener("mouseup", onMouseUpBottomLeftResize);
//       document.addEventListener("ontouchmove", onMouseMoveBottomLeftResize);
//       document.addEventListener("ontouchstart", onMouseUpBottomLeftResize);
//     };

//     // Add mouse down event listener
//     const resizerRight = eventRefRight.current;
//     resizerRight.addEventListener("mousedown", onMouseDownRightResize);
//     resizerRight.addEventListener("ontouchend", onMouseDownRightResize);
//     const resizerBottom = eventRefBottom.current;
//     resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);
//     resizerBottom.addEventListener("ontouchend", onMouseDownBottomResize);
//     const resizerLeft = eventRefLeft.current;
//     resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);
//     resizerLeft.addEventListener("ontouchend", onMouseDownLeftResize);
//     const resizerTop = eventRefTop.current;
//     resizerTop.addEventListener("mousedown", onMouseDownTopResize);
//     resizerTop.addEventListener("ontouchend", onMouseDownTopResize);
//     const resizerBottomRight = eventRefBottomRight.current;
//     resizerBottomRight.addEventListener("mousedown", onMouseDownBottomRightResize);
//     resizerBottomRight.addEventListener("ontouchend", onMouseDownBottomRightResize);
//     const resizerTopRight = eventRefTopRight.current;
//     resizerTopRight.addEventListener("mousedown", onMouseDownTopRightResize);
//     resizerTopRight.addEventListener("ontouchend", onMouseDownTopRightResize);
//     const resizerTopLeft = eventRefTopLeft.current;
//     resizerTopLeft.addEventListener("mousedown", onMouseDownTopLeftResize);
//     resizerTopLeft.addEventListener("ontouchend", onMouseDownTopLeftResize);
//     const resizerBottomLeft = eventRefBottomLeft.current;
//     resizerBottomLeft.addEventListener("mousedown", onMouseDownBottomLeftResize);
//     resizerBottomLeft.addEventListener("ontouchend", onMouseDownBottomLeftResize);

//     return () => {
//       resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
//       resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
//       resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
//       resizerTop.addEventListener("mousedown", onMouseDownTopResize);
//       resizerBottomRight.removeEventListener("mousedown", onMouseDownBottomRightResize);
//       resizerTopRight.removeEventListener("mousedown", onMouseDownTopRightResize);
//       resizerTopLeft.removeEventListener("mousedown", onMouseDownTopLeftResize);
//       resizerBottomLeft.removeEventListener("mousedown", onMouseDownBottomLeftResize);
//       resizerRight.removeEventListener("ontouchend", onMouseDownRightResize);
//       resizerBottom.removeEventListener("ontouchend", onMouseDownBottomResize);
//       resizerLeft.removeEventListener("ontouchend", onMouseDownLeftResize);
//       resizerTop.addEventListener("ontouchend", onMouseDownTopResize);
//       resizerBottomRight.removeEventListener("ontouchend", onMouseDownBottomRightResize);
//       resizerTopRight.removeEventListener("ontouchend", onMouseDownTopRightResize);
//       resizerTopLeft.removeEventListener("ontouchend", onMouseDownTopLeftResize);
//       resizerBottomLeft.removeEventListener("ontouchend", onMouseDownBottomLeftResize);
//     };
//   }, []);
//   return (
//     <div className="main-body">
//       <div className="sidebar">
//         <div className="notesList" id="notesListId" ref={eventRef} style={style2}>
//           <div ref={eventRefTop} className="resizer resizer-t"></div>
//           <div ref={eventRefTopRight} className="resizer resizer-tr"></div>
//           <div ref={eventRefTopLeft} className="resizer resizer-tl"></div>
//           <div className="dragable-header"
//             ref={dragEl2}
//             onPointerDown={eventHandlePointerDown}
//             onPointerMove={eventHandlePointerMove}
//             onPointerUp={eventHandlePointerUp}
//           >
//             <h4><Trans>Kalender</Trans></h4>
//           </div>
//           <div className="resizeable-body">
//             <div ref={eventRefLeft} className="resizer resizer-l"></div>
//             <Demo />
//             <div ref={eventRefRight} className="resizer resizer-r"></div>
//           </div>
//           <div ref={eventRefBottomRight} className="resizer resizer-br"></div>
//           <div ref={eventRefBottomLeft} className="resizer resizer-bl"></div>
//           <div ref={eventRefBottom} className="resizer resizer-b"></div>
//         </div>
//         {/* task list card */}
//         <div className="taskList" id="taskListId" ref={taskRef} style={style}>
//           <div ref={taskRefTop} className="resizer resizer-t"></div>
//           <div ref={taskRefTopRight} className="resizer resizer-tr"></div>
//           <div ref={taskRefTopLeft} className="resizer resizer-tl"></div>
//           <div className="dragable-header"
//             ref={dragEl}
//             onDragStart={handlePointerDown}
//             onDrag={handlePointerMove}
//             onDragEnd={handlePointerUp}
//           >
//             <h4><Trans>Aufgaben</Trans></h4>
//           </div>
//           <div className="resizeable-body">
//             <div ref={taskRefLeft} className="resizer resizer-l"></div>
//             <TaskList />
//             <div ref={taskRefRight} className="resizer resizer-r"></div>
//           </div>
//           <div ref={taskRefBottomRight} className="resizer resizer-br"></div>
//           <div ref={taskRefBottomLeft} className="resizer resizer-bl"></div>
//           <div ref={taskRefBottom} className="resizer resizer-b"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ManagementSystem;

import React, { useState } from 'react';
import { Rnd } from "react-rnd";
import TaskList from "../../../components/TaskList";
import { Trans } from "react-i18next";
import Demo from "../../../components/demo";
import "./style.css";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};

function ManagementSystem() {
  const [size, setSize] = useState({
    width: "295px",
    height: "350px",
  });
  const [position, setPosition] = useState({
    x: "",
    y: "",
  });
  const [calenderSize, setCalenderSize] = useState({
    width: "450px",
    height: "403px",
  });
  const [Calenderposition, setCalenderPosition] = useState({
    x: "",
    y: "",
  });
  return (
    <>
      <div className="main-body">
        <div className="sidebar">
          <div className="notesList" id="notesListId">
            <Rnd
              style={style}
              size={{ width: calenderSize.width, height: calenderSize.height }}
              position={{ x: Calenderposition.x, y: Calenderposition.y }}
              onDragStop={(e, d) => {
                setCalenderPosition({ x: d.x, y: d.y });
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                setCalenderSize({
                  width: ref.style.width,
                  height: ref.style.height,
                  ...position,
                });
              }}
            >
              <div className="dragable-header">
                <h4><Trans>Kalender</Trans></h4>
              </div>
              <div className="resizeable-body">
                <Demo />
              </div>
            </Rnd>
          </div>
          <div className='taskList'>
            <Rnd
              style={style}
              size={{ width: size.width, height: size.height }}
              position={{ x: position.x, y: position.y }}
              onDragStop={(e, d) => {
                setPosition({ x: d.x, y: d.y });
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                setSize({
                  width: ref.style.width,
                  height: ref.style.height,
                  ...position,
                });
              }}
            >
              <div className="dragable-header">
                <h4><Trans>Aufgaben</Trans></h4>
              </div>
              <div className="resizeable-body">
                <TaskList />
              </div>
            </Rnd>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementSystem;