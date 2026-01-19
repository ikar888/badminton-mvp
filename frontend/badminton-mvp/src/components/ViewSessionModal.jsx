const ViewSessionModal = ({ session, onClose }) => {
  if (!session) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg p-6 relative">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">
          Session Details
        </h2>

        <div className="space-y-2 text-left">
          <p>
            <span className="font-medium">Game Master:</span>{" "}
            {session.gameMasterID?.username || "Unknown"}
          </p>

          <p>
            <span className="font-medium">Location:</span>{" "}
            {session.location}
          </p>

          <p>
            <span className="font-medium">Date:</span>{" "}
            {new Date(session.date).toLocaleDateString()}
          </p>

          <p>
            <span className="font-medium">Time:</span>{" "}
            {new Date(session.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            –{" "}
            {new Date(session.endTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p>
            <span className="font-medium">Fee:</span> ₱
            {session.perGameFee}
          </p>
        </div>

        <div className="mt-6">
          <p className="font-semibold mb-2">Joined Players</p>

          {session.players?.length === 0 ? (
            <p className="text-gray-600">No players yet</p>
          ) : (
            <ul className="list-disc list-inside space-y-1">
              {session.players.map((player) => (
                <li key={player._id}>{player.username}</li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ViewSessionModal;
