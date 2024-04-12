import React from "react";
import Button from "react-bootstrap/Button";
import { useStorage } from "../../liveblocks.config";

const Right = ({ handleExportClick, handleDelete, updateName }) => {
  const scientist = useStorage((root) => root.scientist);

  return (
    <div className="right">
      <Button variant="primary" onClick={handleExportClick} id="save">
        Export As a Image
      </Button>
      <br />
      <br />
      <Button variant="danger" onClick={handleDelete} id="save">
        Delete Selected Shape
      </Button>
      <input
        style={{ margin: "20px" }}
        type="text"
        onChange={(e) => updateName("message", e.target.value)}
        placeholder="Realtime Message"
      />
      <h3>{scientist?.message}</h3>
    </div>
  );
};

export default Right;
