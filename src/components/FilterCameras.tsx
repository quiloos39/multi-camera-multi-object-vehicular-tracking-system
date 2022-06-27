import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function FilterCameras({ cameras, selectedCamera, selectCamera }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("");
  console.log("filter: ", selectedCamera);

  const allCameras = (
    <div className="space-y-5">
      {cameras
        .filter((camera) => camera.id.match(filter))
        .map((camera) => {
          const backgroundColor = selectedCamera === camera.id ? "bg-gray-500" : "bg-gray-300 hover:bg-gray-400";

          return (
            <div
              key={camera.id}
              className={`items-end justify-end p-4 ${backgroundColor} cursor-pointer rounded-lg`}
              onClick={() => selectCamera(camera.id)}
              onDoubleClick={() => navigate(`/cameras/${camera.id}`)}
            >
              <div className="mb-2 h-60">{camera.thumbnail}</div>
              <p>
                <span className="font-bold">ID:</span> {camera.id}
              </p>
            </div>
          );
        })}
    </div>
  );

  return (
    <div className="select-none">
      <div className="mb-5">
        <input
          about=""
          className="min-w-full rounded-lg bg-gray-200 py-2 px-5"
          onChange={(e) => setFilter(e.target["value"])}
          placeholder="Type to search camera"
        />
      </div>
      {allCameras}
    </div>
  );
}
