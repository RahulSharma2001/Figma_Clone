import { useCallback, useRef, useState } from "react";
import "./App.css";
import MyNavbar from "./components/navbar/MyNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMutation, useMyPresence, useOthers } from "./liveblocks.config";
import LiveCursors from "./components/cursor/LiveCursors";
import {
  Arrow,
  Circle,
  Layer,
  Line,
  Rect,
  Stage,
  Star,
  Transformer,
} from "react-konva";
import { v4 as uuidv4 } from "uuid";
import Left from "./components/navbar/Left";
import Right from "./components/navbar/Right";
import { Room } from "./Room";

function App() {
  const [myPresence, updateMyPresence] = useMyPresence();

  const [current, setCurrent] = useState("select");
  const [mode, setMode] = useState("dark");
  const [currentColor, setCurrentColor] = useState("#e66465");
  const stageReff = useRef();
  const isPainting = useRef();
  const currentShapeId = useRef();
  const transformerRef = useRef();
  const [currentShapeSelectedId, setCurrentShapeSelectedId] = useState(null);

  const [shapes, setShapes] = useState([]);

  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [stars, setStars] = useState([]);
  const [scribbles, setScribbles] = useState([]);
  const strokeColor = "#000";


  const updateName = useMutation(({ storage }, nameType, newMessage) => {
    const mutableScientist = storage.get("scientist");
    mutableScientist.set(nameType, newMessage);
  }, []);

  const isDragable = current === "select";
  const others = useOthers();
  function handlePointerMove(e) {
    const cursor = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
    updateMyPresence({ cursor });
  }

  function handlePointerLeave(e) {
    updateMyPresence({ cursor: null });
  }

  const handlePointerDown = useCallback((e) => {
    const cursor = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
    updateMyPresence({ cursor });
  }, []);

  function onMouseUp() {
    isPainting.current = false;
    transformerRef.current.nodes([]);
  }

  function onMouseDown() {
    if (current === "select") return;
    transformerRef.current.nodes([]);
    const stage = stageReff.current;
    const { x, y } = stage.getPointerPosition();
    const id = uuidv4();

    currentShapeId.current = id;
    isPainting.current = true;

    switch (current) {
      case "rectangle":
        setRectangles([
          ...rectangles,
          {
            id,
            x,
            y,
            width: 50,
            height: 40,
            fill: currentColor,
          },
        ]);
        break;
      case "circle":
        setCircles([
          ...circles,
          {
            id,
            x,
            y,
            radius: 25,
            fill: currentColor,
          },
        ]);
        break;
      case "outline":
        setArrows([
          ...arrows,
          {
            id,
            points: [x, y, x + 20, y + 20],

            fill: currentColor,
          },
        ]);
        break;
      case "star":
        setStars([
          ...stars,
          {
            id,
            x,
            y,
            numPoints: 6,
            innerRadius: 40,
            outerRadius: 70,
            fill: currentColor,
            strokeWidth: 4,
          },
        ]);
        break;

      case "pencil":
        setScribbles([
          ...scribbles,
          {
            id,
            points: [x, y],
            fill: currentColor,
          },
        ]);
        break;
      default:
        break;
    }
    setShapes([...shapes, { id, type: current }]);
  }

  function onMouseMove() {
    if (current === "select" || !isPainting.current) return;

    const stage = stageReff.current;
    const { x, y } = stage.getPointerPosition();

    switch (current) {
      case "rectangle":
        setRectangles((rectangles) =>
          rectangles.map((rectangle) => {
            if (rectangle.id === currentShapeId.current) {
              return {
                ...rectangle,
                width: x - rectangle.x,
                height: y - rectangle.y,
              };
            }

            return rectangle;
          })
        );

        break;
      case "circle":
        setCircles((circles) =>
          circles.map((circle) => {
            if (circle.id === currentShapeId.current) {
              return {
                ...circle,
                radius: ((y - circle.y) ** 2 + (x - circle.x) ** 2) * 0.5,
              };
            }

            return circle;
          })
        );
        break;
      case "outline":
        setArrows((arrows) =>
          arrows.map((arrow) => {
            if (arrow.id === currentShapeId.current) {
              return {
                ...arrow,
                points: [arrow.points[0], arrow.points[1], x, y],
              };
            }

            return arrow;
          })
        );
        break;
      case "star":
        setStars((star) =>
          stars.map((star) => {
            if (star.id === currentShapeId.current) {
              return {
                ...star,

                innerRadius: 40 + x,
                outerRadius: 70 + y,
              };
            }

            return star;
          })
        );
        break;
      case "pencil":
        setScribbles((scribble) =>
          scribble.map((scribble) => {
            if (scribble.id === currentShapeId.current) {
              return {
                ...scribble,

                points: [...scribble.points, x, y],
              };
            }

            return scribble;
          })
        );
        break;
      default:
        break;
    }
  }
  function handleClick(e) {
    setCurrentShapeSelectedId(e.target.attrs.id);
    if (current !== "select") return;
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
  }

  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleExportClick() {
    const dataURL = stageReff.current.toDataURL({ pixelRatio: 3 });
    downloadURI(dataURL, "design.png");
  }
  function handleDelete() {
    let updatedShapes = shapes?.filter(
      (shape) => shape.id !== currentShapeSelectedId
    );
    setShapes(updatedShapes);
  }

  return (
    <Room>
      <div
        className="App"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
      >
        <LiveCursors others={others} />
        <MyNavbar
          current={current}
          setCurrent={setCurrent}
          mode={mode}
          setMode={setMode}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
        />

        <div className="mycontainer">
          <Left shapes={shapes} />
          <Stage
            className="stage"
            ref={stageReff}
            width={window.innerWidth * 0.5}
            height={window.innerHeight}
            onMouseMove={onMouseMove}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            style={{ backgroundColor: "lightgrey" }}
          >
            <Layer>
              {shapes?.map((shape) => {
                if (shape.type === "rectangle") {
                  return (
                    <Rect
                      key={shape.id}
                      id={shape.id}
                      x={rectangles.find((r) => r.id === shape.id).x}
                      y={rectangles.find((r) => r.id === shape.id).y}
                      stroke={strokeColor}
                      strokeWidth={2}
                      height={rectangles.find((r) => r.id === shape.id).height}
                      width={rectangles.find((r) => r.id === shape.id).width}
                      fill={rectangles.find((r) => r.id === shape.id).fill}
                      draggable={isDragable}
                      onClick={handleClick}
                    />
                  );
                } else if (shape.type === "circle") {
                  return (
                    <Circle
                      key={shape.id}
                      id={shape.id}
                      radius={circles.find((c) => c.id === shape.id).radius}
                      x={circles.find((c) => c.id === shape.id).x}
                      y={circles.find((c) => c.id === shape.id).y}
                      stroke={strokeColor}
                      strokeWidth={2}
                      fill={circles.find((c) => c.id === shape.id).fill}
                      draggable={isDragable}
                      onClick={handleClick}
                    />
                  );
                } else if (shape.type === "outline") {
                  return (
                    <Arrow
                      key={shape.id}
                      id={shape.id}
                      points={arrows.find((a) => a.id === shape.id).points}
                      stroke={strokeColor}
                      strokeWidth={2}
                      fill={arrows.find((c) => c.id === shape.id).fill}
                      draggable={isDragable}
                      onClick={handleClick}
                    />
                  );
                } else if (shape.type === "star") {
                  return (
                    <Star
                      key={shape.id}
                      id={shape.id}
                      x={stars.find((r) => r.id === shape.id).x}
                      y={stars.find((r) => r.id === shape.id).y}
                      numPoints={6}
                      innerRadius={
                        stars.find((r) => r.id === shape.id).innerRadius
                      }
                      outerRadius={
                        stars.find((r) => r.id === shape.id).outerRadius
                      }
                      stroke={strokeColor}
                      strokeWidth={2}
                      fill={stars.find((c) => c.id === shape.id).fill}
                      draggable={isDragable}
                      onClick={handleClick}
                    />
                  );
                } else if (shape.type === "pencil") {
                  return (
                    <Line
                      key={shape.id}
                      id={shape.id}
                      lineCap="round"
                      lineJoin="round"
                      points={scribbles.find((c) => c.id === shape.id).points}
                      stroke={scribbles.find((c) => c.id === shape.id).fill}
                      strokeWidth={2}
                      draggable={isDragable}
                      onClick={handleClick}
                    />
                  );
                }
                return null;
              })}
              <Transformer ref={transformerRef} />
            </Layer>
          </Stage>

          <Right
            handleExportClick={handleExportClick}
            handleDelete={handleDelete}
            updateName={updateName}
          />
        </div>
      </div>
    </Room>
  );
}

export default App;
